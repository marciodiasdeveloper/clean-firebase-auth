import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeForgotPasswordController, makeValidateTokenController, makeUpdatePasswordController } from '@/main/factories/application/controllers'

import { Router } from 'express'
import { domainMiddleware, keycloakCredentials, databaseTenant } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/forgot-password', domainMiddleware, keycloakCredentials, databaseTenant, adapt(makeForgotPasswordController()))
  router.post('/forgot-password/validate-token', domainMiddleware, keycloakCredentials, databaseTenant, adapt(makeValidateTokenController()))
  router.post('/forgot-password/change-password', domainMiddleware, keycloakCredentials, databaseTenant, adapt(makeUpdatePasswordController()))
  // router.post('/token/retrieve', validateDomain, adapt(makeAuthorizationRetrieveTokenController()))
}
