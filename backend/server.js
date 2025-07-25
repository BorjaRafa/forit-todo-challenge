require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

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
  res.json(tasks);
});

// POST /api/tasks - Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: Date.now().toString(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - Actualizar una tarea existente
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description || tasks[taskIndex].description,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed
  };

  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// DELETE /api/tasks/:id - Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
