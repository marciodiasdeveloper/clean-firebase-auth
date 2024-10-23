export interface SSOTokenByUserIdShow {
  showByUserId: (input: SSOTokenByUserIdShow.Input) => Promise<SSOTokenByUserIdShow.Output>
}

export namespace SSOTokenByUserIdShow {
  export type Input = {
    userId: string
  }

  export type Output = undefined | {
    id: string
    userId: string
    token: string
    createdAt: Date
  }
}
