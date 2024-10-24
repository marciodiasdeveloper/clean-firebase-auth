import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeForgotPasswordStoreController } from '@/main/factories/application/controllers'
import { Router } from 'express'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.get('/tasks', auth({}), adapt(makeForgotPasswordStoreController()))
  router.post('/tasks', auth({}), adapt(makeForgotPasswordStoreController()))
  router.get('/tasks/{id}', auth({}), adapt(makeForgotPasswordStoreController()))
  router.put('/tasks/{id}', auth({}), adapt(makeForgotPasswordStoreController()))
  router.delete('/tasks/{id}', auth({}), adapt(makeForgotPasswordStoreController()))
}
