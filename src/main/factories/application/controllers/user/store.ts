import { makeUserStoreUseCase } from '@/main/factories/domain/use-cases'
import { UserStoreController, Controller } from '@/application/controllers'
import { makeValidationController } from '@/main/factories/application/decorators'

export const makeUserStoreController = (): Controller => {
  console.log('controller')
  const controller = new UserStoreController(makeUserStoreUseCase())
  return makeValidationController(controller)
}