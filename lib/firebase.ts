import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA5bYwm-ZloEdpnAZAtLRNMHYGs9O8Yezg",
  authDomain: "data-spa.firebaseapp.com",
  projectId: "data-spa",
  storageBucket: "data-spa.firebasestorage.app",
  messagingSenderId: "1036421671504",
  appId: "1:1036421671504:web:a173fa80cafb2f67b87f55",
  measurementId: "G-EB260DTHVM",
}

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
export const isUsingMockFirebase = false
