
interface TokenInput {
  token: string
  createdAt: Date
}
const MILLISECOND = 1000
const SECOND = 60
const MINUTE = SECOND * MILLISECOND

const MINUTES_TO_EXPIRE_TOKEN = 30

const TIME_TO_EXPIRE_TOKEN = MINUTE * MINUTES_TO_EXPIRE_TOKEN

export class Token {
  constructor (private readonly input: TokenInput){}

  validateToken (): boolean {
    const currentDate = new Date()
    const currentDateMilliseconds = currentDate.getTime()
    const dateWithExpireTime = this.input.createdAt.getTime() + TIME_TO_EXPIRE_TOKEN

    if (currentDateMilliseconds > dateWithExpireTime){
      return false
    }
    return true
  }
}
