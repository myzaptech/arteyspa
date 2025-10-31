#!/usr/bin/env tsx

/**
 * Script para limpiar completamente la base de datos Firebase
 * Elimina TODOS los productos y secciones
 */

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../lib/firebase"
import Swal from "sweetalert2"

async function clearFirebase() {
  console.log("🗑️  Limpiando Firebase completamente...\n")

  try {
    // Eliminar todos los productos
    console.log("📦 Eliminando productos...")
    const productsSnapshot = await getDocs(collection(db, "products"))
    let deletedProducts = 0
    
    for (const document of productsSnapshot.docs) {
      await deleteDoc(doc(db, "products", document.id))
      console.log(`   ✅ Producto eliminado: ${document.data().name}`)
      deletedProducts++
    }
    console.log(`   Total productos eliminados: ${deletedProducts}`)

    // Eliminar todas las secciones
    console.log("\n📁 Eliminando secciones...")
    const sectionsSnapshot = await getDocs(collection(db, "productSections"))
    let deletedSections = 0
    
    for (const document of sectionsSnapshot.docs) {
      await deleteDoc(doc(db, "productSections", document.id))
      console.log(`   ✅ Sección eliminada: ${document.data().name}`)
      deletedSections++
    }
    console.log(`   Total secciones eliminadas: ${deletedSections}`)

    console.log("\n" + "=".repeat(50))
    console.log("✅ Firebase limpiado completamente")
    console.log(`   Productos eliminados: ${deletedProducts}`)
    console.log(`   Secciones eliminadas: ${deletedSections}`)
    console.log("=".repeat(50))
    console.log("\n💡 Ahora la página principal debería mostrar 'No hay productos disponibles'")
    console.log("   Recarga la página o espera 10 segundos para ver los cambios")
  } catch (error) {
    console.error("❌ Error al limpiar Firebase:", error)
  }
}

clearFirebase()
