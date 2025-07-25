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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/tasks/${id}`);
          if (!response.ok) {
            throw new Error('Task not found');
          }
          const data = await response.json();
          setTask(data);
        } catch (error) {
          console.error('Error fetching task:', error);
        } finally {
          setIsLoading(false);
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
    
    try {
      const url = id ? `/api/tasks/${id}` : '/api/tasks';
      const method = id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
      });
      
      if (!response.ok) {
        throw new Error(id ? 'Failed to update task' : 'Failed to create task');
      }
      
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group checkbox">
        <label htmlFor="completed">Completed</label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={task.completed}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit" className="submit-button">
        {id ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
}

export default TaskForm;
