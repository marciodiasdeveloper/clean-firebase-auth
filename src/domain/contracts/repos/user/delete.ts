export interface UserDelete {
  delete: (input: UserDelete.Input) => Promise<UserDelete.Output>
}

export namespace UserDelete {
  export type Input = {
    id: string
  }

  export type Output = undefined | {
    success: boolean
  }
}
