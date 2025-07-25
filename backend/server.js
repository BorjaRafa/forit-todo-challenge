require('dotenv').config(); // Carga las variables de entorno PRIMERO
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Usa el puerto del .env o 5000 por defecto

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: '1',
    title: 'Aprender React',
    description: 'Estudiar los fundamentos de React',
    completed: false,
    createdAt: new Date()
  }
];

// GET /api/tasks - Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  try {
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/tasks - Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description?.trim() || '',
      completed: false,
      createdAt: new Date()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/tasks/:id - Actualizar una tarea existente
app.put('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = {
      ...tasks[taskIndex],
      title: title?.trim() || tasks[taskIndex].title,
      description: description?.trim() || tasks[taskIndex].description,
      completed: completed !== undefined ? completed : tasks[taskIndex].completed
    };

    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/tasks/:id - Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    tasks = tasks.filter(task => task.id !== id);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
