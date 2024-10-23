export interface SSOTokenByTokenShow {
  showByToken: (input: SSOTokenByTokenShow.Input) => Promise<SSOTokenByTokenShow.Output>
}

export namespace SSOTokenByTokenShow {
  export type Input = {
    token: string
  }

  export type Output = undefined | {
    id: string
    userId: string
    token: string
    createdAt: Date
  }
}
