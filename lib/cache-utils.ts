/**
 * Script de limpieza de localStorage
 * Se ejecuta automáticamente al cargar la aplicación para limpiar datos obsoletos
 */

export function clearOldCache() {
  if (typeof window === "undefined") return

  try {
    // Limpiar datos antiguos de localStorage
    const itemsToRemove = ["artespa_products", "artespa_sections"]

    itemsToRemove.forEach((item) => {
      if (localStorage.getItem(item)) {
        localStorage.removeItem(item)
        console.log(`✅ Caché limpiado: ${item}`)
      }
    })

    // Marcar que ya se limpió para no repetirlo
    const cacheVersion = "v2.0-firebase-only"
    const currentVersion = localStorage.getItem("artespa_cache_version")

    if (currentVersion !== cacheVersion) {
      localStorage.setItem("artespa_cache_version", cacheVersion)
      console.log("✅ Versión de caché actualizada")
    }
  } catch (error) {
    console.error("❌ Error al limpiar caché:", error)
  }
}

/**
 * Limpiar todo el caché manualmente
 */
export function clearAllCache() {
  if (typeof window === "undefined") return

  try {
    // Obtener todas las claves
    const keys = Object.keys(localStorage)

    // Filtrar solo las relacionadas con artespa
    const arteSpaKeys = keys.filter((key) => key.startsWith("artespa_"))

    // Eliminar cada una
    arteSpaKeys.forEach((key) => {
      localStorage.removeItem(key)
      console.log(`🗑️ Eliminado: ${key}`)
    })

    console.log(`✅ Total de items eliminados: ${arteSpaKeys.length}`)
    return arteSpaKeys.length
  } catch (error) {
    console.error("❌ Error al limpiar todo el caché:", error)
    return 0
  }
}

/**
 * Ver el contenido del caché actual
 */
export function viewCache() {
  if (typeof window === "undefined") return null

  try {
    const cache: Record<string, any> = {}
    const keys = Object.keys(localStorage)
    const arteSpaKeys = keys.filter((key) => key.startsWith("artespa_"))

    arteSpaKeys.forEach((key) => {
      const value = localStorage.getItem(key)
      try {
        cache[key] = JSON.parse(value || "{}")
      } catch {
        cache[key] = value
      }
    })

    console.log("📦 Caché actual:", cache)
    return cache
  } catch (error) {
    console.error("❌ Error al ver caché:", error)
    return null
  }
}
