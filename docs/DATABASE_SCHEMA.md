# 📊 Esquema de Base de Datos - Firebase Firestore

## 🔥 Arte & Spa - Estructura de Datos

Este documento describe el esquema completo de la base de datos Firebase Firestore para el proyecto Arte & Spa.

---

## 📁 Colecciones

### 1. `siteConfig` - Configuración General del Sitio

Almacena toda la configuración general del sitio web.

**Documento ID**: `general`

```typescript
{
  id: string                    // "general"
  siteName: string              // "Arte & Spa"
  tagline: string               // Eslogan del sitio
  description: string           // Descripción breve
  
  // Contacto
  whatsapp: string              // "573124202504"
  email: string                 // Email de contacto
  
  // Ubicación
  address: {
    street: string              // "Carrera 12 # 17-51"
    city: string                // "Zapatoca"
    state: string               // "Santander"
    country: string             // "Colombia"
    fullAddress: string         // Dirección completa
  }
  
  // Horarios
  schedule: {
    weekdays: {
      morning: string           // "9:00 AM - 12:00 PM"
      afternoon: string         // "3:00 PM - 6:00 PM"
    }
    closedDay: string           // "Martes"
    note: string                // Nota adicional
  }
  
  // Redes sociales
  social: {
    facebook?: string
    instagram?: string
    youtube?: string
    tiktok?: string
  }
  
  // Políticas
  policies: {
    payments: string            // Métodos de pago
    shipping: string            // Política de envíos
    returns: string             // Política de devoluciones
    privacy: string             // Política de privacidad
  }
  
  // Sobre nosotros
  about: {
    mission: string             // Misión
    vision: string              // Visión
    values: string[]            // Array de valores
    story: string               // Historia del negocio
  }
  
  updatedAt: Date               // Última actualización
}
```

---

### 2. `productSections` - Categorías de Productos

Secciones/categorías para organizar los productos.

**Documento ID**: Custom ID (slug)

```typescript
{
  id: string                    // "arcangeles", "terapeuticas", etc.
  name: string                  // "Arcángeles"
  slug: string                  // "arcangeles"
  description: string           // Descripción de la categoría
  order: number                 // Orden de visualización (1, 2, 3...)
  active: boolean               // true/false
  createdAt: Date
}
```

**Secciones Predefinidas:**
- `arcangeles` - Velas de Arcángeles
- `terapeuticas` - Velas Terapéuticas
- `chakras` - Velas de Chakras
- `proteccion` - Velas de Protección
- `abundancia` - Velas de Abundancia y Prosperidad
- `amor` - Velas de Amor y Relaciones

---

### 3. `products` - Productos (Velas y artículos naturales)

Todos los productos disponibles en la tienda.

**Documento ID**: Auto-generado por Firestore

```typescript
{
  name: string                  // "Vela Arcángel Miguel"
  subtitle: string              // "PROTECCIÓN - Escudo divino"
  description: string           // Descripción completa del producto
  image: string                 // URL de la imagen
  category: string              // "arcangeles", "terapeuticas", etc.
  sectionId: string             // ID de la sección (ref: productSections)
  price: number                 // Precio en pesos colombianos
  stock: number                 // Cantidad disponible
  active: boolean               // true/false
  tags: string[]                // ["protección", "arcángel", "ritual"]
  
  // Opcional
  discount?: number             // Descuento en porcentaje
  featured?: boolean            // Producto destacado
  
  createdAt: Date
  updatedAt?: Date
}
```

**Índices Recomendados:**
- `sectionId` + `active`
- `category` + `active`
- `featured` + `active`

---

### 4. `services` - Servicios Ofrecidos

Servicios que ofrece Arte & Spa.

**Documento ID**: Custom ID

```typescript
{
  id: string                    // "crochet", "tattoo", "wood", "spa"
  name: string                  // "Artesanías en Crochet"
  slug: string                  // "crochet"
  shortDescription: string      // Descripción corta
  fullDescription: string       // Descripción completa
  features: string[]            // Array de características
  details: string               // Detalles adicionales
  icon: string                  // Nombre del ícono
  image: string                 // URL de la imagen
  priceRange: string            // "15000-50000"
  estimatedTime: string         // "3-7 días"
  active: boolean               // true/false
  order: number                 // Orden de visualización
  
  // Opcional
  gallery?: string[]            // Array de URLs de imágenes
  testimonials?: {
    author: string
    text: string
    rating: number
  }[]
  
  createdAt: Date
  updatedAt?: Date
}
```

**Servicios Predefinidos:**
- `crochet` - Artesanías en Crochet
- `tattoo` - Estudio de Tatuajes
- `wood` - Taller de Madera Artesanal
- `spa` - Spa y Bienestar

