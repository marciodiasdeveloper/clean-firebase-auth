import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ValidationBuilder as Builder } from '@/application/validation'
import { AuthorizationToken, Validator } from '@/domain/contracts/gateways'
import { AuthorizationTokenUseCase } from '@/domain/use-cases'

type HttpRequest = {
  keycloakCredentials: {
    realm: string
    clientSecret: string
    clientName: string
  }
  ipAddress: string
  username: string
  password: string
  domain: string
}
type Model = Error | AuthorizationToken.Output

export class AuthorizationTokenController extends Controller {
  constructor (private readonly authorizationToken: AuthorizationTokenUseCase) {
    super()
  }

  async perform ({ keycloakCredentials, domain, username, password, ipAddress }: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.authorizationToken({ keycloakCredentials, domain, username, password, ipAddress })
    return ok(data)
  }

  override buildValidators ({ username, password }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: username, fieldName: 'username' }).required().build(),
      ...Builder.of({ value: password, fieldName: 'password' }).required().build()
    ]
  }
}
