import { MicroserviceCoreGetRealmConfig } from '@/domain/contracts'
import { ForgotPassword } from '@/domain/contracts/gateways/microservice/keycloak/forgot-password'
import { SSOTokenByTokenShow, SSOTokenDelete } from '@/domain/contracts/repos'
import { Token } from '@/domain/entities'
import { NotFoundToken, NotSendToken, TokenExpiredError, NotDeleteToken, NotFoundKeyCloakConfig } from '@/domain/entities/errors'

type Setup = (
  SSOTokenRepo: SSOTokenByTokenShow & SSOTokenDelete,
  keycloakMicroservice: ForgotPassword,
  coreMicroservice: MicroserviceCoreGetRealmConfig
) => LoginSSOTokenUseCase
type Input = { token: string, domain: string }
type Output = { success: boolean }
export type LoginSSOTokenUseCase = (input: Input) => Promise<Output>

export const setupLoginSSOToken: Setup = (SSOTokenRepo, keycloakMicroservice, coreMicroservice) => async input => {
  const token = await SSOTokenRepo.showByToken({
    token: input.token
  })
  if (token === undefined){
    throw new NotFoundToken()
  }

  const isValidToken = new Token(token).validateToken()
  if (!isValidToken) {
    throw new TokenExpiredError()
  }

  const keycloakConfig = await coreMicroservice.getRealmConfig({
    domain: input.domain
  })
  if (keycloakConfig === undefined){
    throw new NotFoundKeyCloakConfig()
  }

  const resultKeycloakForgotPassword = await keycloakMicroservice.forgotPassword({
    // password: input.password,
    realm: keycloakConfig.realm,
    userId: token.userId
  })
  if (resultKeycloakForgotPassword === undefined){
    throw new NotSendToken()
  }

  const tokenDeleted = await SSOTokenRepo.delete({
    id: token.id
  })
  if (tokenDeleted === undefined || !tokenDeleted){
    throw new NotDeleteToken()
  }

  return {
    success: true
  }
}
