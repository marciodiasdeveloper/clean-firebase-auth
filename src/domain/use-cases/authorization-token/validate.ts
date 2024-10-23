import { AuthorizationTokenValidate } from '@/domain/contracts/gateways'
import { AuthenticationError, ValidateAuthorization } from '@/domain/entities'
import { User } from '@/domain/contracts/authentication'
import { ConnectionName } from '@/domain/contracts/repos/connection-name'

type Setup = (authorizationTokenValidate: AuthorizationTokenValidate) => AuthorizationTokenValidateUseCase

type Input = {
  token: string
  domain: string
  roles?: string[]
} & ConnectionName

type Output = {
  user: User
}

export type AuthorizationTokenValidateUseCase = (input: Input) => Promise<Output>

export const setupAuthorizationTokenValidate: Setup = (authorizationTokenValidate) => async input => {
  const validateToken = new ValidateAuthorization(input.token, input.domain, input.roles ?? [])

  const authorizationData = await authorizationTokenValidate.authorizeToken(validateToken.validateAuth())

  if (authorizationData?.email == null){
    throw new AuthenticationError()
  }

  return {
    user: {
      email: authorizationData.email,
      userId: authorizationData.sub,
      name: authorizationData.name,
      roles: authorizationData.roles,
      lang: authorizationData.lang,
      tenant: authorizationData.tenant,
      tenantId: authorizationData.tenantId
    }
  }
}
