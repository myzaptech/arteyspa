# 📚 Documentación - Arte & Spa

Bienvenido a la documentación completa del proyecto Arte & Spa Landing Page.

---

## 📋 Índice de Documentos

### 🔥 **Firebase & Base de Datos**

1. **[MIGRATION_REPORT.md](./MIGRATION_REPORT.md)** - ⭐ **EMPEZAR AQUÍ**
   - Auditoría completa de datos estáticos vs Firebase
   - Problemas identificados y soluciones
   - Plan de acción inmediato
   
2. **[FIREBASE_SECURITY_SETUP.md](./FIREBASE_SECURITY_SETUP.md)** - 🔐 **ACCIÓN REQUERIDA**
   - Guía paso a paso para configurar Firebase
   - Resolver error de permisos
   - Reglas de seguridad

3. **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - 📊 Referencia Técnica
   - Esquema completo de Firestore
   - Estructura de cada colección
   - Tipos de datos y campos

4. **[DATABASE_DIAGRAM.md](./DATABASE_DIAGRAM.md)** - 🗺️ Visualización
   - Diagramas del esquema
   - Flujo de datos
   - Relaciones entre colecciones

---

## 🚀 Inicio Rápido

### Si es tu primera vez:

```bash
# 1. Instalar dependencias
npm install --legacy-peer-deps

# 2. Configurar Firebase (ver FIREBASE_SECURITY_SETUP.md)
# - Ve a Firebase Console
# - Configura reglas de seguridad
# - Habilita escritura temporalmente

# 3. Poblar base de datos
npm run init-firebase

# 4. Iniciar desarrollo
npm run dev

# 5. Abrir navegador
# http://localhost:3000
```

---

## ⚠️ Estado Actual del Proyecto

### 🔴 **BLOQUEADO** - Requiere Acción

El proyecto está esperando configuración de permisos en Firebase.

**Error Actual:**
```
PERMISSION_DENIED: Missing or insufficient permissions
```

**Solución:**
1. Lee: [FIREBASE_SECURITY_SETUP.md](./FIREBASE_SECURITY_SETUP.md)
2. Configura permisos en Firebase Console
3. Ejecuta: `npm run init-firebase`

---

## 📊 Resumen de la Situación

### Datos Actualmente Estáticos:

| Elemento | Estado | Documentación |
|----------|--------|---------------|
| 🕯️ Productos | ❌ Hardcodeados (2 ejemplos) | MIGRATION_REPORT.md |
| 💼 Servicios | ❌ Hardcodeados (4 servicios) | MIGRATION_REPORT.md |
| ⚙️ Configuración | ❌ Hardcodeada | MIGRATION_REPORT.md |
| 🔥 Firebase | ⚠️ Configurado pero bloqueado | FIREBASE_SECURITY_SETUP.md |

### Soluciones Implementadas:

| Solución | Archivo | Estado |
|----------|---------|--------|
| Script de migración | `scripts/init-firebase.ts` | ✅ Listo |
| Esquema de BD | `docs/DATABASE_SCHEMA.md` | ✅ Documentado |
| Configuración Firebase | `lib/firebase.ts` | ✅ Actualizado |
| Comandos NPM | `package.json` | ✅ Agregados |

---

## 🎯 Próximos Pasos

### Fase 1: Configuración (AHORA)
- [ ] Leer [FIREBASE_SECURITY_SETUP.md](./FIREBASE_SECURITY_SETUP.md)
- [ ] Configurar permisos en Firebase Console
- [ ] Ejecutar `npm run init-firebase`
- [ ] Verificar datos en Firebase

### Fase 2: Desarrollo
- [ ] Actualizar frontend para usar Firebase
- [ ] Implementar panel de administración
- [ ] Agregar autenticación

### Fase 3: Producción
- [ ] Aplicar reglas de seguridad de producción
- [ ] Configurar dominio personalizado
- [ ] Deploy a Vercel/Firebase Hosting

---

## 📁 Estructura del Proyecto

