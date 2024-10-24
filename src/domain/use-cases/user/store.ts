import { AuthEmailAlreadyInUse } from '@/application/errors'
import { UserStore } from '@/domain/contracts/gateways'
import { getAuth, updateProfile, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

type Setup = (firebase: any) => UserStoreUseCase
type Input = UserStore.Input
type Output = UserStore.Output

export type UserStoreUseCase = (input: Input) => Promise<Output>

export const setupUserStore: Setup = ({ firebase }) => async input => {
  const auth = getAuth(firebase)
  const db = getFirestore(firebase) // Atualiza o perfil do usuário com nome

  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, input.email, input.password)
    const user = userCredential.user

    // Atualiza o perfil do usuário com nome
    await updateProfile(user, {
      displayName,
      phoneNumber // Firebase Auth não armazena phoneNumber diretamente
    })

    // Armazena informações adicionais no Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName,
      phoneNumber,
      createdAt: new Date().toISOString()
    })

    return user
  } catch (error: any) {
    console.log(error)
    if (error.code === 'auth/email-already-in-use') {
      throw new AuthEmailAlreadyInUse()
    }
  }
}
