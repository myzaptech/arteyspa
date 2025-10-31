"use client"

import { useEffect, useState } from "react"
import { getProducts, getSections } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPage() {
  const [products, setProducts] = useState<any[]>([])
  const [sections, setSections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const [productsData, sectionsData] = await Promise.all([getProducts(), getSections()])
      setProducts(productsData)
      setSections(sectionsData)
      setLastUpdate(new Date())
      console.log("Productos cargados:", productsData)
      console.log("Secciones cargadas:", sectionsData)
    } catch (error) {
      console.error("Error cargando datos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const clearAllCache = () => {
    // Limpiar localStorage
    localStorage.clear()
    
    // Limpiar sessionStorage
    sessionStorage.clear()
    
    // Limpiar cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
    })
    
    alert("Caché limpiado completamente. Presiona F5 para recargar.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🔍 Panel de Diagnóstico</h1>
          <p className="text-gray-600 mb-4">
            Esta página muestra exactamente qué datos está retornando Firebase
          </p>
          
          <div className="flex gap-4 mb-6">
            <Button onClick={loadData} className="bg-blue-600 hover:bg-blue-700">
              🔄 Recargar desde Firebase
            </Button>
            <Button onClick={clearAllCache} className="bg-red-600 hover:bg-red-700">
              🗑️ Limpiar TODO el Caché
            </Button>
            <Button onClick={() => window.location.href = "/"} className="bg-green-600 hover:bg-green-700">
              🏠 Ir a Página Principal
            </Button>
          </div>

          {lastUpdate && (
            <p className="text-sm text-gray-500 mb-4">
              Última actualización: {lastUpdate.toLocaleTimeString()}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Secciones */}
          <Card className="bg-white shadow-xl">
            <CardHeader className="bg-purple-600 text-white">
              <CardTitle className="text-2xl">
                📁 Secciones en Firebase: {sections.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <p className="text-gray-500">Cargando...</p>
              ) : sections.length === 0 ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                  <p className="text-green-700 font-semibold text-lg">
                    ✅ Firebase está vacío (correcto)
                  </p>
                  <p className="text-green-600 text-sm mt-2">
                    No hay secciones en la base de datos
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="font-bold text-purple-900">{section.name}</p>
                      <p className="text-sm text-purple-600">Slug: {section.slug}</p>
                      <p className="text-xs text-gray-500">ID: {section.id}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Productos */}
          <Card className="bg-white shadow-xl">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="text-2xl">
                📦 Productos en Firebase: {products.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <p className="text-gray-500">Cargando...</p>
              ) : products.length === 0 ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                  <p className="text-green-700 font-semibold text-lg">
                    ✅ Firebase está vacío (correcto)
                  </p>
                  <p className="text-green-600 text-sm mt-2">
                    No hay productos en la base de datos
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {products.map((product, index) => (
                    <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="font-bold text-blue-900">{product.name}</p>
                      <p className="text-sm text-blue-600">{product.subtitle}</p>
                      <p className="text-xs text-gray-500">ID: {product.id}</p>
                      <p className="text-xs text-gray-500">Sección: {product.sectionId}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Información del navegador */}
        <Card className="bg-white shadow-xl mt-8">
          <CardHeader className="bg-orange-600 text-white">
            <CardTitle className="text-2xl">🌐 Estado del Navegador</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="font-semibold text-orange-900 mb-2">localStorage</p>
                <p className="text-sm text-orange-700">
                  Items: {Object.keys(localStorage).length}
                </p>
                {Object.keys(localStorage).length > 0 && (
                  <div className="mt-2 text-xs text-gray-600">
                    {Object.keys(localStorage).map((key) => (
                      <div key={key} className="truncate">• {key}</div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="font-semibold text-orange-900 mb-2">sessionStorage</p>
                <p className="text-sm text-orange-700">
                  Items: {Object.keys(sessionStorage).length}
                </p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="font-semibold text-orange-900 mb-2">Cookies</p>
                <p className="text-sm text-orange-700">
                  Items: {document.cookie.split(";").filter((c) => c.trim()).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instrucciones */}
        <Card className="bg-yellow-50 border-2 border-yellow-400 shadow-xl mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-900">💡 ¿Sigues viendo datos fantasma?</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li className="font-semibold">
                Haz clic en "Limpiar TODO el Caché" arriba
              </li>
              <li className="font-semibold">
                Presiona <kbd className="px-2 py-1 bg-gray-200 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-200 rounded">Shift</kbd> + <kbd className="px-2 py-1 bg-gray-200 rounded">R</kbd> para forzar recarga
              </li>
              <li className="font-semibold">
                Abre las DevTools (F12), ve a la pestaña "Application" → "Clear storage" → "Clear site data"
              </li>
              <li className="font-semibold">
                Si nada funciona: Cierra el navegador completamente y vuelve a abrirlo
              </li>
            </ol>
            
            <div className="mt-6 p-4 bg-white rounded-lg border border-yellow-300">
              <p className="text-sm text-gray-600">
                <strong>Nota:</strong> Esta página muestra los datos REALES de Firebase en tiempo real. 
                Si aquí ves "✅ Firebase está vacío" pero la página principal muestra productos, 
                entonces es 100% caché del navegador.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
