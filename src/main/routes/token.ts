import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeAuthorizationTokenController } from '@/main/factories/application/controllers'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/token', adapt(makeAuthorizationTokenController()))
}
