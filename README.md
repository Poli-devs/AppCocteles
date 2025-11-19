# AppCocteles – Aplicación Fullstack de Gestión de Cócteles

Prueba técnica desarrollada para la vacante de **Desarrollador de Software**, siguiendo arquitectura cliente–servidor con **Node.js**, **Express**, **PostgreSQL** y **Next.js 16** (Frontend).

Este proyecto incluye un backend con API REST y un frontend moderno en Next.js con TailwindCSS.  
Se aplica también un flujo profesional de Git con ramas `main` y `develop`.

---

## Objetivo del Proyecto

Construir una aplicación completa para manejar cócteles, incluyendo:

### **Backend (Node.js 18 + Express + PostgreSQL)**  
- Endpoint para listar cócteles  
- Endpoint para ver detalle  
- Endpoint para crear un cóctel  
- Endpoint para editar  
- Endpoint para eliminar (soft delete)  
- Manejo de imágenes con carpeta `/uploads`  
- Arquitectura limpia (`controllers`, `services`, `models`, `routes`)  

### **Frontend (Next.js 16 + TailwindCSS)**  
- Pantalla para listar cócteles  
- Buscador  
- Vista de detalle  
- Formulario para agregar cócteles  
- Formulario para editar  
- Favoritos usando `localStorage`  
- Consumo de la API del backend  
- Renderizado dinámico con rutas tipo `/cocktails/[id]`  

---

## Estructura del Proyecto

```
AppCocteles/
│
├── server/                          # Backend (Node.js + Express + PostgreSQL)
│   ├── src/
│   │   ├── models/                  # Modelos de datos (Sequelize)
│   │   ├── middlewares/             # Middleware de subida de imágenes
│   │   ├── controllers/             # Controladores de la API
│   │   ├── routes/                  # Rutas de la API REST
│   │   ├── database/                # Configuración de base de datos
│   │   ├── app.js                   # Configuración de Express
│   │   └── index.js                 # Punto de entrada del servidor
│   ├── uploads/                     # Carpeta de imágenes subidas
│   ├── package.json
│   └── .env                         # Variables de entorno
│
└── client/                          # Frontend (Next.js 15 + TailwindCSS)
    ├── app/
    │   ├── layout.tsx               # Layout principal con navegación
    │   ├── page.tsx                 # Página principal (catálogo)
    │   ├── globals.css              # Estilos globales
    │   ├── api/                     # Funciones de API centralizadas
    │   │   ├── index.js             # Configuración de URL base
    │   │   ├── cocktails.js         # API de cócteles (CRUD)
    │   │   └── favorites.js         # API de favoritos (localStorage)
    │   ├── cocktails/
    │   │   └── [id]/
    │   │       └── page.tsx         # Detalle y edición de cóctel
    │   ├── favoritos/
    │   │   └── page.tsx             # Lista de favoritos
    │   └── agregar/
    │       └── page.tsx             # Formulario de creación
    ├── components/
    │   ├── Navbar.jsx               # Barra de navegación
    │   ├── CocktailCard.tsx         # Tarjeta de cóctel
    │   └── CocktailForm.tsx         # Formulario reutilizable
    ├── lib/
    │   └── utils.js                 # Funciones utilitarias
    ├── public/
    │   └── placeholder.jpg          # Imagen por defecto
    ├── tailwind.config.js
    ├── package.json
    └── .env.local                   # Variables de entorno del cliente
```
---

#  Tecnologías Utilizadas

### Backend  
- Node.js v18  
- Express.js  
- PostgreSQL  
- Sequelize ORM  
- Multer (para imágenes) 
- pg o Sequelize  
- Dotenv  

### **Frontend**
- Next.js 15 (App Router)  
- React 19  
- TypeScript  
- TailwindCSS v4  
- Fetch API  
- Componentes reutilizables  
- localStorage para favoritos  

### DevOps / Control de Versiones  
- GitFlow (`main`, `develop`)  
- Commits semánticos  
- GitHub remoto  

---

#  Instalación y Ejecución

##  1. Clonar el repositorio
```bash
git clone https://github.com/Poli-devs/AppCocteles.git
cd AppCocteles

# Configurar la Base de Datos

```bash
# Crear la base de datos
createdb AppCocktail

# O desde psql:
psql -U postgres
CREATE DATABASE AppCocktail;
\q
```

# Backend (Node.js v18)

```bash
# Entrar al backend
cd server

