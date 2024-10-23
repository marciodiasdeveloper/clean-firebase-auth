export interface UserCreatedMail {
  userCreatedMail: (input: UserCreatedMail.Input) => Promise<UserCreatedMail.Output>
}

export namespace UserCreatedMail {
  export type Input = {
    domain: string
    email: string
    nome: string
    password: string
    createdAt: Date
  }
  export type Output = undefined | {
    success: boolean
  }
}
