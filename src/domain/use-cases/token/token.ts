import { AuthorizationToken, UserInfoKeycloak, MicroserviceEventsSendEvent } from '@/domain/contracts/gateways'
import { Access, AuthenticationError } from '@/domain/entities'
import { MicroserviceUserClient } from '@/infra/gateways'

type Setup = (
  microserviceKeycloak: AuthorizationToken,
  userInfo: UserInfoKeycloak,
  microserviceUser: MicroserviceUserClient,
  microserviceEvents: MicroserviceEventsSendEvent
) => AuthorizationTokenUseCase
type Input = {
  keycloakCredentials: {
    realm: string
    clientSecret: string
    clientName: string
  }
  ipAddress: string
  username: string
  password: string
  domain: string
}
type Output = AuthorizationToken.Output

export type AuthorizationTokenUseCase = (input: Input) => Promise<Output>

export const setupAuthorizationToken: Setup = (microserviceKeycloak, userInfo, userClient, microserviceEvents) => async input => {
  const result = await microserviceKeycloak.authorizationToken({
    username: input.username,
    password: input.password,
    tenant: input.keycloakCredentials,
    ipAddress: input.ipAddress
  })

  let user = null

  if (result !== undefined) {
    user = await userInfo.userInfo({
      token: result.access_token,
      tenant: {
        realm: input.keycloakCredentials.realm
      }
    })
  }

  await userClient.sendTokenLogger({
    userId: user?.sub,
    username: input.username,
    ip: input.ipAddress,
    access: new Access({ token: result?.access_token }).validateToken(),
    domain: input.domain
  })

  if (result == null) {
    throw new AuthenticationError()
  }

  await microserviceEvents.dispatchSendEvent({
    domain: input.domain,
    slug: 'auth.login.token',
    tenantId: user?.tenantId,
    userId: user?.sub ?? null,
    lang: user?.lang,
    username: input.username,
    ip: input.ipAddress,
    access: new Access({ token: result?.access_token }).validateToken()
  })

  return result
}
