import { UserStore } from '@/domain/contracts/gateways'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { UserStoreUseCase } from '../user'

type Setup = (firebase: any) => UserStoreUseCase
type Input = UserStore.Input
type Output = UserStore.Output

export type LoginStoreUseCase = (input: Input) => Promise<Output>

export const setupLoginStore: Setup = ({ firebase }) => async input => {
  const auth = getAuth(firebase)
  const userCredential = await signInWithEmailAndPassword(auth, input.email, input.password)
  const user = userCredential.user

  // Obtém o token JWT do usuário
  const token = await user.getIdToken()
  console.log('Token JWT:', token)

  // Opcional: você pode obter o token decodificado com informações adicionais
  const tokenResult = await user.getIdTokenResult()
  console.log('Informações do token:', tokenResult)

  console.log('Usuário logado:', user)

  return { token }
}
