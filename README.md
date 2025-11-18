# AppCocteles – Aplicación Fullstack de Gestión de Cócteles

Prueba técnica desarrollada para la vacante de **Desarrollador de Software**, siguiendo arquitectura cliente–servidor con **Node.js**, **Express**, **PostgreSQL** y **React**.

Este proyecto incluye un backend con API REST y un frontend en React que consume dicha API.  
Se aplica también un flujo profesional de Git con ramas `main` y `develop`.

---

##  Objetivo del Reto

Construir una aplicación completa para manejar cócteles con:

### **Backend (Node.js 18 + Express)**
- API para listar cócteles (con fotos)  
- Endpoint para ver detalle de un cóctel  
- Endpoint para agregar nuevos cócteles  
- Endpoint para editar un cóctel  
- Scripts SQL si se utiliza base de datos (PostgreSQL)  
- Arquitectura profesional separada en capas (`models`, `services`, `controllers`, `routes`, `database`)

---

### **Frontend (React + TailwindCSS)**
- Pantalla de lista de cócteles  
- Buscador de cócteles  
- Pantalla de detalle  
- Formulario para agregar un cóctel  
- Formulario para editar un cóctel  
- Manejo de favoritos con `localStorage`  
- Consumo de la API desarrollada en Node.js  

---

##  Estructura del Proyecto
AppCocteles/
│

├── server/ # Backend (Node.js + Express + PostgreSQL)
│ ├── src/
│ │ ├── models/
│ │ ├── controllers/
│ │ ├── services/
│ │ ├── routes/
│ │ ├── database/
│ │ ├── app.js
│ │ └── index.js
│ └── package.json
│


└── client/ # Frontend (React + TailwindCSS)
├── src/
│ ├── pages/
│ ├── components/
│ ├── api/
│ ├── routes/
│ ├── App.js
│ └── index.js
└── package.json


---

#  Tecnologías Utilizadas

### Backend  
- Node.js v18  
- Express.js  
- PostgreSQL  
- pg o Sequelize  
- Dotenv  

### Frontend  
- React.js (Create React App)  
- TailwindCSS  
- Axios  
- React Router  

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

#Frontend
Entrar al frontend

cd client

#Instalar dependencias
npm install

#Ejecutar proyecto
npm start

#Endpoints Backend (pendiente de implementación)
Método	Endpoint	Descripción
GET	/api/cocktails	Listar cócteles
GET	/api/cocktails/:id	Ver detalle
POST	/api/cocktails	Crear cóctel
PUT	/api/cocktails/:id	Editar cóctel

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