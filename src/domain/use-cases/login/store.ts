import { UserStore } from '@/domain/contracts/gateways'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

type Setup = (firebase: any) => UserStoreUseCase
type Input = UserStore.Input
type Output = UserStore.Output

export type LoginStoreUseCase = (input: Input) => Promise<Output>

export const setupLoginStore: Setup = ({ firebase }) => async input => {
  const auth = getAuth(firebase)
  const userCredential = await signInWithEmailAndPassword(auth, input.email, input.password)
  const user = userCredential.user
  console.log('Usuário logado:', user)

  return user
}
