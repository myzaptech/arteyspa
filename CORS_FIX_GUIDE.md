# Guía para configurar CORS en Firebase Storage para arteyspa.com

## 🔴 PROBLEMA
```
Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/...' 
from origin 'https://arteyspa.com' has been blocked by CORS policy
```

## ✅ SOLUCIONES

### Solución 1: Firebase Console (MÁS FÁCIL)

1. Ve a https://console.firebase.google.com/
2. Selecciona proyecto **data-spa**
3. Ve a **Storage** → **Rules**
4. Copia y pega estas reglas:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{imageId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

5. Haz clic en **Publicar**

---

### Solución 2: Usando Google Cloud SDK

1. Instala Google Cloud SDK si no lo tienes:
   - Windows: https://cloud.google.com/sdk/docs/install
   - Mac/Linux: `curl https://sdk.cloud.google.com | bash`

2. Inicia sesión:
   ```bash
   gcloud auth login
   ```

3. Aplica la configuración CORS:
   ```bash
   gsutil cors set cors.json gs://data-spa.firebasestorage.app
   ```

---

### Solución 3: Cambiar dominio de Firebase Storage

Si las opciones anteriores no funcionan, puedes cambiar a usar URLs públicas:

1. Ve a Firebase Console → Storage
2. Sube las imágenes manualmente
3. Haz clic derecho → "Obtener URL de descarga"
4. Usa esas URLs en lugar de subir desde el dashboard

---

## 🔐 IMPORTANTE: Seguridad

La configuración actual permite que CUALQUIERA suba imágenes.

**Para producción, cambia las reglas a:**

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{imageId} {
      allow read: if true;
      // Solo usuarios autenticados pueden escribir
      allow write: if request.auth != null;
    }
  }
}
```

Y luego implementa autenticación en tu dashboard de admin.

---

## 🧪 Verificar que funcionó

Después de aplicar las reglas:

1. Ve al dashboard: https://arteyspa.com/admin/dashboard
2. Intenta subir una imagen
3. No deberías ver más errores de CORS
4. La imagen se debería subir correctamente

---

## 📝 Notas adicionales

- El archivo `cors.json` ya está en la raíz del proyecto
- Las reglas de `storage.rules` también están listas
- Solo necesitas aplicarlas en Firebase Console
