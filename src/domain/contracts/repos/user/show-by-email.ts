import { StatusEnum } from '@/infra/repos/entities/types'
import { AppearanceEnum, LangEnum } from '@/domain/contracts/authentication'

export interface UserShowByEmail {
  showByEmail: (input: UserShowByEmail.Input) => Promise<UserShowByEmail.Output>
}

export namespace UserShowByEmail {
  export type Input = {
    email: string
  }

  export type Output = undefined | {
    id: string
    firstName: string
    lastName: string
    nickname?: string
    email: string
    status: StatusEnum
    lang: LangEnum
    appearance: AppearanceEnum
    createdAt: Date
    updatedAt?: Date
  }
}
