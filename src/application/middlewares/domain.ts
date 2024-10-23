import { HttpResponse, ok } from '@/application/helpers'
import { Middleware } from '@/application/middlewares'
import { ValidationBuilder as Builder } from '@/application/validation'
import { Validator } from '@/domain/contracts/gateways'
import { DomainUseCase } from '@/domain/use-cases'

type HttpRequest = { origin: string, host: string }
type Model = Error | { domain: string }

export class ValidateDomainMiddleware extends Middleware {
  constructor (private readonly getDatabase: DomainUseCase) {
    super()
  }

  async perform ({ origin, host }: HttpRequest): Promise<HttpResponse<Model>> {
    const result = await this.getDatabase({ host: origin ?? host })

    return ok({ domain: result })
  }

  override buildValidators (data: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: data.origin, fieldName: 'origin' }).required().build()
    ]
  }
}
