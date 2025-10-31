"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Swal from "sweetalert2"
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
)

const Trash2Icon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

const LogOutIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7.862a2 2 0 01-1.995-1.858L5 7m12 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
)

const PackageIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
)

const FolderPlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
    />
  </svg>
)

const SaveIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3-3-3m3-3v12"
    />
  </svg>
)

const UploadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

import {
  getProducts,
  getSections,
  addProduct,
  updateProduct,
  deleteProduct,
  addSection,
  deleteSection,
  uploadProductImage,
  deleteProductImage,
  type Product,
  type ProductSection,
} from "@/lib/products"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("products")
  const [products, setProducts] = useState<Product[]>([])
  const [sections, setSections] = useState<ProductSection[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newSection, setNewSection] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const adminAuth = localStorage.getItem("artespa_admin")
    if (!adminAuth) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      loadData()
    }
  }, [router])

  const loadData = async () => {
    setLoading(true)
    try {
      const [productsData, sectionsData] = await Promise.all([getProducts(), getSections()])
      setProducts(productsData)
      setSections(sectionsData)
    } catch (error) {
      console.error("Error loading data:", error)
      await Swal.fire({
        title: "Error",
        text: "Error al cargar los datos. Por favor, recarga la página.",
        icon: "error",
        confirmButtonColor: "#406577",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("artespa_admin")
    router.push("/admin/login")
  }

  const handleSaveProduct = async (productData: Omit<Product, "id">) => {
    try {
      if (editingProduct && editingProduct.id) {
        // Update existing product
        const success = await updateProduct(editingProduct.id, productData)
        if (success) {
          setProducts(products.map((p) => (p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p)))
          await Swal.fire({
            title: "¡Actualizado!",
            text: "El producto ha sido actualizado exitosamente",
            icon: "success",
            confirmButtonColor: "#406577",
            timer: 2000,
          })
        } else {
          await Swal.fire({
            title: "Error",
            text: "No se pudo actualizar el producto",
            icon: "error",
            confirmButtonColor: "#406577",
          })
        }
      } else {
        // Add new product
        const newProductId = await addProduct(productData)
        if (newProductId) {
          const newProduct = { ...productData, id: newProductId }
          setProducts([...products, newProduct])
          await Swal.fire({
            title: "¡Agregado!",
            text: "El producto ha sido agregado exitosamente",
            icon: "success",
            confirmButtonColor: "#406577",
            timer: 2000,
          })
        } else {
          await Swal.fire({
            title: "Error",
            text: "No se pudo agregar el producto",
            icon: "error",
            confirmButtonColor: "#406577",
          })
        }
      }
      setEditingProduct(null)
    } catch (error) {
      console.error("Error saving product:", error)
      await Swal.fire({
        title: "Error",
        text: "Ocurrió un error al guardar el producto",
        icon: "error",
        confirmButtonColor: "#406577",
      })
    }
  }

  const handleDeleteProduct = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#406577",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    })

    if (result.isConfirmed) {
      try {
        const success = await deleteProduct(id)
        if (success) {
          setProducts(products.filter((p) => p.id !== id))
          await Swal.fire({
            title: "¡Eliminado!",
            text: "El producto ha sido eliminado exitosamente",
            icon: "success",
            confirmButtonColor: "#406577",
            timer: 2000,
          })
        } else {
          await Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el producto",
            icon: "error",
            confirmButtonColor: "#406577",
          })
        }
      } catch (error) {
        console.error("Error deleting product:", error)
        await Swal.fire({
          title: "Error",
          text: "Ocurrió un error al eliminar el producto",
          icon: "error",
          confirmButtonColor: "#406577",
        })
      }
    }
  }

  const handleAddSection = async () => {
    if (newSection.trim()) {
      try {
        const newSectionData: Omit<ProductSection, "id"> = {
          name: newSection.trim(),
          slug: newSection.trim().toLowerCase().replace(/\s+/g, "-"),
          createdAt: new Date(),
        }

        const newSectionId = await addSection(newSectionData)
        if (newSectionId) {
          const newSectionObj = { ...newSectionData, id: newSectionId }
          setSections([...sections, newSectionObj])
          setNewSection("")
          await Swal.fire({
            title: "¡Creada!",
            text: "La sección ha sido agregada exitosamente",
            icon: "success",
            confirmButtonColor: "#406577",
            timer: 2000,
          })
        } else {
          await Swal.fire({
            title: "Error",
            text: "No se pudo agregar la sección",
            icon: "error",
            confirmButtonColor: "#406577",
          })
        }
      } catch (error) {
        console.error("Error adding section:", error)
        await Swal.fire({
          title: "Error",
          text: "Ocurrió un error al agregar la sección",
          icon: "error",
          confirmButtonColor: "#406577",
        })
      }
    }
  }

  const handleDeleteSection = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto podría afectar los productos asociados a esta sección",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#406577",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    })

    if (result.isConfirmed) {
      try {
        const success = await deleteSection(id)
        if (success) {
          setSections(sections.filter((s) => s.id !== id))
          await Swal.fire({
            title: "¡Eliminada!",
            text: "La sección ha sido eliminada exitosamente de Firebase",
            icon: "success",
            confirmButtonColor: "#406577",
            timer: 2000,
          })
        } else {
          await Swal.fire({
            title: "Error",
            text: "No se pudo eliminar la sección de Firebase",
            icon: "error",
            confirmButtonColor: "#406577",
          })
        }
      } catch (error) {
        console.error("Error deleting section:", error)
        await Swal.fire({
          title: "Error",
          text: "Ocurrió un error al eliminar la sección",
          icon: "error",
          confirmButtonColor: "#406577",
        })
      }
    }
  }

  if (!isAuthenticated) {
    return <div>Cargando...</div>
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, 
          rgba(64, 101, 119, 0.95) 0%, 
          rgba(132, 174, 188, 0.9) 50%, 
          rgba(199, 209, 216, 0.85) 100%)`,
        }}
      >
        <div className="text-[#406577] text-xl">Cargando datos...</div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, 
        rgba(64, 101, 119, 0.95) 0%, 
        rgba(132, 174, 188, 0.9) 50%, 
        rgba(199, 209, 216, 0.85) 100%)`,
      }}
    >
      {/* Header */}
      <div
        className="border-b"
        style={{
          background: `linear-gradient(135deg, 
          rgba(199, 209, 216, 0.15) 0%, 
          rgba(132, 174, 188, 0.1) 100%)`,
          backdropFilter: "blur(12px)",
          borderColor: "rgba(199, 209, 216, 0.3)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#406577]">Panel de Administración - Arte y Spa</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-[#C7D1D8]/40 text-[#406577] hover:bg-[#C7D1D8]/20 bg-transparent"
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setActiveTab("products")}
            variant={activeTab === "products" ? "default" : "outline"}
            className={
              activeTab === "products"
                ? "bg-gradient-to-r from-[#84AEBC] to-[#406577] text-white"
                : "border-[#C7D1D8]/40 text-[#406577] hover:bg-[#C7D1D8]/20"
            }
          >
            <PackageIcon className="mr-2 h-4 w-4" />
            Productos ({products.length})
          </Button>
          <Button
            onClick={() => setActiveTab("sections")}
            variant={activeTab === "sections" ? "default" : "outline"}
            className={
              activeTab === "sections"
                ? "bg-gradient-to-r from-[#84AEBC] to-[#406577] text-white"
                : "border-[#C7D1D8]/40 text-[#406577] hover:bg-[#C7D1D8]/20"
            }
          >
            <FolderPlusIcon className="mr-2 h-4 w-4" />
            Secciones ({sections.length})
          </Button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#406577]">Gestión de Productos</h2>
              <Button
                onClick={() => setEditingProduct({} as Product)}
                className="bg-gradient-to-r from-[#84AEBC] to-[#406577] text-white"
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Nuevo Producto
              </Button>
            </div>

            {/* Product Form */}
            {editingProduct && (
              <ProductForm
                product={editingProduct}
                sections={sections}
                onSave={handleSaveProduct}
                onCancel={() => setEditingProduct(null)}
              />
            )}

            {/* Products List */}
            {products.length === 0 ? (
              <Card
                style={{
                  background: `linear-gradient(135deg, 
                  rgba(199, 209, 216, 0.15) 0%, 
                  rgba(132, 174, 188, 0.1) 100%)`,
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(199, 209, 216, 0.3)",
                }}
              >
                <CardContent className="text-center py-8">
                  <p className="text-[#406577] text-lg">No hay productos registrados</p>
                  <p className="text-[#84AEBC] text-sm">Agrega tu primer producto usando el botón "Nuevo Producto"</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    style={{
                      background: `linear-gradient(135deg, 
                      rgba(199, 209, 216, 0.15) 0%, 
                      rgba(132, 174, 188, 0.1) 100%)`,
                      backdropFilter: "blur(12px)",
                      borderColor: "rgba(199, 209, 216, 0.3)",
                    }}
                  >
                    <CardHeader>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded"
                      />
                      <CardTitle className="text-[#406577]">{product.name}</CardTitle>
                      <CardDescription className="text-[#84AEBC]">
                        {sections.find((s) => s.id === product.sectionId)?.name || "Sin sección"} - {product.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#406577] text-sm mb-4 line-clamp-3">{product.description}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => setEditingProduct(product)}
                          className="bg-[#84AEBC] hover:bg-[#406577] text-white"
                        >
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => product.id && handleDeleteProduct(product.id)}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sections Tab */}
        {activeTab === "sections" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#406577]">Gestión de Secciones</h2>

            {/* Add New Section */}
            <Card
              style={{
                background: `linear-gradient(135deg, 
                rgba(199, 209, 216, 0.15) 0%, 
                rgba(132, 174, 188, 0.1) 100%)`,
                backdropFilter: "blur(12px)",
                borderColor: "rgba(199, 209, 216, 0.3)",
              }}
            >
              <CardHeader>
                <CardTitle className="text-[#406577]">Agregar Nueva Sección</CardTitle>
                <CardDescription className="text-[#84AEBC]">
                  Las secciones te permiten organizar tus productos en categorías personalizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    placeholder="Nombre de la sección (ej: Vasos, Ropa)"
                    className="bg-white/20 border-[#C7D1D8]/40 text-[#406577]"
                    onKeyPress={(e) => e.key === "Enter" && handleAddSection()}
                  />
                  <Button
                    onClick={handleAddSection}
                    className="bg-gradient-to-r from-[#84AEBC] to-[#406577] text-white"
                    disabled={!newSection.trim()}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sections List */}
            {sections.length === 0 ? (
              <Card
                style={{
                  background: `linear-gradient(135deg, 
                  rgba(199, 209, 216, 0.15) 0%, 
                  rgba(132, 174, 188, 0.1) 100%)`,
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(199, 209, 216, 0.3)",
                }}
              >
                <CardContent className="text-center py-8">
                  <p className="text-[#406577] text-lg">No hay secciones registradas</p>
                  <p className="text-[#84AEBC] text-sm">Crea tu primera sección para organizar tus productos</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sections.map((section) => (
                  <Card
                    key={section.id}
                    style={{
                      background: `linear-gradient(135deg, 
                      rgba(199, 209, 216, 0.15) 0%, 
                      rgba(132, 174, 188, 0.1) 100%)`,
                      backdropFilter: "blur(12px)",
                      borderColor: "rgba(199, 209, 216, 0.3)",
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="text-[#406577]">{section.name}</CardTitle>
                      <CardDescription className="text-[#84AEBC]">
                        {products.filter((p) => p.sectionId === section.id).length} productos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-[#84AEBC] text-sm">Slug: {section.slug}</span>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => section.id && handleDeleteSection(section.id)}
                        >
                          <Trash2Icon className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ProductForm({
  product,
  sections,
  onSave,
  onCancel,
}: {
  product: Product
  sections: ProductSection[]
  onSave: (data: Omit<Product, "id">) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: product.name || "",
    subtitle: product.subtitle || "",
    description: product.description || "",
    image: product.image || "",
    category: product.category || "",
    sectionId: product.sectionId || "",
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(product.image || "")
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setImagePreview("")
    setFormData({ ...formData, image: "" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.description || !formData.sectionId) {
      await Swal.fire({
        title: "Campos incompletos",
        text: "Por favor completa todos los campos requeridos",
        icon: "warning",
        confirmButtonColor: "#406577",
      })
      return
    }

    setUploading(true)
    let imageUrl = formData.image

    try {
      if (selectedFile) {
        const uploadedUrl = await uploadProductImage(selectedFile, formData.name)
        if (uploadedUrl) {
          imageUrl = uploadedUrl

          // Delete old image if updating existing product
          if (product.id && product.image && product.image !== imageUrl) {
            await deleteProductImage(product.image)
          }
        } else {
          await Swal.fire({
            title: "Error",
            text: "No se pudo subir la imagen",
            icon: "error",
            confirmButtonColor: "#406577",
          })
          setUploading(false)
          return
        }
      }

      onSave({ ...formData, image: imageUrl })
    } catch (error) {
      console.error("Error saving product:", error)
      await Swal.fire({
        title: "Error",
        text: "Ocurrió un error al guardar el producto",
        icon: "error",
        confirmButtonColor: "#406577",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card
      style={{
        background: `linear-gradient(135deg, 
        rgba(199, 209, 216, 0.15) 0%, 
        rgba(132, 174, 188, 0.1) 100%)`,
        backdropFilter: "blur(12px)",
        borderColor: "rgba(199, 209, 216, 0.3)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-[#406577]">{product.id ? "Editar Producto" : "Nuevo Producto"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[#406577]">Nombre del Producto *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/20 border-[#C7D1D8]/40 text-[#406577]"
                required
              />
            </div>
            <div>
              <Label className="text-[#406577]">Subtítulo</Label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="bg-white/20 border-[#C7D1D8]/40 text-[#406577]"
                placeholder="ej: ABUNDANCIA - Fluye lo justo"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[#406577]">Categoría</Label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-white/20 border-[#C7D1D8]/40 text-[#406577]"
                placeholder="ej: arcangeles, terapeuticas"
              />
            </div>
            <div>
              <Label className="text-[#406577]">Sección *</Label>
              <select
                value={formData.sectionId}
                onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}
                className="w-full p-2 rounded bg-white/20 border border-[#C7D1D8]/40 text-[#406577]"
                required
              >
                <option value="">Seleccionar sección</option>
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label className="text-[#406577]">Imagen del Producto</Label>
            <div className="space-y-3">
              {/* File input */}
              <div className="flex items-center gap-2">
                <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="image-upload" />
                <Button
                  type="button"
                  onClick={() => document.getElementById("image-upload")?.click()}
                  className="bg-[#84AEBC] hover:bg-[#406577] text-white"
                  disabled={uploading}
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  {selectedFile ? "Cambiar Imagen" : "Seleccionar Imagen"}
                </Button>
                {selectedFile && <span className="text-[#406577] text-sm">{selectedFile.name}</span>}
              </div>

              {/* Image preview */}
              {imagePreview && (
                <div className="relative inline-block">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded border"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={handleRemoveImage}
                  >
                    <XIcon className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label className="text-[#406577]">Descripción *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-white/20 border-[#C7D1D8]/40 text-[#406577]"
              rows={4}
              required
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#84AEBC] to-[#406577] text-white"
              disabled={uploading}
            >
              <SaveIcon className="mr-2 h-4 w-4" />
              {uploading ? "Guardando..." : "Guardar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-[#C7D1D8]/40 text-[#406577] bg-transparent"
              disabled={uploading}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
