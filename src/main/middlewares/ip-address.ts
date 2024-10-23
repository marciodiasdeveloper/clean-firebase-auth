import { adaptExpressMiddleware } from '@/main/adapters'
import { makeIpAddressMiddleware } from '@/main/factories/application/middlewares'

export const ipAddress = adaptExpressMiddleware(makeIpAddressMiddleware())
