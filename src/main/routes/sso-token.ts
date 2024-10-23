// import { adaptExpressRoute as adapt } from '@/main/adapters'
// import { makeUpdatePasswordController } from '@/main/factories/application/controllers'

import { Router } from 'express'
// import { domainMiddleware, keycloakCredentials, databaseTenant } from '@/main/middlewares'

export default (router: Router): void => {
  // router.post('/forgot-password', domainMiddleware, databaseTenant, adapt(makeForgotPasswordController()))
  // router.post('/forgot-password/validate-token', domainMiddleware, keycloakCredentials, databaseTenant, adapt(makeValidateTokenController()))
  // router.post('/sso/login', domainMiddleware, keycloakCredentials, databaseTenant, adapt(makeUpdatePasswordController()))
}
