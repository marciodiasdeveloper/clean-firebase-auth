import { UserStore } from '@/domain/contracts/gateways'
import { getAuth, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'

type Setup = (firebase: any) => UserStoreUseCase
type Input = UserStore.Input
type Output = UserStore.Output

export type UserStoreUseCase = (input: Input) => Promise<Output>

export const setupUserStore: Setup = ({ firebase }) => async input => {
  console.log(' setupUseStore')
  const auth = getAuth(firebase)

  console.log(auth)
  const user: UserCredential = await createUserWithEmailAndPassword(auth, input.email, input.password)

  console.log(user)

  return user
}
