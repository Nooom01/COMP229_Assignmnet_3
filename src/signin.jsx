import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useForm } from 'react-hook-form';

export default function SignIn() {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    const result = await signin(data.email, data.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Sign In</h2>
        
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
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
              placeholder="Enter your email"
            />
            {errors.email && (
              <span style={styles.fieldError}>{errors.email.message}</span>
            )}
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              style={styles.input}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span style={styles.fieldError}>{errors.password.message}</span>
            )}
          </div>
          
          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div style={styles.adminInfo}>
          <p><strong>Admin Credentials (for testing):</strong></p>
          <p>Email: admin@portfolio.com</p>
          <p>Password: admin123</p>
        </div>
        
        <p style={styles.link}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 80px)',
    padding: '20px'
  },
  formWrapper: {
    background: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px'
  },
  button: {
    padding: '12px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  error: {
    background: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px'
  },
  fieldError: {
    color: '#dc3545',
    fontSize: '14px',
    marginTop: '5px',
    display: 'block'
  },
  link: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#666'
  },
  adminInfo: {
    background: '#e7f3ff',
    padding: '15px',
    borderRadius: '5px',
    marginTop: '20px',
    fontSize: '14px'
  }
};
