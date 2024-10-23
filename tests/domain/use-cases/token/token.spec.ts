import { AuthorizationTokenUseCase, setupAuthorizationToken } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'
import { AuthorizationToken, MicroserviceEventsSendEvent, SendMessage, UserInfoKeycloak } from '@/domain/contracts/gateways'
describe('AuthorizationTokenUseCase', () => {
  let mockKeycloak: MockProxy<AuthorizationToken>
  let mockUserInfo: MockProxy<UserInfoKeycloak>
  let microserviceUser: MockProxy<SendMessage>
  let sut: AuthorizationTokenUseCase

  let mockMicroserviceEvents: MockProxy<MicroserviceEventsSendEvent>

  const mockInputUser = {
    username: 'aaa',
    password: 'bbb',
    keycloakCredentials: {
      clientName: 'client',
      clientSecret: 'secret',
      realm: 'realm'
    },
    ipAddress: ''
  }

  const responseMockAuthorization = {
    access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyc2FDaVZzOHdLRTNUdjZrVEptT2RESTNfVEt0bGVyYWJiUWZmV1FEOEpBIn0.eyJleHAiOjE2NzU4OTE3OTYsImlhdCI6MTY3NTg5MTQ5NiwianRpIjoiZDNmMDA3MWItNGE1Mi00MWFjLWI3ZWUtZWI2YWYyZGFiOGEyIiwiaXNzIjoiaHR0cDovLzEyNy4wLjAuMTo4MDEwL3JlYWxtcy9jdXN0b21lcl8xMzciLCJzdWIiOiJlZGQxYTRjYy0wMGY0LTRiN2UtYjJkYi00NzljNGI1NTE3ZGIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjdXN0b21lcl8xMzciLCJzZXNzaW9uX3N0YXRlIjoiYzYyNDEwYzgtNDhjNy00NjFlLWJhOGUtZTMwYTk0OTlkMzQ0Iiwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiYzYyNDEwYzgtNDhjNy00NjFlLWJhOGUtZTMwYTk0OTlkMzQ0IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJsdWNhbyBhdSBhdSIsInByZWZlcnJlZF91c2VybmFtZSI6Im1ldWVtYWlsQG1ldS5jb20iLCJnaXZlbl9uYW1lIjoibHVjYW8iLCJmYW1pbHlfbmFtZSI6ImF1IGF1IiwiZW1haWwiOiJtZXVlbWFpbEBtZXUuY29tIn0.FqGrGMVv0ITOx7ysfqIyHtNu9Ns-oTBZa5wn_G99dCMjwaE5HFMCl59fe4LFJQ2z74OFivbqyyGX9p5WrTyXloyWKQjcKWj_NQTiTCfUL2TBKFUSSsswv5Q78AtvkcZ2DVoLWs9LP__AhXgg6r91aQStXpQlsLWkgk8VTSJzafsmADmyoYN_S3fBAsbkAEqhICDezus2HP9aS1P_VyCJIqLuuqjUgVvwB9uHJYJJWW2OpA5zGcmxmBODEX-DYL7sAnSFS27tRn0Nf9NKQLL6mHQ6W3ha8O4DozYWlrFbuu7oNazjWWAdPlqiFjKhzvDV2jDe_n5ZQKmCWhosOWiV4w',
    expires_in: 300,
    refresh_expires_in: 1800,
    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1NjBkYmYyZS1mZmEyLTQzYzgtYjkwYy0yYTVlYWI1Mjc4MzUifQ.eyJleHAiOjE2NzU4OTMyOTYsImlhdCI6MTY3NTg5MTQ5NiwianRpIjoiNzFkYTA1NWQtNWM0Ny00ODNhLTk4MTctNzMwYzEwNDU2MzhkIiwiaXNzIjoiaHR0cDovLzEyNy4wLjAuMTo4MDEwL3JlYWxtcy9jdXN0b21lcl8xMzciLCJhdWQiOiJodHRwOi8vMTI3LjAuMC4xOjgwMTAvcmVhbG1zL2N1c3RvbWVyXzEzNyIsInN1YiI6ImVkZDFhNGNjLTAwZjQtNGI3ZS1iMmRiLTQ3OWM0YjU1MTdkYiIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJjdXN0b21lcl8xMzciLCJzZXNzaW9uX3N0YXRlIjoiYzYyNDEwYzgtNDhjNy00NjFlLWJhOGUtZTMwYTk0OTlkMzQ0Iiwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiYzYyNDEwYzgtNDhjNy00NjFlLWJhOGUtZTMwYTk0OTlkMzQ0In0.Rng2LvogxnxH-K8Y8upn4ukwE8RGvz8KbxWj5pPIKEQ',
    token_type: 'Bearer',
    'not-before-policy': 0,
    session_state: 'c62410c8-48c7-461e-ba8e-e30a9499d344',
    scope: 'email profile'
  }

  beforeAll(() => {
    mockKeycloak = mock()
    mockKeycloak.authorizationToken.mockResolvedValue(responseMockAuthorization)

    mockUserInfo = mock()
    mockUserInfo.userInfo.mockResolvedValue({
      address: undefined,
      email: 'any_email',
      email_verified: false,
      family_name: 'any_family_name',
      given_name: 'any_given_name',
      name: 'any_name',
      preferred_username: 'any_username',
      roles: [],
      sub: 'any_sub',
      upn: 'any_upn'
    })

    microserviceUser = mock()
    microserviceUser.sendMessage.mockResolvedValue(undefined)

    mockMicroserviceEvents = mock()
    mockMicroserviceEvents.dispatchSendEvent.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = setupAuthorizationToken(mockKeycloak, mockUserInfo, microserviceUser, mockMicroserviceEvents)
  })

  describe('setupAuthorizationToken', () => {
    it('should make login and get token', async () => {
      const data = await sut(mockInputUser)
      expect(data).toEqual(responseMockAuthorization)
    })

    it('should call dispatchSendEvent ', async () => {
      await sut(mockInputUser)
      expect(mockMicroserviceEvents.dispatchSendEvent).toHaveBeenCalled()
    })
    it('should trow error when not get authorization token', async () => {
      mockKeycloak.authorizationToken.mockResolvedValue(undefined)
      const error = new Error('Authentication failed')
      const data = sut(mockInputUser)
      void expect(data).rejects.toThrow(error)
    })
  })
})
