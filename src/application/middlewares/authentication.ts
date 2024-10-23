import { HttpResponse, ok } from '@/application/helpers'
import { Middleware } from '@/application/middlewares'
import { ValidationBuilder as Builder } from '@/application/validation'
import { Validator } from '@/domain/contracts/gateways'
import { AuthorizationTokenValidateUseCase } from '@/domain/use-cases/authorization-token'

type HttpRequest = { authorization: string, origin: string, roles: string[] }
type Model = Error | {
  user: {
    name: string
    email: string
    roles: string[]
  }
}

export class AuthenticationMiddleware extends Middleware {
  constructor (private readonly authorizationTokenDecode: AuthorizationTokenValidateUseCase) {
    super()
  }

  async perform ({ authorization, origin, roles }: HttpRequest): Promise<HttpResponse<Model>> {
    const tokenDecoded = await this.authorizationTokenDecode({ token: authorization, domain: origin, roles })

    return ok(tokenDecoded)
  }

  override buildValidators (data: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: data.authorization, fieldName: 'authorization' }).required().build()
    ]
  }
}