# Usar Node.js v18
nvm use 18

# Instalar dependencias
npm install

# Configurar variables de entorno en server/.env:
# DB_NAME=AppCocktail
# DB_USER=postgres
# DB_PASSWORD=tu_password

# Ejecutar servidor (puerto 4000)
npm run dev
```

Backend corriendo en: `http://localhost:4000`

# Frontend (Node.js v20)

```bash
# Abrir nueva terminal
cd client

# Usar Node.js v20
nvm use 20

# Instalar dependencias
npm install

# Ejecutar proyecto (puerto 3000)
npm run dev
```

Frontend corriendo en: `http://localhost:3000`

# Endpoints Backend (Implementados)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/cocktails` | Listar cócteles (con búsqueda opcional `?search=`) |
| GET | `/api/cocktails/:id` | Ver detalle de un cóctel |
| POST | `/api/cocktails` | Crear cóctel (con imagen) |
| PUT | `/api/cocktails/:id` | Editar cóctel (con imagen opcional) |
| DELETE | `/api/cocktails/:id` | Desactivar cóctel (soft delete) |

## Funcionalidades del Frontend

### Página Principal (`/`)
- **Catálogo completo** de cócteles con grid responsive
- **Búsqueda en tiempo real** por nombre
- **Filtros de disponibilidad** (Disponibles / No disponibles / Todos)
- **Sistema de favoritos** con corazón interactivo
- **Estados de carga** y manejo de errores
- **Botón de reintentar** en caso de error

### Detalle de Cóctel (`/cocktails/[id]`)
- **Vista completa** del cóctel con imagen, precio y descripción
- **Modal de edición** con formulario integrado
- **Modal de confirmación** para eliminar
- **Indicador de disponibilidad** visual
- **Fechas de creación y actualización**
- **Mensajes de éxito** con auto-ocultado

### Agregar Cóctel (`/agregar`)
- **Formulario completo** con validación
- **Preview de imagen** antes de subir
- **Validación de archivos** (tipo y tamaño máx. 5MB)
- **Redirección automática** después de crear
- **Mensaje de éxito** con feedback visual

### Favoritos (`/favoritos`)
- **Lista de cócteles favoritos** guardados en localStorage
- **Persistencia de datos** entre sesiones
- **Indicador de disponibilidad** en cada tarjeta
- **Estado vacío** con mensaje y enlace al catálogo
- **Sincronización automática** con el sistema de favoritos

### Componentes Reutilizables
- **Navbar** - Navegación global con rutas activas
- **CocktailCard** - Tarjeta de cóctel con favoritos
- **CocktailForm** - Formulario para crear/editar

### Características Técnicas
- **API centralizada** en `/app/api/` para todas las peticiones
- **Funciones utilitarias** en `/lib/utils.js`
- **TypeScript** para type safety
- **Manejo de errores** robusto en todas las operaciones
- **Imágenes optimizadas** con placeholder automático
- **Diseño responsive** con TailwindCSS
- **Comentarios en código** para facilitar mantenimiento

## Páginas Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Catálogo principal con búsqueda y filtros |
| `/cocktails/[id]` | Detalle, edición y eliminación de cóctel |
| `/agregar` | Formulario para crear nuevo cóctel |
| `/favoritos` | Lista de cócteles marcados como favoritos |


##  Esquema de Base de Datos

```sql
-- database.sql
CREATE TABLE cocktails (
    id_cocktail SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen_url VARCHAR(255),
    disponible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## Características de Diseño

- **Paleta de colores** profesional con azul como color principal
- **Botones con estados** hover y disabled
- **Modales con backdrop blur** para mejor UX
- **Animaciones suaves** en transiciones
- **Grid responsive** que se adapta a móvil, tablet y desktop
- **Mensajes de feedback** claros para el usuario
- **Iconos emoji** para mejor experiencia visual

## Notas Importantes

- El backend corre en el puerto **4000**
- El frontend corre en el puerto **3000**
- Las imágenes se guardan en `server/uploads/`
- Los favoritos se guardan en `localStorage` del navegador
- El sistema usa **soft delete** (no elimina físicamente los registros)
- Todos los archivos tienen **comentarios explicativos** para facilitar el mantenimiento

## Autor

**Luis Fernando**  
Desarrollador de Software  
GitHub: https://github.com/Poli-devs

---

