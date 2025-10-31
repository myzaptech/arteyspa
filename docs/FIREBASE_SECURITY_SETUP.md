# 🔐 Configuración de Reglas de Seguridad - Firebase

## ⚠️ IMPORTANTE: Error de Permisos Detectado

El script de inicialización falló con el error:
```
PERMISSION_DENIED: Missing or insufficient permissions
```

Esto significa que las reglas de seguridad de Firebase Firestore están bloqueando las operaciones de escritura.

---

## 🚀 Solución Rápida (Para Desarrollo)

### Paso 1: Acceder a Firebase Console

1. Ve a: https://console.firebase.google.com/
2. Selecciona tu proyecto: **data-spa**
3. En el menú lateral, ve a **Firestore Database**
4. Haz clic en la pestaña **Reglas** (Rules)

### Paso 2: Configurar Reglas Temporales (Solo Desarrollo)

**⚠️ ADVERTENCIA: Estas reglas permiten acceso completo. Solo para desarrollo.**

Reemplaza las reglas actuales con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir todo durante desarrollo
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Paso 3: Publicar las Reglas

1. Haz clic en **Publicar** (Publish)
2. Confirma los cambios
3. Espera unos segundos para que se apliquen

### Paso 4: Ejecutar el Script Nuevamente

```bash
npm run init-firebase
```

---

## 🔒 Reglas de Producción (Recomendadas)

Una vez que hayas poblado la base de datos y estés listo para producción, usa estas reglas más seguras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Función helper para verificar admin
    function isAdmin() {
      return request.auth != null && 
             request.auth.token.admin == true;
    }
    
    // Función helper para verificar autenticación
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // ============================================
    // CONFIGURACIÓN DEL SITIO
    // ============================================
    match /siteConfig/{document} {
      // Todos pueden leer
      allow read: if true;
      // Solo admins pueden escribir
      allow write: if isAdmin();
    }
    
    // ============================================
    // SECCIONES DE PRODUCTOS
    // ============================================
    match /productSections/{section} {
      // Todos pueden leer
      allow read: if true;
      // Solo admins pueden escribir
      allow write: if isAdmin();
    }
    
    // ============================================
    // PRODUCTOS
    // ============================================
    match /products/{product} {
      // Todos pueden leer productos activos
      allow read: if true;
      // Solo admins pueden crear/actualizar/eliminar
      allow create, update, delete: if isAdmin();
    }
    
    // ============================================
    // SERVICIOS
    // ============================================
    match /services/{service} {
      // Todos pueden leer
      allow read: if true;
      // Solo admins pueden escribir
      allow write: if isAdmin();
    }
    
    // ============================================
    // PEDIDOS (Futuro)
    // ============================================
    match /orders/{order} {
      // Los usuarios pueden leer sus propios pedidos
      allow read: if isAuthenticated() && 
        (request.auth.uid == resource.data.customerId || isAdmin());
      // Cualquier usuario autenticado puede crear un pedido
      allow create: if isAuthenticated();
      // Solo admins pueden actualizar
      allow update: if isAdmin();
    }
    
    // ============================================
    // CLIENTES (Futuro)
    // ============================================
    match /customers/{customer} {
      // Solo el propietario o admin pueden leer/escribir
      allow read, write: if isAuthenticated() && 
        (request.auth.uid == customer || isAdmin());
    }
    
    // ============================================
    // BLOG (Futuro)
    // ============================================
    match /blog/{post} {
      // Todos pueden leer posts publicados
      allow read: if resource.data.published == true || isAdmin();
      // Solo admins pueden escribir
      allow write: if isAdmin();
    }
  }
}
```

---

## 🔑 Configurar Usuarios Admin

### Opción 1: Usando Firebase Authentication Custom Claims

Una vez que tengas autenticación configurada, puedes marcar usuarios como admin:

```typescript
// En Cloud Functions o Admin SDK
import * as admin from 'firebase-admin';

async function setAdminClaim(uid: string) {
  await admin.auth().setCustomUserClaims(uid, { admin: true });
}
```

### Opción 2: Reglas basadas en Email (Temporal)

```javascript
function isAdmin() {
  return request.auth != null && 
         request.auth.token.email in [
           'admin@arteyspa.com',
           'tu-email@gmail.com'
         ];
}
```

---

## 📋 Checklist de Configuración

- [ ] Acceder a Firebase Console
- [ ] Navegar a Firestore Database → Reglas
- [ ] Aplicar reglas de desarrollo (temporales)
- [ ] Publicar las reglas
- [ ] Ejecutar `npm run init-firebase`
- [ ] Verificar que los datos se crearon correctamente
- [ ] Cambiar a reglas de producción antes de deployment
- [ ] Configurar usuarios admin si es necesario

---

## 🔍 Verificar que las Reglas Funcionan

### Después de aplicar las reglas de desarrollo:

```bash
npm run init-firebase
```

Deberías ver:
```
🚀 Iniciando migración de datos a Firebase...

📝 Creando configuración general del sitio...
✅ Configuración general creada

📂 Creando secciones de productos...
  ✓ Sección: Arcángeles
  ✓ Sección: Terapéuticas
  ...
✅ 6 secciones creadas

🕯️  Creando productos...
  ✓ Producto: Vela Arcángel Miguel
  ✓ Producto: Vela Arcángel Rafael
  ...
✅ 13 productos creados

💼 Creando servicios...
  ✓ Servicio: Artesanías en Crochet
  ...
✅ 4 servicios creados

🎉 ¡Migración completada exitosamente!
```

---

## 🛡️ Seguridad en Producción

### NUNCA uses estas reglas en producción:

```javascript
// ❌ PELIGROSO - No usar en producción
match /{document=**} {
  allow read, write: if true;
}
```

### Siempre usa reglas restrictivas:

```javascript
// ✅ SEGURO - Usar en producción
match /{document=**} {
  allow read: if true;  // Solo lectura pública
  allow write: if request.auth != null && 
               request.auth.token.admin == true;
}
```

---

## 📞 Ayuda Adicional

### Recursos de Firebase:
- [Documentación de Reglas de Seguridad](https://firebase.google.com/docs/firestore/security/get-started)
- [Testing de Reglas](https://firebase.google.com/docs/firestore/security/test-rules-emulator)
- [Mejores Prácticas](https://firebase.google.com/docs/firestore/security/rules-conditions)

### Comandos Útiles:

```bash
# Inicializar base de datos
npm run init-firebase

# Ver logs del servidor de desarrollo
npm run dev

# Verificar que Firebase está conectado
# (El proyecto debería cargar sin errores)
```

---

## ⏭️ Próximos Pasos

1. ✅ Configurar reglas de Firestore
2. ✅ Ejecutar script de inicialización
3. ⬜ Verificar datos en Firebase Console
4. ⬜ Actualizar frontend para usar datos de Firebase
5. ⬜ Implementar autenticación para admin
6. ⬜ Aplicar reglas de producción

---

**Última actualización**: Octubre 2025
