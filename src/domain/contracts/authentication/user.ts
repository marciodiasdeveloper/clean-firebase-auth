export enum AppearanceEnum {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum LangEnum {
  PT_BR = 'pt-BR',
  EN = 'en'
}
export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  OWNER = 'owner',
  MANAGER = 'manager'
}
export type User = {
  name: string
  userId: string
  email: string
  tenant: string
  tenantId: string
  lang: LangEnum
  roles: string[]
}

export type AuthorizationUser = {
  user: User
}
