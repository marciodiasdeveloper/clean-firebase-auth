export interface SSOTokenShow {
  show: (input: SSOTokenShow.Input) => Promise<SSOTokenShow.Output>
}

export namespace SSOTokenShow {
  export type Input = {
    id: string
  }

  export type Output = undefined | {
    id: string
    userId: string
    token: string
    createdAt: Date
  }
}
