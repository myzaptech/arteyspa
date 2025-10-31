import { db, storage, isUsingMockFirebase } from "./firebase"

export interface Product {
  id?: string
  name: string
  subtitle: string
  description: string
  image: string
  category: string
  sectionId: string
}

export interface ProductSection {
  id?: string
  name: string
  slug: string
  description?: string
  createdAt: Date
}

// All data is now stored in Firebase Firestore
// No more localStorage fallbacks to prevent stale data

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { collection, getDocs } = await import("firebase/firestore")
    const querySnapshot = await getDocs(collection(db, "products"))
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Product,
    )
  } catch (error) {
    console.error("Error fetching products from Firebase:", error)
    // Return empty array instead of localStorage fallback
    return []
  }
}

export const getProductsBySection = async (sectionId: string): Promise<Product[]> => {
  try {
    const { collection, getDocs, query, where } = await import("firebase/firestore")
    const q = query(collection(db, "products"), where("sectionId", "==", sectionId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Product,
    )
  } catch (error) {
    console.error("Error fetching products by section from Firebase:", error)
    // Return empty array instead of localStorage fallback
    return []
  }
}

export const addProduct = async (product: Omit<Product, "id">): Promise<string | null> => {
  try {
    const { collection, addDoc } = await import("firebase/firestore")
    const docRef = await addDoc(collection(db, "products"), product)
    return docRef.id
  } catch (error) {
    console.error("Error adding product to Firebase:", error)
    return null
  }
}

export const updateProduct = async (id: string, product: Partial<Product>): Promise<boolean> => {
  try {
    const { doc, updateDoc } = await import("firebase/firestore")
    await updateDoc(doc(db, "products", id), product)
    return true
  } catch (error) {
    console.error("Error updating product in Firebase:", error)
    return false
  }
}

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const { doc, deleteDoc } = await import("firebase/firestore")
    await deleteDoc(doc(db, "products", id))
    return true
  } catch (error) {
    console.error("Error deleting product from Firebase:", error)
    return false
  }
}

export const getSections = async (): Promise<ProductSection[]> => {
  try {
    const { collection, getDocs } = await import("firebase/firestore")
    const querySnapshot = await getDocs(collection(db, "productSections"))
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as ProductSection,
    )
  } catch (error) {
    console.error("Error fetching sections from Firebase:", error)
    // Return empty array instead of localStorage fallback
    return []
  }
}

export const addSection = async (section: Omit<ProductSection, "id">): Promise<string | null> => {
  try {
    const { collection, addDoc } = await import("firebase/firestore")
    const docRef = await addDoc(collection(db, "productSections"), section)
    return docRef.id
  } catch (error) {
    console.error("Error adding section:", error)
    return null
  }
}

export const deleteSection = async (id: string): Promise<boolean> => {
  try {
    const { doc, deleteDoc } = await import("firebase/firestore")
    await deleteDoc(doc(db, "productSections", id))
    return true
  } catch (error) {
    console.error("Error deleting section from Firebase:", error)
    return false
  }
}

export const uploadProductImage = async (file: File, productName: string): Promise<string | null> => {
  if (isUsingMockFirebase) {
    // In mock mode, create a blob URL for the image
    return URL.createObjectURL(file)
  }

  try {
    const { ref, uploadBytes, getDownloadURL } = await import("firebase/storage")

    // Create a unique filename with timestamp
    const timestamp = Date.now()
    const fileName = `products/${productName.replace(/\s+/g, "_")}_${timestamp}.${file.name.split(".").pop()}`

    // Create storage reference
    const storageRef = ref(storage, fileName)

    // Upload file
    const snapshot = await uploadBytes(storageRef, file)

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref)

    return downloadURL
  } catch (error) {
    console.error("Error uploading image:", error)
    return null
  }
}

export const deleteProductImage = async (imageUrl: string): Promise<boolean> => {
  if (isUsingMockFirebase) {
    // In mock mode, revoke the blob URL
    if (imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl)
    }
    return true
  }

  try {
    const { ref, deleteObject } = await import("firebase/storage")

    // Extract the file path from the URL
    const url = new URL(imageUrl)
    const pathStart = url.pathname.indexOf("/o/") + 3
    const pathEnd = url.pathname.indexOf("?")
    const filePath = decodeURIComponent(url.pathname.substring(pathStart, pathEnd))

    // Create storage reference and delete
    const storageRef = ref(storage, filePath)
    await deleteObject(storageRef)

    return true
  } catch (error) {
    console.error("Error deleting image:", error)
    return false
  }
}
