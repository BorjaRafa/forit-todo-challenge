# 📝 ForIT Todo Challenge  

![React](https://img.shields.io/badge/React-18.2-blue)  
![Node.js](https://img.shields.io/badge/Node.js-20-green)  
![Express](https://img.shields.io/badge/Express-4.18-lightgrey)  

Aplicación de lista de tareas con **React** (frontend) y **Node.js + Express** (backend). 
## 🚀 Cómo ejecutar el proyecto  

### Backend (Terminal 1)  
```bash  
cd backend  
npm install  
npm start  
```  
*El servidor iniciará en:* http://localhost:5000  

### Frontend (Terminal 2)  
```bash  
cd frontend  
npm install  
npm run dev  
```  
*La aplicación se abrirá en:* http://localhost:3000  

## 🧩 Componentes implementados  
| Componente | Función |  
|------------|---------|  
| `TaskList` | Muestra todas las tareas |  
| `TaskItem` | Renderiza cada tarea individual |  
| `TaskForm` | Formulario para crear/editar tareas |  

## 📡 Endpoints de la API  
```http  
GET    /api/tasks        → Obtener todas las tareas  
POST   /api/tasks        → Crear nueva tarea  
PUT    /api/tasks/:id    → Actualizar tarea existente  
DELETE /api/tasks/:id    → Eliminar tarea  
```  

## 🔐 Configuración de entorno  
Crea estos archivos:  

### backend/.env  
```env
PORT=5000
```

### frontend/.env  
```env
VITE_API_URL=http://localhost:5000
```

## 🖼️ Capturas de pantalla  
![Lista de tareas](/screenshots/list.png)  
 

![Formulario](/screenshots/form.png)  

---

✨ **Challenge completado para Academia ForIT 2025**  
```
