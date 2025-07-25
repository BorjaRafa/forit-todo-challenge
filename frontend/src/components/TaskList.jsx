import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      alert('Tarea eliminada correctamente');
    } catch (err) {
      console.error('Delete error:', err);
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p>Cargando tareas...</p>
    </div>
  );

  if (error) return (
    <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
      <p>Error: {error}</p>
      <button onClick={() => window.location.reload()}>Reintentar</button>
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Lista de Tareas</h1>
        <Link 
          to="/new" 
          style={{
            padding: '8px 16px',
            background: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          + Nueva Tarea
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {tasks.map(task => (
          <div 
            key={task.id} 
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              background: '#fff'
            }}
          >
            <h3 style={{ marginTop: 0 }}>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              <strong>Estado:</strong> {task.completed ? '✅ Completada' : '🟡 Pendiente'}
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <Link
                to={`/edit/${task.id}`}
                style={{
                  padding: '6px 12px',
                  background: '#2196F3',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px'
                }}
              >
                Editar
              </Link>
              <button 
                onClick={() => handleDelete(task.id)}
                style={{
                  padding: '6px 12px',
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
