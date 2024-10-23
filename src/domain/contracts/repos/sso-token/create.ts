export interface SSOTokenCreate {
  create: (input: SSOTokenCreate.Input) => Promise<SSOTokenCreate.Output>
}

export namespace SSOTokenCreate {
  export type Input = {
    userId: string
    token: string
    createdAt: Date
  }

  export type Output = undefined | {
    id: string
    userId: string
    token: string
    createdAt: Date
  }
}
