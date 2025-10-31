#!/usr/bin/env tsx

/**
 * Script para verificar el estado actual de la base de datos Firebase
 * Muestra todos los productos y secciones que existen actualmente
 */

import { collection, getDocs } from "firebase/firestore"
import { db } from "../lib/firebase"

async function checkFirebaseData() {
  console.log("🔍 Verificando datos en Firebase...\n")

  try {
    // Verificar productos
    console.log("📦 PRODUCTOS:")
    const productsSnapshot = await getDocs(collection(db, "products"))
    console.log(`   Total de productos: ${productsSnapshot.size}`)
    
    if (productsSnapshot.size > 0) {
      console.log("\n   Lista de productos:")
      productsSnapshot.forEach((doc) => {
        const data = doc.data()
        console.log(`   - ${doc.id}: ${data.name}`)
      })
    } else {
      console.log("   ✅ No hay productos en Firebase")
    }

    // Verificar secciones
    console.log("\n📁 SECCIONES:")
    const sectionsSnapshot = await getDocs(collection(db, "productSections"))
    console.log(`   Total de secciones: ${sectionsSnapshot.size}`)
    
    if (sectionsSnapshot.size > 0) {
      console.log("\n   Lista de secciones:")
      sectionsSnapshot.forEach((doc) => {
        const data = doc.data()
        console.log(`   - ${doc.id}: ${data.name} (${data.slug})`)
      })
    } else {
      console.log("   ✅ No hay secciones en Firebase")
    }

    console.log("\n" + "=".repeat(50))
    if (productsSnapshot.size === 0 && sectionsSnapshot.size === 0) {
      console.log("✅ Firebase está completamente vacío")
      console.log("   Si la página sigue mostrando datos, intenta:")
      console.log("   1. Forzar recarga: Ctrl + Shift + R")
      console.log("   2. Limpiar caché del navegador")
      console.log("   3. Esperar 10 segundos para que se actualice automáticamente")
    } else {
      console.log("⚠️  Firebase todavía contiene datos")
      console.log("   Estos datos se están mostrando en la página principal")
    }
    console.log("=".repeat(50))
  } catch (error) {
    console.error("❌ Error al verificar Firebase:", error)
  }
}

checkFirebaseData()
