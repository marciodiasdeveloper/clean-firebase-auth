import { Middleware, IpAddressMiddleware } from '@/application/middlewares'
import { setupGetIpAddressExpress } from '@/domain/use-cases'

export const makeIpAddressMiddleware = (): Middleware => {
  const useCase = setupGetIpAddressExpress()
  return new IpAddressMiddleware(useCase)
}
