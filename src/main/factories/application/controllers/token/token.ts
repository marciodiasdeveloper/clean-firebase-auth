import { makeAuthorizationToken } from '@/main/factories/domain/use-cases'
import { AuthorizationTokenController, Controller } from '@/application/controllers'
import { makeValidationPgController } from '@/main/factories/application/decorators'

export const makeAuthorizationTokenController = (): Controller => {
  const controller = new AuthorizationTokenController(makeAuthorizationToken())
  return makeValidationPgController(controller)
}
