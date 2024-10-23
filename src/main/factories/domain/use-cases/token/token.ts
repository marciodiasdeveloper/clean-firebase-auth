import {
  setupAuthorizationToken,
  AuthorizationTokenUseCase
} from '@/domain/use-cases'

export const makeAuthorizationToken = (): AuthorizationTokenUseCase => {
  return setupAuthorizationToken()
}
