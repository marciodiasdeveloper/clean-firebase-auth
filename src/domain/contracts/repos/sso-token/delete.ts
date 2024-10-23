export interface SSOTokenDelete {
  delete: (input: SSOTokenDelete.Input) => Promise<SSOTokenDelete.Output>
}

export namespace SSOTokenDelete {
  export type Input = {
    id: string
  }

  export type Output = undefined | boolean
}
