import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeUserInfoController } from '@/main/factories/application/controllers'

import { Router } from 'express'
import { domainMiddleware, keycloakCredentials } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/user/info', domainMiddleware, keycloakCredentials, adapt(makeUserInfoController()))
}
