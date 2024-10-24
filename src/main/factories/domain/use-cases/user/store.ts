import { FirebaseApp, initializeApp } from 'firebase/app'
import { env } from '@/main/config/env'
import 'firebase/auth'

import {
  setupLoginStore,
  UserStoreUseCase
} from '@/domain/use-cases'

export const makeLoginStoreUseCase = (): UserStoreUseCase => {
  const firebaseConfig = {
    apiKey: env.firebase.apiKey,
    authDomain: env.firebase.authDomain,
    projectId: env.firebase.projectId,
    storageBucket: env.firebase.storageBucket,
    messagingSenderId: env.firebase.messagingSenderId,
    appId: env.firebase.appId
  }

  // Initialize Firebase
  const firebase: FirebaseApp = initializeApp(firebaseConfig)

  console.log(' passou')
  return setupLoginStore({ firebase })
}
