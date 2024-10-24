import { UserStore } from '@/domain/contracts/gateways'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { UserStoreUseCase } from '../user'

type Setup = (firebase: any) => UserStoreUseCase
type Input = UserStore.Input
type Output = UserStore.Output

export type LoginStoreUseCase = (input: Input) => Promise<Output>

export const setupLoginStore: Setup = ({ firebase }) => async input => {
  const auth = getAuth(firebase)

  const resetEmail = await sendPasswordResetEmail(auth, email)

  return resetEmail
}
