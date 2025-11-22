import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <p style={styles.welcome}>Welcome, {user?.name}!</p>
      
      <div style={styles.grid}>
        <Link to="/admin/contacts" style={styles.card}>
          <h2>Manage Contacts</h2>
          <p>View and manage contact messages</p>
        </Link>
        
        <Link to="/admin/projects" style={styles.card}>
          <h2>Manage Projects</h2>
          <p>Add, edit, or delete projects</p>
        </Link>
        
        <Link to="/admin/qualifications" style={styles.card}>
          <h2>Manage Qualifications</h2>
          <p>Add, edit, or delete education records</p>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center'
  },
  welcome: {
    fontSize: '1.2rem',
    color: '#666',
    textAlign: 'center',
    marginBottom: '40px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '40px'
  },
  card: {
    background: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    color: '#333',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 20px rgba(0,0,0,0.15)'
    }
  }
};
