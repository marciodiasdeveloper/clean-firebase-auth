import { InvalidTokenError } from '@/application/errors'

interface Output {
  domain: string
  roles: string[]
  token: string
}

export class ValidateAuthorization {
  constructor (
    private readonly token: string,
    private readonly domain: string,
    private readonly roles: string[]
  ) { }

  validateAuth (): Output {
    if (!this.token.includes(' ')) {
      throw new InvalidTokenError()
    }
    const splitedToken = this.token.split(' ')
    if (splitedToken.length !== 2) {
      throw new InvalidTokenError()
    }
    return {
      domain: this.domain,
      roles: this.roles,
      token: splitedToken[1]
    }
  }
}
