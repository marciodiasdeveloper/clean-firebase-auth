import { MicroserviceEventsSendEvent, TenantConnectionName } from '@/domain/contracts'
import { RememberTokenByTokenShow } from '@/domain/contracts/repos'
import { Token } from '@/domain/entities'
import { NotFoundToken, TokenExpiredError } from '@/domain/entities/errors/forgot-password'

type Setup = (
  rememberTokenRepo: RememberTokenByTokenShow,
  microserviceEvents: MicroserviceEventsSendEvent
) => ValidateTokenUseCase
type Input = { token: string } & {
  keycloakCredentials: {
    realm: string
    clientSecret: string
    clientName: string
  }
  domain: string
} & TenantConnectionName
type Output = { success: boolean }
export type ValidateTokenUseCase = (input: Input) => Promise<Output>

export const setupValidateToken: Setup = (rememberTokenRepo, microserviceEvents) => async input => {
  const token = await rememberTokenRepo.showByToken({
    token: input.token,
    tenantConnectionName: input.tenantConnectionName
  })
  if (token === undefined){
    throw new NotFoundToken()
  }

  const isValidToken = new Token(token).validateToken()

  if (!isValidToken) {
    throw new TokenExpiredError()
  }

  await microserviceEvents.dispatchSendEvent({
    domain: input.domain,
    slug: 'auth.forgot-password.validate-token',
    userId: token.userId,
    lang: 'en'
  })

  return {
    success: true
  }
}
