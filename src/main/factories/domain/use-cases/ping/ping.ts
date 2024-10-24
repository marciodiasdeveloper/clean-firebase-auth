import {
  setupPing,
  PingUseCase
} from '@/domain/use-cases'

export const makePing = (): PingUseCase => {
  return setupPing()
}
