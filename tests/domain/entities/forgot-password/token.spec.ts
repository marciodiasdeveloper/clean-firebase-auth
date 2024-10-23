import { Token } from '@/domain/entities'

const MILLISECONDS = 1000
const SECONDS = 60
const MINUTES_TO_EXPIRE_TOKEN = 30
const TIME_TO_EXPIRE_TOKEN = SECONDS * MILLISECONDS * MINUTES_TO_EXPIRE_TOKEN

describe('Token', () => {
  let sut: Token
  const currentDate = new Date()

  beforeEach(() => {
    sut = new Token(
      {
        createdAt: new Date(),
        token: ''
      }
    )
  })

  it('should return undefined when valid token', () => {
    const result = sut.validateToken()
    expect(result).toBe(true)
  })
  it('should return a expired token', () => {
    const sut = new Token(
      {
        createdAt: new Date(currentDate.getTime() - +(TIME_TO_EXPIRE_TOKEN * 3)),
        token: ''
      }
    )
    expect(sut.validateToken()).toBe(false)
  })
})