---

### 5. `orders` (Futuro) - Pedidos de Clientes

Para gestionar pedidos cuando se implemente el sistema de ventas.

```typescript
{
  orderNumber: string           // Número de orden único
  customerId: string            // ID del cliente
  items: {
    productId: string
    productName: string
    quantity: number
    price: number
  }[]
  total: number                 // Total del pedido
  status: string                // "pending", "confirmed", "shipped", "delivered"
  shippingAddress: {
    name: string
    phone: string
    address: string
    city: string
    state: string
  }
  paymentMethod: string         // "transfer", "cash", "digital"
  paymentStatus: string         // "pending", "paid"
  notes?: string                // Notas especiales
  
  createdAt: Date
  updatedAt: Date
}
```

---

### 6. `customers` (Futuro) - Clientes

Información de clientes registrados.

```typescript
{
  name: string
  email: string
  phone: string
  address?: {
    street: string
    city: string
    state: string
  }
  orderHistory: string[]        // Array de IDs de pedidos
  createdAt: Date
  lastOrderAt?: Date
}
```

---

### 7. `blog` (Futuro) - Blog/Artículos

Para contenido educativo sobre productos y servicios.

```typescript
{
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  category: string              // "wellness", "crafts", "tips"
  tags: string[]
  published: boolean
  featured: boolean
  views: number
  
  createdAt: Date
  publishedAt?: Date
  updatedAt?: Date
}
```

---

## 🔐 Reglas de Seguridad Recomendadas

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Configuración del sitio - Solo lectura pública
    match /siteConfig/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Secciones de productos - Solo lectura pública
    match /productSections/{section} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Productos - Solo lectura pública
    match /products/{product} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Servicios - Solo lectura pública
    match /services/{service} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Pedidos - Autenticación requerida
    match /orders/{order} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.customerId || 
         request.auth.token.admin == true);
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    // Clientes - Solo el propietario o admin
    match /customers/{customer} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == customer || 
         request.auth.token.admin == true);
    }
  }
}
```

---

## 🚀 Comandos de Inicialización

### Poblar la base de datos con datos iniciales:

```bash
npm run init-firebase
# o
npm run db:seed
```

Este comando ejecutará el script `scripts/init-firebase.ts` que creará:
- ✅ 1 documento de configuración general
- ✅ 6 secciones de productos
- ✅ 13+ productos iniciales
- ✅ 4 servicios principales

---

## 📈 Estadísticas de Datos Iniciales

| Colección | Documentos | Descripción |
|-----------|------------|-------------|
| `siteConfig` | 1 | Configuración general |
| `productSections` | 6 | Categorías de productos |
| `products` | 13+ | Velas y productos naturales |
| `services` | 4 | Servicios principales |

---

## 🔄 Flujo de Datos

```
Usuario → Frontend (Next.js)
              ↓
        lib/products.ts
              ↓
        Firebase SDK
              ↓
     Cloud Firestore
```

### Operaciones Principales:

1. **Lectura de Productos**: `getProducts()` → Obtiene todos los productos activos
2. **Filtrar por Sección**: `getProductsBySection(sectionId)` → Filtra por categoría
3. **Agregar Producto**: `addProduct(product)` → Crea nuevo producto (Admin)
4. **Actualizar Producto**: `updateProduct(id, data)` → Modifica producto (Admin)
5. **Eliminar Producto**: `deleteProduct(id)` → Elimina producto (Admin)

---

## 🎨 Ejemplos de Consultas

### Obtener productos activos de una sección:

```typescript
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const q = query(
  collection(db, 'products'),
  where('sectionId', '==', 'arcangeles'),
  where('active', '==', true)
);

const snapshot = await getDocs(q);
const products = snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

### Obtener productos destacados:

```typescript
const q = query(
  collection(db, 'products'),
  where('featured', '==', true),
  where('active', '==', true)
);
```

### Obtener servicios ordenados:

```typescript
import { orderBy } from 'firebase/firestore';

const q = query(
  collection(db, 'services'),
  where('active', '==', true),
  orderBy('order', 'asc')
);
```

---

## 🛠️ Mantenimiento

### Backup Regular:
- Usar Firebase Console para exportar datos
- Programar backups automáticos semanales

### Monitoreo:
- Revisar uso de lecturas/escrituras en Firebase Console
- Verificar índices compuestos sugeridos

### Optimización:
- Usar índices para consultas frecuentes
- Implementar caché en el frontend cuando sea posible
- Limitar resultados con `.limit()`

---

## 📞 Soporte

Para más información sobre la estructura de datos o modificaciones al esquema, contactar al equipo de desarrollo.

**Última actualización**: Octubre 2025
