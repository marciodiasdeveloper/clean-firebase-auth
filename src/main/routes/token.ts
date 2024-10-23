import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeAuthorizationTokenController, makeAuthorizationRetrieveTokenController } from '@/main/factories/application/controllers'

import { Router } from 'express'
import { ipAddress, domainMiddleware, keycloakCredentials } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/token', domainMiddleware, keycloakCredentials, ipAddress, adapt(makeAuthorizationTokenController()))
  router.post('/token/retrieve', domainMiddleware, keycloakCredentials, adapt(makeAuthorizationRetrieveTokenController()))
}
