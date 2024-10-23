import { TcpResponse, tcpOk } from '@/application/helpers'
import { MiddlewareTcp } from '@/application/middlewares'
import { Validator } from '@/domain/contracts/gateways'
import { DomainUseCase } from '@/domain/use-cases'

type HttpRequest = { origin: string, host: string }
type Model = Error | { domain: string }

export class ValidateDomainMiddlewareTcp extends MiddlewareTcp {
  constructor (private readonly getDatabase: DomainUseCase) {
    super()
  }

  async perform ({ origin, host, ...rest }: HttpRequest): Promise<TcpResponse<Model>> {
    const result = await this.getDatabase({ host: origin ?? host })

    return tcpOk({ domain: result })
  }

  override buildValidators (data: HttpRequest): Validator[] {
    return [

    ]
  }
}
