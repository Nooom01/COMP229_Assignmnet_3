import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data.projects || []);
    } catch (error) {
      toast.error('Error fetching projects');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/projects/${editing}`, data);
        toast.success('Project updated successfully');
        setEditing(null);
      } else {
        await axios.post('http://localhost:5000/api/projects', data);
        toast.success('Project created successfully');
      }
      setShowForm(false);
      reset();
      fetchProjects();
    } catch (error) {
      toast.error('Error saving project');
      console.error('Error:', error);
    }
  };

  const handleEdit = (project) => {
    setEditing(project._id);
    setShowForm(true);
    Object.keys(project).forEach(key => {
      setValue(key, project[key]);
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        toast.success('Project deleted successfully');
        fetchProjects();
      } catch (error) {
        toast.error('Error deleting project');
        console.error('Error:', error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    reset();
  };

  if (loading) {
    return <div style={styles.loading}>Loading projects...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Projects</h1>
        <div style={styles.headerButtons}>
          <Link to="/admin" style={styles.backButton}>Back to Dashboard</Link>
          {!showForm && (
            <button onClick={() => setShowForm(true)} style={styles.addButton}>
              Add New Project
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <div style={styles.formContainer}>
          <h2>{editing ? 'Edit Project' : 'Add New Project'}</h2>
          <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title *</label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  style={styles.input}
                  placeholder="Project title"
                />
                {errors.title && <span style={styles.error}>{errors.title.message}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Completion Date *</label>
                <input
                  type="date"
                  {...register('completion', { required: 'Completion date is required' })}
                  style={styles.input}
                />
                {errors.completion && <span style={styles.error}>{errors.completion.message}</span>}
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>First Name *</label>
                <input
                  type="text"
                  {...register('firstname', { required: 'First name is required' })}
                  style={styles.input}
                />
                {errors.firstname && <span style={styles.error}>{errors.firstname.message}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Last Name *</label>
                <input
                  type="text"
                  {...register('lastname', { required: 'Last name is required' })}
                  style={styles.input}
                />
                {errors.lastname && <span style={styles.error}>{errors.lastname.message}</span>}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                style={styles.input}
              />
              {errors.email && <span style={styles.error}>{errors.email.message}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description *</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                style={styles.textarea}
                rows="4"
                placeholder="Describe the project..."
              />
              {errors.description && <span style={styles.error}>{errors.description.message}</span>}
            </div>

            <div style={styles.formButtons}>
              <button type="submit" style={styles.submitButton}>
                {editing ? 'Update' : 'Add'} Project
              </button>
              <button type="button" onClick={handleCancel} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {projects.length === 0 ? (
        <p style={styles.noData}>No projects found.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Completion</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id}>
                  <td style={styles.td}>{project.title}</td>
                  <td style={styles.td}>{project.firstname} {project.lastname}</td>
                  <td style={styles.td}>{project.email}</td>
                  <td style={styles.td}>
                    {new Date(project.completion).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => handleEdit(project)} style={styles.editButton}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(project._id)} style={styles.deleteButton}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '2rem',
    color: '#333'
  },
  headerButtons: {
    display: 'flex',
    gap: '10px'
  },
  backButton: {
    padding: '10px 20px',
    background: '#6c757d',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px'
  },
  addButton: {
    padding: '10px 20px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px'
  },
  noData: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666'
  },
  formContainer: {
    background: '#f8f9fa',
    padding: '30px',
    borderRadius: '10px',
    marginBottom: '30px'
  },
  form: {
    marginTop: '20px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '20px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    resize: 'vertical'
  },
  error: {
    color: '#dc3545',
    fontSize: '14px',
    marginTop: '5px',
    display: 'block'
  },
  formButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px'
  },
  submitButton: {
    padding: '10px 20px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  cancelButton: {
    padding: '10px 20px',
    background: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  tableContainer: {
    background: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    background: '#f8f9fa',
    padding: '15px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #dee2e6'
  },
  td: {
    padding: '15px',
    borderBottom: '1px solid #dee2e6'
  },
  editButton: {
    padding: '5px 15px',
    background: '#ffc107',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px'
  },
  deleteButton: {
    padding: '5px 15px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
