import { AuthorizationRetrieveToken } from '@/domain/contracts/gateways'

type Setup = (microserviceKeycloak: AuthorizationRetrieveToken) => AuthorizationRetrieveTokenUseCase
type Input = AuthorizationRetrieveToken.Input
type Output = AuthorizationRetrieveToken.Output

export type AuthorizationRetrieveTokenUseCase = (input: Input) => Promise<Output>

export const setupAuthorizationRetrieveToken: Setup = (microserviceKeycloak) => async input => {
  const result = await microserviceKeycloak.authorizationRetrieveToken({
    refreshToken: input.refreshToken,
    tenant: input.keycloakCredentials
  })
  return result
}
