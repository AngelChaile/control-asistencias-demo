# 📍 Sistema de Control de Asistencias por Código QR  
### Proyecto desarrollado para el Municipio – Versión Demo para Portafolio

Este sistema permite registrar asistencias mediante **códigos QR**, pensado para entidades con muchos empleados.  
Incluye autenticación con roles, un panel administrativo completo y control de accesos seguro mediante **Firestore Rules**.

---

## 🚀 Características principales

- 📲 **Registro de asistencia con QR** (escaneo desde celular o PC valido por 2 min (para prueba))  
- 🧾 **Validación de legajo** y token único  
- 🔐 **Roles de acceso:** admin, rrhh y empleado  
- 🗂️ **Gestión de empleados**  
- 🕒 **Listado de asistencias en tiempo real**  
- 📉 **Registro de ausencias**  
- ❌ Bloqueo de asistencias duplicadas
- ✅ Validación en tiempo real de tokens
- ⏰ Lógica automática ENTRADA/SALIDA
- 🎯 Interfaz simple, moderna y responsiva  
- ☁️ Backend serverless con **Firebase**

---

## 🧱 Tecnologías utilizadas

- **Frontend:** HTML, CSS, JavaScript, Tailwind 
- **Backend:** Firebase Authentication + Firestore  
- **Infraestructura:** Vercel (Deploy)  
- **Otros:** QR Scanner, Modules JS, Firestore Rules por roles

---

## 🏗️ Arquitectura del Sistema

### **Módulos Principales**

| Módulo | Función | Tecnología | Acceso |
|--------|---------|------------|--------|
| **🔐 Autenticación** | Login multi-rol | Firebase Auth | Todos |
| **📱 Fichaje QR** | Registro ENTRADA/SALIDA | React + QR | Público |
| **👥 Gestión Empleados** | CRUD de personal | Firestore | Admin/RRHH |
| **📊 Dashboard** | Estadísticas tiempo real | React Hooks | Admin/RRHH |
| **📈 Reportes** | Filtros y exportación | XLSX Library | Admin/RRHH |
| **⏰ Ausencias** | Justificación faltas | Firestore | Admin/RRHH |
| **🔧 Administración** | Configuración del sistema | Firebase Console | RRHH |

---

### **Flujo de Datos**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   USUARIO   │    │  EMPLEADO   │    │   ADMIN     │
│   RRHH      │    │   (QR)      │    │   ÁREA      │
└──────┬──────┘    └──────┬──────┘    └──────┬──────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌──────────────────────────────────────────────────┐
│             APLICACIÓN REACT (Frontend)          │
│  • Componentes UI                                │
│  • Lógica de negocio                             │
│  • Validaciones                                  │
│  • Estado local                                  │
└──────────────┬───────────────────────────────────┘
               │
               ▼ (API Calls / SDK)
┌──────────────────────────────────────────────────┐
│             SERVICIOS FIREBASE                   │
│  • Firebase Auth    (Autenticación)              │
│  • Firestore        (Base de datos)              │
│  • Security Rules   (Permisos)                   │
└──────────────┬───────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────┐
│             FIRESTORE DATABASE                   │
│  📁 empleados    (4,250+ registros)              │
│  📁 asistencias  (8,000+ diarios)                │
│  📁 usuarios     (Roles y permisos)              │
│  📁 ausencias    (Justificaciones)               │
│  📁 tokens       (QR temporales)                 │
└──────────────────────────────────────────────────┘
```
---

### **Tecnologías por Capa**
- **🎨 Presentación**: React 18, Tailwind CSS, React Router
- **🔧 Lógica**: Firebase Functions, Custom Hooks
- **💾 Datos**: Firestore (NoSQL), Firebase Storage
- **🔐 Seguridad**: Firebase Auth, Firestore Rules
- **🚀 Hosting**: Vercel (Edge Network)

---

### **Roles y Permisos**

| Rol | Permisos | Colecciones Accesibles |
|-----|----------|------------------------|
| **👑 RRHH** | Lectura/Escritura total | Todas las colecciones |
| **🏢 Administrador** | Lectura/Escritura en su área | empleados (filtrado), asistencias (filtrado) |
| **👤 Empleado** | Solo lectura propia | asistencias (propias) |

---
### **Optimizaciones Implementadas**
1. 🚀 Paginación inteligente: Carga progresiva de datos

2. 💾 Caché eficiente: Firestore con índices optimizados

3. 📦 Code splitting: Carga diferida de componentes

4. 🖼️ Image optimization: Compresión automática de assets

5. 🌐 CDN global: Despliegue en Vercel Edge Network

---

## 🔐 Seguridad (Firestore Rules)

El sistema implementa seguridad basada en roles, permitiendo que cada usuario solo acceda a lo que corresponde según Firestore Authentication.  
Esto evita manipulaciones externas y protege la información de los empleados.

---

## 🌐 Demo online

👉 **Versión demo:** *(https://control-asistencias-demo.vercel.app/)*

---
### **📞 Soporte y Contacto**
- **Desarrollador Principal:** Angel Chaile
- **Email:** *angelchaile90@gmail.com*
- **LinkedIn:** (https://www.linkedin.com/in/angelchaile)
- **Portfolio:** (https://angelchaile.github.io/Portafolio/)

