export interface UserStore {
  store: (input: UserStore.Input) => Promise<UserStore.Output>
}

export namespace UserStore {
  // eslint-disable-next-line @typescript-eslint/ban-types
  export type Input = {
    email: string
    password: string
  }
  export type Output = undefined | {
    message: string
  }
}
