# AppCocteles – Aplicación Fullstack de Gestión de Cócteles

Prueba técnica desarrollada para la vacante de **Desarrollador de Software**, siguiendo arquitectura cliente–servidor con **Node.js**, **Express**, **PostgreSQL** y **Next.js 16** (Frontend).

Este proyecto incluye un backend con API REST y un frontend moderno en Next.js con TailwindCSS.  
Se aplica también un flujo profesional de Git con ramas `main` y `develop`.

---

## 🎯 Objetivo del Proyecto

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

##  Estructura del Proyecto
AppCocteles/
│

├── server/ # Backend (Node.js + Express + PostgreSQL)
│ ├── src/
│ │ ├── models/
│ │ ├── middlewares/
│ │ ├── controllers/
│ │ ├── services/
│ │ ├── routes/
│ │ ├── database/
│ │ ├── app.js
│ │ └── index.js
│ └── uploads
│ └── package.json
│

└── client/                # Frontend Next.js + TailwindCSS
  ├── app/
  │ ├── layout.js
  │ ├── page.jsx
  │ ├── cocktails/
  │ │ ├── page.jsx
  │ │ └── [id]/page.jsx
  │ ├── favoritos/page.jsx
  │ └── agregar/page.jsx
  ├── components/
  │ ├── Navbar.jsx
  │ ├── CocktailCard.jsx
  │ └── SearchBar.jsx
  ├── lib/
  │ └── api.js
  ├── public/
  │ └── placeholder.jpg
  ├── tailwind.config.js
  ├── package.json
  └── .env.local
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
- Next.js 16 (App Router)  
- React 19  
- TailwindCSS v4  
- Fetch API / Axios  
- Componentes reutilizables  

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

# Backend
Entrar al backend
cd server

#Instalar dependencias
npm install

#Ejecutar servidor
npm run dev

#o 
node src/index.js

#Frontend
#Configurar el Frontend (Next.js)
cd client

#Instalar dependencias
npm install

#Ejecutar proyecto
npm run dev

#Abrir manualmente en:
http://localhost:3000

# 📡 Endpoints Backend (Implementados)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/cocktails` | Listar cócteles (con búsqueda opcional `?search=`) |
| GET | `/api/cocktails/:id` | Ver detalle de un cóctel |
| POST | `/api/cocktails` | Crear cóctel (con imagen) |
| PUT | `/api/cocktails/:id` | Editar cóctel (con imagen opcional) |
| DELETE | `/api/cocktails/:id` | Desactivar cóctel (soft delete) |

## Funcionalidades del Frontend

✅ **Lista de cócteles** con búsqueda en tiempo real  
✅ **Vista de detalle** con toda la información del cóctel  
✅ **Formulario de creación** con validación y preview de imagen  
✅ **Formulario de edición** integrado en la página de detalle  
✅ **Sistema de favoritos** persistente con localStorage  
✅ **Navegación global** con barra de navegación  
✅ **Manejo de errores** y estados de carga  
✅ **Imágenes optimizadas** con placeholder automático  
✅ **Diseño responsive** con TailwindCSS

#Flujo de Trabajo Git (GitFlow)
Crear rama de desarrollo:
git checkout -b develop

#Subir cambios:
git add .
git commit -m "feat: descripción del cambio"
git push origin develop

#Autor

Luis Fernando
Desarrollador de Software
GitHub: https://github.com/Poli-devs

#DATABASE :
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
