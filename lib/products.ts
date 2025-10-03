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

// Mock data storage for when Firebase is not available
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Vela Arcángel Miguel",
    subtitle: "PROTECCIÓN - Escudo divino",
    description:
      "Vela especial dedicada al Arcángel Miguel, protector y guerrero de la luz. Perfecta para rituales de protección y limpieza energética.",
    image: "/images/yellow-candle.png",
    category: "arcangeles",
    sectionId: "arcangeles",
  },
  {
    id: "2",
    name: "Vela Terapéutica Relajación",
    subtitle: "CALMA - Paz interior",
    description:
      "Vela aromática con esencias naturales diseñada para promover la relajación y el bienestar mental. Ideal para momentos de meditación.",
    image: "/images/orange-candle.png",
    category: "terapeuticas",
    sectionId: "terapeuticas",
  },
]

const mockSections: ProductSection[] = [
  {
    id: "arcangeles",
    name: "Arcángeles",
    slug: "arcangeles",
    description: "Velas dedicadas a los arcángeles",
    createdAt: new Date(),
  },
  {
    id: "terapeuticas",
    name: "Terapéuticas",
    slug: "terapeuticas",
    description: "Velas con propiedades terapéuticas",
    createdAt: new Date(),
  },
]

// Helper functions for localStorage
const getStoredProducts = (): Product[] => {
  if (typeof window === "undefined") return mockProducts
  const stored = localStorage.getItem("artespa_products")
  return stored ? JSON.parse(stored) : mockProducts
}

const getStoredSections = (): ProductSection[] => {
  if (typeof window === "undefined") return mockSections
  const stored = localStorage.getItem("artespa_sections")
  return stored ? JSON.parse(stored) : mockSections
}

const storeProducts = (products: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("artespa_products", JSON.stringify(products))
  }
}

const storeSections = (sections: ProductSection[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("artespa_sections", JSON.stringify(sections))
  }
}

export const getProducts = async (): Promise<Product[]> => {
  if (isUsingMockFirebase) {
    // Use localStorage for persistence in mock mode
    return getStoredProducts()
  }

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
    console.error("Error fetching products:", error)
    return getStoredProducts()
  }
}

export const getProductsBySection = async (sectionId: string): Promise<Product[]> => {
  if (isUsingMockFirebase) {
    const products = getStoredProducts()
    return products.filter((p) => p.sectionId === sectionId)
  }

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
    console.error("Error fetching products by section:", error)
    const products = getStoredProducts()
    return products.filter((p) => p.sectionId === sectionId)
  }
}

export const addProduct = async (product: Omit<Product, "id">): Promise<string | null> => {
  if (isUsingMockFirebase) {
    const products = getStoredProducts()
    const newId = Date.now().toString()
    const newProduct = { ...product, id: newId }
    products.push(newProduct)
    storeProducts(products)
    return newId
  }

  try {
    const { collection, addDoc } = await import("firebase/firestore")
    const docRef = await addDoc(collection(db, "products"), product)
    return docRef.id
  } catch (error) {
    console.error("Error adding product:", error)
    return null
  }
}

export const updateProduct = async (id: string, product: Partial<Product>): Promise<boolean> => {
  if (isUsingMockFirebase) {
    const products = getStoredProducts()
    const index = products.findIndex((p) => p.id === id)
    if (index !== -1) {
      products[index] = { ...products[index], ...product }
      storeProducts(products)
      return true
    }
    return false
  }

  try {
    const { doc, updateDoc } = await import("firebase/firestore")
    await updateDoc(doc(db, "products", id), product)
    return true
  } catch (error) {
    console.error("Error updating product:", error)
    return false
  }
}

export const deleteProduct = async (id: string): Promise<boolean> => {
  if (isUsingMockFirebase) {
    const products = getStoredProducts()
    const filtered = products.filter((p) => p.id !== id)
    storeProducts(filtered)
    return true
  }

  try {
    const { doc, deleteDoc } = await import("firebase/firestore")
    await deleteDoc(doc(db, "products", id))
    return true
  } catch (error) {
    console.error("Error deleting product:", error)
    return false
  }
}

export const getSections = async (): Promise<ProductSection[]> => {
  if (isUsingMockFirebase) {
    return getStoredSections()
  }

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
    console.error("Error fetching sections:", error)
    return getStoredSections()
  }
}

export const addSection = async (section: Omit<ProductSection, "id">): Promise<string | null> => {
  if (isUsingMockFirebase) {
    const sections = getStoredSections()
    const newId = Date.now().toString()
    const newSection = { ...section, id: newId }
    sections.push(newSection)
    storeSections(sections)
    return newId
  }

  try {
    const { collection, addDoc } = await import("firebase/firestore")
    const docRef = await addDoc(collection(db, "productSections"), section)
    return docRef.id
  } catch (error) {
    console.error("Error adding section:", error)
    return null
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
