import { Express } from 'express'
import { initializeApp } from 'firebase/app'
import { env } from './env'

export const setupFirebaseConfig = (app: Express): void => {
  const firebaseConfig = {
    apiKey: env.firebase.apiKey,
    authDomain: env.firebase.authDomain,
    projectId: env.firebase.projectId,
    storageBucket: env.firebase.storageBucket,
    messagingSenderId: env.firebase.messagingSenderId,
    appId: env.firebase.appId
  }

  // Initialize Firebase
  initializeApp(firebaseConfig)
}
