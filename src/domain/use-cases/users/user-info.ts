import { UserInfoKeycloak } from '@/domain/contracts/gateways'
import { NotFoundUserInfoError } from '@/domain/entities'

type Setup = (keycloak: UserInfoKeycloak) => UserInfoUseCase
type Input = {
  token: string
  keycloakCredentials: {
    realm: string
  }
}
type Output = {
  sub: string
  upn: string
  email_verified: boolean
  address?: object
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
}
export type UserInfoUseCase = (input: Input) => Promise<Output>

export const setupUserInfo: Setup = (userInfo) => async input => {
  const userResult = await userInfo.userInfo({
    tenant: input.keycloakCredentials,
    token: input.token
  })

  if (userResult == null){
    throw new NotFoundUserInfoError()
  }
  return userResult
}
