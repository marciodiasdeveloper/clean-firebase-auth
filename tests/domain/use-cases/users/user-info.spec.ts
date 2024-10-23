import { UserInfoKeycloak } from '@/domain/contracts/gateways'
import { UserInfo, setupUserInfo } from '@/domain/use-cases'
import { mock, MockProxy } from 'jest-mock-extended'

describe('UserInfo', () => {
  let sut: UserInfo
  let userInfo: MockProxy<UserInfoKeycloak>

  const output = {
    sub: '',
    upn: '',
    email_verified: true,
    address: {},
    roles: [''],
    name: '',
    preferred_username: '',
    given_name: '',
    family_name: '',
    email: ''
  }

  beforeAll(() => {
    userInfo = mock()

    userInfo.userInfo.mockResolvedValue({
      sub: '',
      upn: '',
      email_verified: true,
      address: {},
      roles: [''],
      name: '',
      preferred_username: '',
      given_name: '',
      family_name: '',
      email: ''
    })
  })

  beforeEach(() => {
    sut = setupUserInfo(
      userInfo
    )
  })

  it('should userInfo show error not found user', async () => {
    const error = new Error('Not Found User Info')
    userInfo.userInfo.mockResolvedValueOnce(undefined)
    const promise = sut({
      realm: 'myRealm',
      token: 'token'
    })

    void expect(promise).rejects.toThrow(error)
  })
  it('should call handle sucess', async () => {
    const response = await sut({
      realm: 'myRealm',
      token: 'token'
    })

    void expect(response).toEqual(output)
  })
})
