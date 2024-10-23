import { adaptExpressMiddlewareWithParms } from '@/main/adapters'
import { makeAuthenticationMiddleware } from '@/main/factories/application/middlewares'

export const auth = adaptExpressMiddlewareWithParms(makeAuthenticationMiddleware())
