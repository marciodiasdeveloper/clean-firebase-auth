import { UserStore } from '@/domain/contracts/gateways'

type Setup = (firebase: any) => UserStoreUseCase
type Input = UserStore.Input
type Output = UserStore.Output

export type UserStoreUseCase = (input: Input) => Promise<Output>

export const setupUserStore: Setup = (firebase) => async input => {
  return { message: 'pong' }
}
