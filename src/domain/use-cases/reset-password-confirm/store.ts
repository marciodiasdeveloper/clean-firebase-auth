import { UserStore } from '@/domain/contracts/gateways'
import { confirmPasswordReset, getAuth } from 'firebase/auth'
import { UserStoreUseCase } from '../user'

type Setup = (firebase: any) => UserStoreUseCase
type Input = UserStore.Input
type Output = UserStore.Output

export type LoginStoreUseCase = (input: Input) => Promise<Output>

export const setupResetPasswordConfimStore: Setup = ({ firebase }) => async input => {
  const auth = getAuth(firebase)

  const resetEmail = await confirmPasswordReset(auth, input.oobCode, input.newPassword)

  return resetEmail
}
