import { initializeApp } from '@firebase/app'
import { connectAuthEmulator, getAuth, User } from '@firebase/auth'
import { connectFirestoreEmulator, getFirestore } from '@firebase/firestore'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(config)

export const auth = getAuth(app)
export const firestore = getFirestore(app)

if (process.env.NEXT_PUBLIC_ENV_NAME === 'localhost') {
  connectAuthEmulator(auth, 'http://localhost:9099', {
    disableWarnings: true,
  })
  connectFirestoreEmulator(firestore, 'localhost', 8080)
}

// @see https://zenn.dev/phi/articles/firebase-auth-wait-for-initialization
export const initAuth = (): Promise<User | null> => {
  return new Promise(resolve => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      resolve(user)

      unsubscribe()
    })
  })
}
