const handleSubmit = async (e) => {
  e.preventDefault();
  if (!task.title.trim()) {
    alert("El título es obligatorio");
    return;
  } 
};
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`);
        if (!response.ok) throw new Error('Error al cargar tareas');
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        { method: 'DELETE' }
      );
      
      if (!response.ok) throw new Error('Error al eliminar');
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <div>Cargando tareas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Link to="/new" className="add-button">+ Nueva Tarea</Link>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-actions">
              <Link to={`/edit/${task.id}`} className="edit-button">Editar</Link>
              <button 
                onClick={() => handleDelete(task.id)} 
                className="delete-button"
              >
                Eliminar
              </button>
            </div>
            <p>Estado: {task.completed ? 'Completada' : 'Pendiente'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
