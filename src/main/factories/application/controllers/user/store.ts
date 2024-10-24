import { makeUserStore } from '@/main/factories/domain/use-cases'
import { PingController, Controller } from '@/application/controllers'
import { makeValidationController } from '@/main/factories/application/decorators'

export const makeUserStoreController = (): Controller => {
  const controller = new PingController(makeUserStore())
  return makeValidationController(controller)
}
