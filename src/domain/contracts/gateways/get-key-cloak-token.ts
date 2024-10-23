export interface GetKeyCloakToken {
  getKeyCloakToken: (input: GetKeyCloakToken.Input) => Promise<GetKeyCloakToken.Output>
}

export namespace GetKeyCloakToken {
  export type Input = {
    tenant: string
  }
  export type Output = undefined | {
    clientSecret: string
    realm: string
  }
}
