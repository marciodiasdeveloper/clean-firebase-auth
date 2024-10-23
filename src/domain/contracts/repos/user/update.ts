import { StatusEnum } from '@/infra/repos/entities/types'

export interface UserUpdate {
  update: (input: UserUpdate.Input) => Promise<UserUpdate.Output>
}

export namespace UserUpdate {
  export type Input = {
    id: string
    firstName: string
    lastName: string
    nickname?: string
    email: string
    status: StatusEnum
  }

  export type Output = undefined | {
    id: string
    firstName: string
    lastName: string
    nickname?: string
    email: string
    status: StatusEnum
    createdAt: Date
    updatedAt: undefined | Date
  }
}
