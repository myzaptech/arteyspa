```mermaid
erDiagram
    SITE_CONFIG ||--|| GENERAL : "1 documento"
    PRODUCT_SECTIONS ||--o{ PRODUCTS : "tiene muchos"
    PRODUCTS }o--|| PRODUCT_SECTIONS : "pertenece a"
    SERVICES ||--o{ SERVICE_ITEMS : "contiene"
    
    SITE_CONFIG {
        string id PK "general"
        string siteName "Arte & Spa"
        string tagline
        string description
        string whatsapp
        string email
        object address
        object schedule
        object social
        object policies
        object about
        date updatedAt
    }
    
    PRODUCT_SECTIONS {
        string id PK "arcangeles, terapeuticas, etc"
        string name "Arcángeles"
        string slug "arcangeles"
        string description
        number order "1, 2, 3..."
        boolean active
        date createdAt
    }
    
    PRODUCTS {
        string id PK "auto-generated"
        string name "Vela Arcángel Miguel"
        string subtitle "PROTECCIÓN"
        string description
        string image "URL"
        string category
        string sectionId FK
        number price "25000"
        number stock "15"
        boolean active
        array tags
        number discount
        boolean featured
        date createdAt
        date updatedAt
    }
    
    SERVICES {
        string id PK "crochet, tattoo, wood, spa"
        string name "Artesanías en Crochet"
        string slug "crochet"
        string shortDescription
        string fullDescription
        array features
        string details
        string icon
        string image
        string priceRange "15000-50000"
        string estimatedTime "3-7 días"
        boolean active
        number order
        array gallery
        array testimonials
        date createdAt
        date updatedAt
    }
    
    ORDERS {
        string id PK "auto-generated"
        string orderNumber "ORD-001"
        string customerId FK
        array items
        number total
        string status "pending, confirmed, shipped"
        object shippingAddress
        string paymentMethod
        string paymentStatus
        string notes
        date createdAt
        date updatedAt
    }
    
    CUSTOMERS {
        string id PK "auto-generated"
        string name
        string email
        string phone
        object address
        array orderHistory
        date createdAt
        date lastOrderAt
    }
    
    BLOG {
        string id PK "auto-generated"
        string title
        string slug
        string excerpt
        string content
        string coverImage
        string author
        string category
        array tags
        boolean published
        boolean featured
        number views
        date createdAt
        date publishedAt
        date updatedAt
    }
    
    ORDERS }o--|| CUSTOMERS : "realizado por"
    CUSTOMERS ||--o{ ORDERS : "tiene muchos"
```

# 🗺️ Mapa Visual del Esquema de Base de Datos

## 📊 Estructura de Colecciones Firebase Firestore

```
📦 Firebase Firestore (data-spa)
│
├── 📁 siteConfig (1 documento)
│   └── 📄 general
│       ├── Información del sitio
│       ├── Datos de contacto
│       ├── Ubicación y horarios
│       ├── Redes sociales
│       ├── Políticas
│       └── Sobre nosotros
│
├── 📁 productSections (6+ documentos)
│   ├── 📄 arcangeles
│   ├── 📄 terapeuticas
│   ├── 📄 chakras
│   ├── 📄 proteccion
│   ├── 📄 abundancia
│   └── 📄 amor
│
├── 📁 products (13+ documentos)
│   ├── 📄 [auto-id-1] → Vela Arcángel Miguel
│   ├── 📄 [auto-id-2] → Vela Arcángel Rafael
│   ├── 📄 [auto-id-3] → Vela Terapéutica Relajación
│   ├── 📄 [auto-id-4] → Vela Chakra Raíz
│   └── 📄 ...
│
├── 📁 services (4 documentos)
│   ├── 📄 crochet → Artesanías en Crochet
│   ├── 📄 tattoo → Estudio de Tatuajes
│   ├── 📄 wood → Taller de Madera
│   └── 📄 spa → Spa y Bienestar
│
├── 📁 orders (futuro)
│   └── 📄 [auto-id] → Pedidos de clientes
│
├── 📁 customers (futuro)
│   └── 📄 [user-id] → Información de clientes
│
└── 📁 blog (futuro)
    └── 📄 [auto-id] → Artículos del blog
```

## 🔗 Relaciones Entre Colecciones

```
┌─────────────────┐
│  SITE_CONFIG    │ (Configuración General)
└─────────────────┘
        │
        │ No tiene relaciones
        ▼


┌──────────────────┐         1:N          ┌─────────────┐
│ PRODUCT_SECTIONS │◄────────────────────►│  PRODUCTS   │
└──────────────────┘                      └─────────────┘
   (Categorías)                            (Velas y productos)
        │
        │ field: sectionId
        │


┌─────────────────┐
│    SERVICES     │ (Sin relaciones directas)
└─────────────────┘
  (Crochet, Tattoo, Wood, Spa)


┌─────────────────┐         1:N          ┌─────────────┐
│   CUSTOMERS     │◄────────────────────►│   ORDERS    │
└─────────────────┘                      └─────────────┘
   (Clientes)                             (Pedidos)
        │
        │ field: customerId
        │
        └───► orderHistory: string[]
```

