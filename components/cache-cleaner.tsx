"use client"

import { useEffect } from "react"
import { clearOldCache } from "@/lib/cache-utils"

export function CacheCleaner() {
  useEffect(() => {
    // Limpiar caché viejo al cargar la aplicación
    clearOldCache()
  }, [])

  return null // No renderiza nada
}
