import { StatusEnum } from '@/infra/repos/entities/types'

export interface UserCreate {
  create: (input: UserCreate.Input) => Promise<UserCreate.Output>
}

export namespace UserCreate {
  export type Input = {
    id: string
    firstName: string
    lastName: string
    nickname?: string
    email: string
    status: StatusEnum
  }

  export type Output = undefined | {
    success: boolean
  }
}
