export interface InternalTokenValidate {
  validate: (input: InternalTokenValidate.Input) => InternalTokenValidate.Output
}

export namespace InternalTokenValidate {
  export type Input = {
    token: string
  }
  export type Output = boolean
}
