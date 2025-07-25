import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    completed: false
  });

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`);
          if (!response.ok) throw new Error('Error al cargar tarea');
          const data = await response.json();
          setTask(data);
        } catch (error) {
          console.error('Error fetching task:', error);
          alert('Error al cargar la tarea');
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title.trim()) {
      alert("El título es obligatorio");
      return;
    }

    try {
      const url = id ? `${import.meta.env.VITE_API_URL}/api/tasks/${id}` : `${import.meta.env.VITE_API_URL}/api/tasks`;
      const method = id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
      });
      
      if (!response.ok) throw new Error(id ? 'Error al actualizar' : 'Error al crear');
      
      navigate('/');
    } catch (err) {
      console.error('Submit error:', err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>{id ? 'Editar Tarea' : 'Nueva Tarea'}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Título *
          </label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Descripción
          </label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', minHeight: '100px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            name="completed"
            id="completed"
            checked={task.completed}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
          />
          <label htmlFor="completed">Completada</label>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {id ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              padding: '8px 16px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
