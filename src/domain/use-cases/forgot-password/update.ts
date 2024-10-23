import { ForgotPassword, MicroserviceEventsSendEvent, TenantConnectionName } from '@/domain/contracts'
import { RememberTokenByTokenShow, RememberTokenDelete } from '@/domain/contracts/repos'
import { Token } from '@/domain/entities'
import { NotFoundToken, NotSendToken, TokenExpiredError, NotDeleteToken } from '@/domain/entities/errors'

type Setup = (
  rememberTokenRepo: RememberTokenByTokenShow & RememberTokenDelete,
  keycloakMicroservice: ForgotPassword,
  microserviceEvents: MicroserviceEventsSendEvent
) => UpdatePasswordUseCase
type Input = { token: string, password: string, domain: string } & {
  keycloakCredentials: {
    realm: string
    clientSecret: string
    clientName: string
  }
} & TenantConnectionName
type Output = { success: boolean }
export type UpdatePasswordUseCase = (input: Input) => Promise<Output>

export const setupUpdatePassword: Setup = (rememberTokenRepo, keycloakMicroservice, microserviceEvents) => async input => {
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
  const resultKeycloakForgotPassword = await keycloakMicroservice.forgotPassword({
    password: input.password,
    realm: input.keycloakCredentials.realm,
    userId: token.userId
  })

  if (resultKeycloakForgotPassword === undefined){
    throw new NotSendToken()
  }

  const tokenDeleted = await rememberTokenRepo.delete({
    id: token.id,
    tenantConnectionName: input.tenantConnectionName
  })

  if (tokenDeleted === undefined || !tokenDeleted){
    throw new NotDeleteToken()
  }

  await microserviceEvents.dispatchSendEvent({
    domain: input.domain,
    slug: 'auth.forgot-password.change-password',
    userId: token.userId,
    lang: 'en'
  })

  return {
    success: true
  }
}
