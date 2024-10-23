import { forbidden, HttpResponse, ok } from '@/application/helpers'
import { Middleware } from '@/application/middlewares'
import { GetIpAddressExpress } from '@/domain/use-cases'

type HttpRequest = { ipAddress: string }
type Model = Error | { ipAddress: string }

export class IpAddressMiddleware extends Middleware {
  constructor (private readonly getIpAddress: GetIpAddressExpress) {
    super()
  }

  async perform (input: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const result = await this.getIpAddress(input)
      return ok({ ipAddress: result.ipAddress })
    } catch (error) {
      return forbidden()
    }
  }
}