## 📈 Flujo de Datos en la Aplicación

```
┌─────────────────────────────────────────────────────────────┐
│                      NAVEGADOR DEL USUARIO                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Request
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     NEXT.JS FRONTEND                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  app/page.tsx (Landing Page)                         │   │
│  │  - Hero Section                                      │   │
│  │  - Servicios                                         │   │
│  │  - Productos (Tienda Natural)                       │   │
│  │  - Contacto                                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│                              │ imports                       │
│                              ▼                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  lib/products.ts                                     │   │
│  │  - getProducts()                                     │   │
│  │  - getProductsBySection()                            │   │
│  │  - getSections()                                     │   │
│  │  - addProduct() [Admin]                              │   │
│  │  - updateProduct() [Admin]                           │   │
│  │  - deleteProduct() [Admin]                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│                              │ Firebase SDK                  │
│                              ▼                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  lib/firebase.ts                                     │   │
│  │  - db (Firestore instance)                           │   │
│  │  - storage (Storage instance)                        │   │
│  │  - auth (Auth instance)                              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Firebase API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    FIREBASE CLOUD                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Cloud Firestore (Database)                          │   │
│  │  - siteConfig/                                       │   │
│  │  - productSections/                                  │   │
│  │  - products/                                         │   │
│  │  - services/                                         │   │
│  │  - orders/ (futuro)                                  │   │
│  │  - customers/ (futuro)                               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Cloud Storage (Imágenes)                            │   │
│  │  - products/                                         │   │
│  │  - services/                                         │   │
│  │  - blog/                                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Authentication (Usuarios)                           │   │
│  │  - Admin users                                       │   │
│  │  - Customers                                         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Operaciones CRUD

### Productos (Products)

```
┌─────────────┐     READ      ┌─────────────────┐
│  Frontend   │◄──────────────│  getProducts()  │
│  (Público)  │               └─────────────────┘
└─────────────┘                        │
                                       │
                                       ▼
                              ┌─────────────────┐
                              │    Firestore    │
                              │   products/     │
                              └─────────────────┘
                                       ▲
                                       │
┌─────────────┐  CREATE/UPDATE/DELETE  │
│  Admin      │───────────────────────►│
│  Panel      │                        │
└─────────────┘                        │
     │                                 │
     ├─ addProduct()                   │
     ├─ updateProduct()                │
     └─ deleteProduct()                │
```

### Configuración del Sitio

```
┌─────────────┐     READ      ┌──────────────────┐
│  Frontend   │◄──────────────│  siteConfig/     │
│             │               │  general         │
└─────────────┘               └──────────────────┘
                                       ▲
                                       │
┌─────────────┐     UPDATE             │
│  Admin      │───────────────────────►│
│  Panel      │                        │
└─────────────┘                        │
```

## 🎯 Índices Recomendados

Para optimizar las consultas, crea estos índices compuestos:

```
products
  ├─ sectionId (ASC) + active (ASC)
  ├─ category (ASC) + active (ASC)
  ├─ featured (ASC) + active (ASC) + createdAt (DESC)
  └─ active (ASC) + createdAt (DESC)

services
  └─ active (ASC) + order (ASC)

orders
  ├─ customerId (ASC) + createdAt (DESC)
  ├─ status (ASC) + createdAt (DESC)
  └─ paymentStatus (ASC) + createdAt (DESC)

blog
  └─ published (ASC) + featured (ASC) + publishedAt (DESC)
```

## 📦 Tamaño Estimado de Datos

| Colección | Documentos | Tamaño Aprox. | Lecturas/mes |
|-----------|------------|---------------|--------------|
| siteConfig | 1 | ~5 KB | ~10,000 |
| productSections | 6 | ~2 KB | ~5,000 |
| products | 50-100 | ~50 KB | ~50,000 |
| services | 4 | ~8 KB | ~20,000 |
| orders | Variable | Variable | Variable |
| customers | Variable | Variable | Variable |

**Total estimado**: ~65 KB para datos iniciales

## 🔐 Niveles de Acceso

```
┌─────────────────────────────────────────────────────┐
│                  NIVEL DE ACCESO                    │
├─────────────────────────────────────────────────────┤
│  Público (No autenticado)                           │
│  ✓ Leer: siteConfig, productSections, products,    │
│    services, blog (publicados)                      │
│  ✗ Escribir: Nada                                   │
├─────────────────────────────────────────────────────┤
│  Usuario Autenticado                                │
│  ✓ Leer: Todo lo público + sus propios orders       │
│  ✓ Escribir: Crear orders, actualizar su perfil    │
├─────────────────────────────────────────────────────┤
│  Administrador                                       │
│  ✓ Leer: TODO                                       │
│  ✓ Escribir: TODO                                   │
└─────────────────────────────────────────────────────┘
```

---

**Última actualización**: Octubre 2025
