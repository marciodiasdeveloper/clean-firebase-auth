import { LangEnum } from '@/domain/contracts/authentication'

export interface AuthorizationTokenValidate {
  authorizeToken: (input: AuthorizationTokenValidate.Input) => Promise<AuthorizationTokenValidate.Output>
}

export namespace AuthorizationTokenValidate {
  export type Input = {
    token: string
    domain: string
    roles: string[]
  }
  export type Output = undefined | {
    name: string
    sub: string
    email: string
    tenant: string
    tenantId: string
    lang: LangEnum
    roles: string[]
  }
}
