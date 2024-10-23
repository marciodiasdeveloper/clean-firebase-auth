import {
  setupAuthorizationToken,
  AuthorizationTokenUseCase
} from '@/domain/use-cases'
import {
  makeMicroserviceEvents,
  makeMicroserviceKeycloak,
  makeMicroserviceUser
} from '@/main/factories/infra/gateways'

export const makeAuthorizationToken = (): AuthorizationTokenUseCase => {
  return setupAuthorizationToken(
    makeMicroserviceKeycloak(),
    makeMicroserviceKeycloak(),
    makeMicroserviceUser(),
    makeMicroserviceEvents()
  )
}