```
arte-spa-landing/
├── app/                    # Next.js App Router
│   ├── page.tsx           # ⚠️ Contiene datos estáticos
│   ├── layout.tsx
│   └── admin/             # Panel de administración (futuro)
├── components/            # Componentes React
│   └── ui/               # Componentes de shadcn/ui
├── lib/
│   ├── firebase.ts       # ✅ Configuración Firebase actualizada
│   ├── products.ts       # ⚠️ Usa datos mock actualmente
│   └── utils.ts
├── scripts/
│   └── init-firebase.ts  # ✅ Script de migración listo
├── docs/                 # 📚 Esta carpeta
│   ├── README.md         # Este archivo
│   ├── MIGRATION_REPORT.md
│   ├── FIREBASE_SECURITY_SETUP.md
│   ├── DATABASE_SCHEMA.md
│   └── DATABASE_DIAGRAM.md
└── public/
    └── images/           # Imágenes del sitio
```

---

## 🔧 Comandos Disponibles

### Desarrollo:
```bash
npm run dev              # Iniciar servidor de desarrollo
npm run build            # Compilar para producción
npm run start            # Iniciar servidor de producción
npm run lint             # Verificar código
```

### Firebase:
```bash
npm run init-firebase    # Poblar base de datos (requiere permisos)
npm run db:seed          # Alias de init-firebase
```

---

## 🐛 Problemas Comunes

### 1. Error de permisos Firebase
**Síntoma**: `PERMISSION_DENIED`  
**Solución**: Ver [FIREBASE_SECURITY_SETUP.md](./FIREBASE_SECURITY_SETUP.md)

### 2. Conflictos de dependencias
**Síntoma**: Error al instalar npm  
**Solución**: Usar `npm install --legacy-peer-deps`

### 3. Productos no se cargan
**Síntoma**: Landing page muestra productos vacíos  
**Causa**: Firebase no está poblado  
**Solución**: Ejecutar `npm run init-firebase`

---

## 📞 Soporte

### Recursos:
- **Firebase Console**: https://console.firebase.google.com/
- **Proyecto**: data-spa
- **Next.js Docs**: https://nextjs.org/docs
- **Firebase Docs**: https://firebase.google.com/docs

### Contacto del Proyecto:
- **WhatsApp**: 312 420 2504
- **Ubicación**: Carrera 12 # 17-51, Zapatoca, Santander

---

## 📈 Métricas del Proyecto

### Colecciones Firebase:
- **siteConfig**: 1 documento
- **productSections**: 6 documentos
- **products**: 13+ documentos
- **services**: 4 documentos

### Tamaño Total: ~30 KB

### Lecturas Estimadas:
- ~80,000 lecturas/mes
- Dentro del plan gratuito de Firebase

---

## 🎓 Para Aprender Más

### Next.js + Firebase:
1. [Next.js con Firebase](https://firebase.google.com/docs/web/frameworks/nextjs)
2. [Firestore Data Modeling](https://firebase.google.com/docs/firestore/data-model)
3. [Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

### React + TypeScript:
1. [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
2. [Next.js App Router](https://nextjs.org/docs/app)

---

## 📝 Notas Importantes

⚠️ **ADVERTENCIA**: Nunca uses reglas de Firebase que permitan acceso público de escritura en producción.

✅ **RECOMENDACIÓN**: Siempre usa autenticación y roles para operaciones de escritura.

🔐 **SEGURIDAD**: Las reglas temporales de desarrollo deben cambiarse antes del deployment.

---

## 🗓️ Historial de Cambios

- **2025-10-30**: Creación de documentación completa
- **2025-10-30**: Implementación de script de migración
- **2025-10-30**: Actualización de configuración Firebase
- **2025-10-30**: Identificación de datos estáticos

---

## ✨ Contribuir

Si encuentras errores o mejoras en la documentación, por favor:
1. Crea un issue en el repositorio
2. Propón cambios específicos
3. Actualiza la documentación relevante

---

**Estado**: ⏳ Esperando configuración de permisos Firebase  
**Última actualización**: Octubre 30, 2025  
**Versión**: 1.0.0
