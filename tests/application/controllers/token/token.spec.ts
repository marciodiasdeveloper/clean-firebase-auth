import { Controller, AuthorizationTokenController } from '@/application/controllers'
import { ServerError } from '@/application/errors'
import { RequiredString } from '@/application/validation'
import { AuthorizationTokenError, AuthorizationDomainNotValidError } from '@/domain/entities'

import { v4 as uuidv4 } from 'uuid'

describe('AuthorizationTokenController', () => {
  let sut: AuthorizationTokenController
  let sutAuthorizationToken: jest.Mock

  const mockHttpRequestInput = {
    keycloakCredentials: {
      realm: 'realm',
      clientSecret: 'secret',
      clientName: 'name'
    },
    username: 'foo@bar.com,',
    password: 'password'
  }

  beforeAll(() => {
    sutAuthorizationToken = jest.fn()
    sutAuthorizationToken.mockResolvedValue({ uuid: uuidv4().toString() })
  })

  beforeEach(() => {
    sut = new AuthorizationTokenController(sutAuthorizationToken)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
  it('should call Category with correct input', async () => {
    await sut.handle(mockHttpRequestInput)
    expect(sutAuthorizationToken).toHaveBeenCalledWith(mockHttpRequestInput)
    expect(sutAuthorizationToken).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if AuthorizationTokenError fails', async () => {
    sutAuthorizationToken = jest.fn()
    sutAuthorizationToken.mockRejectedValueOnce(new AuthorizationTokenError())
    sut = new AuthorizationTokenController(sutAuthorizationToken)

    const httpResponse = await sut.handle(mockHttpRequestInput)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new AuthorizationTokenError()
    })
  })

  it('should return 400 if AuthorizationDomainNotValidError fails', async () => {
    sutAuthorizationToken = jest.fn()
    sutAuthorizationToken.mockRejectedValueOnce(new AuthorizationDomainNotValidError())
    sut = new AuthorizationTokenController(sutAuthorizationToken)

    const httpResponse = await sut.handle(mockHttpRequestInput)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new AuthorizationDomainNotValidError()
    })
  })

  it('should build Validators correctly on save', async () => {
    const validators = sut.buildValidators({
      tenant: { realm: '', clientName: '', clientSecret: '' },
      username: '',
      password: ''
    })

    expect(validators).toEqual([
      new RequiredString('', 'username'),
      new RequiredString('', 'password')
    ])
  })

  it('should return 500 if fails new Error', async () => {
    sutAuthorizationToken = jest.fn()
    sutAuthorizationToken.mockRejectedValueOnce(new Error())

    sut = new AuthorizationTokenController(sutAuthorizationToken)

    const httpResponse = await sut.handle(mockHttpRequestInput)

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError()
    })
  })
})
