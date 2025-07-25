```markdown
# 🚀 ForIT Todo Challenge - FullStack App

![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey)

Aplicación completa de lista de tareas con **React (Frontend)** y **Node.js + Express (Backend)**.  
Cumple con todos los requisitos del challenge de Academia ForIT.

## 📌 Características

### Backend
✔️ API REST con Express  
✔️ 4 Endpoints (CRUD completo)  
✔️ Variables de entorno  
✔️ Persistencia en memoria  

### Frontend
✔️ Componentes React (TaskList, TaskItem, TaskForm)  
✔️ Routing con React Router  
✔️ Llamadas API con Fetch  
✔️ Validación de formularios  

## 🛠️ Instalación

### 1. Clonar repositorio
```bash
git clone https://github.com/BorjaRafa/forit-todo-challenge.git
cd forit-todo-challenge
```

### 2. Configurar backend
```bash
cd backend
npm install
npm start
```
El servidor iniciará en: http://localhost:5000

### 3. Configurar frontend (en otra terminal)
```bash
cd ../frontend
npm install
npm run dev
```
La aplicación estará en: http://localhost:3000

## 📡 Endpoints API

```http
GET    /api/tasks       → Obtener todas las tareas
POST   /api/tasks       → Crear nueva tarea
PUT    /api/tasks/:id   → Actualizar tarea existente
DELETE /api/tasks/:id   → Eliminar tarea
```

## 🔐 Variables de entorno

Crea estos archivos:

### backend/.env
```env
PORT=5000
```

### frontend/.env
```env
VITE_API_URL=http://localhost:5000
```

## 🧩 Estructura del proyecto

```
forit-todo-challenge/
├── backend/
│   ├── server.js       # API Endpoints
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/ # TaskList, TaskItem, TaskForm
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
└── README.md
```

## 💻 Tecnologías usadas

- **Frontend**: React, Vite, React Router  
- **Backend**: Node.js, Express, CORS  
- **Herramientas**: Git, GitHub  

---

✨ **Challenge completado para Academia ForIT**  
