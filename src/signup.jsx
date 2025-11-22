import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useForm } from 'react-hook-form';

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    const result = await signup(data.name, data.email, data.password);
    
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
        <h2 style={styles.title}>Sign Up</h2>
        
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                }
              })}
              style={styles.input}
              placeholder="Enter your name"
            />
            {errors.name && (
              <span style={styles.fieldError}>{errors.name.message}</span>
            )}
          </div>
          
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
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value =>
                  value === password || 'Passwords do not match'
              })}
              style={styles.input}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span style={styles.fieldError}>{errors.confirmPassword.message}</span>
            )}
          </div>
          
          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        <p style={styles.link}>
          Already have an account? <Link to="/signin">Sign In</Link>
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
    background: '#28a745',
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
  }
};
