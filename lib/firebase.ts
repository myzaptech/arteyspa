// Mock Firebase implementation for v0 environment
let mockDb: any = null
let mockStorage: any = null

// Check if Firebase is available
const isFirebaseAvailable = () => {
  try {
    // Try to import Firebase - this will fail in v0 environment
    return typeof window !== "undefined" && window.firebase !== undefined
  } catch {
    return false
  }
}

if (isFirebaseAvailable()) {
  // Real Firebase implementation (when available)
  try {
    const { initializeApp } = require("firebase/app")
    const { getFirestore } = require("firebase/firestore")
    const { getStorage } = require("firebase/storage")

    const firebaseConfig = {
      apiKey: "AIzaSyA5bYwm-ZloEdpnAZAtLRNMHYGs9O8Yezg",
      authDomain: "data-spa.firebaseapp.com",
      projectId: "data-spa",
      storageBucket: "data-spa.firebasestorage.app",
      messagingSenderId: "1036421671504",
      appId: "1:1036421671504:web:a173fa80cafb2f67b87f55",
      measurementId: "G-EB260DTHVM",
    }

    const app = initializeApp(firebaseConfig)
    mockDb = getFirestore(app)
    mockStorage = getStorage(app)
  } catch (error) {
    console.warn("Firebase not available, using mock implementation")
  }
}

// Export mock objects that will be replaced with real Firebase when available
export const db = mockDb
export const storage = mockStorage
export const isUsingMockFirebase = !isFirebaseAvailable()
