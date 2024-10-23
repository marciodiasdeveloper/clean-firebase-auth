import { TcpResponse, tcpBadRequest, tcpNotFound, tcpUnauthorized, tcpForbidden } from '@/application/helpers'
import { validateError } from '@/application/errors/validate-error'
import { Validator } from '@/domain/contracts/gateways'

interface HttpRequest extends Record<string, unknown>{}
export abstract class MiddlewareTcp {
  abstract perform (httpRequest: HttpRequest): Promise<TcpResponse>

  buildValidators (httpRequest: HttpRequest): Validator[] {
    return []
  }

  async handle (httpRequest: HttpRequest): Promise<TcpResponse> {
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      return validateError<Promise<TcpResponse>>(error as Error, {
        serverError: tcpForbidden,
        unauthorized: tcpUnauthorized,
        badRequest: tcpBadRequest,
        notFound: tcpNotFound
      }, httpRequest)
    }
  }
}
