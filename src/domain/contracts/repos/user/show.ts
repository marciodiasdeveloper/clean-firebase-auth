import { StatusEnum } from '@/infra/repos/entities/types'

export interface UserShow {
  show: (input: UserShow.Input) => Promise<UserShow.Output>
}

export namespace UserShow {
  export type Input = {
    id: string
  }

  export type Output = undefined | {
    id: string
    firstName: string
    lastName: string
    nickname?: string
    email: string
    status: StatusEnum
    createdAt: Date
    updatedAt?: Date
  }
}
