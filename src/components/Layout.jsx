import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, isAuthenticated, isAdmin, signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signout();
    navigate('/');
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <Link to="/" style={styles.logo}>
            <img src="/logo.png" alt="Logo" style={styles.logoImg} />
          </Link>
          
          <div style={styles.navLinks}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/about" style={styles.navLink}>About</Link>
            <Link to="/education" style={styles.navLink}>Education</Link>
            <Link to="/project" style={styles.navLink}>Projects</Link>
            <Link to="/services" style={styles.navLink}>Services</Link>
            <Link to="/contact" style={styles.navLink}>Contact</Link>
            
            {isAdmin && (
              <Link to="/admin" style={styles.adminLink}>Admin</Link>
            )}
            
            {isAuthenticated ? (
              <div style={styles.userSection}>
                <span style={styles.userName}>{user.name}</span>
                <button onClick={handleSignOut} style={styles.signoutBtn}>
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={styles.authLinks}>
                <Link to="/signin" style={styles.authLink}>Sign In</Link>
                <Link to="/signup" style={styles.signupBtn}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      <main style={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center'
  },
  logoImg: {
    height: '40px'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  navLink: {
    color: '#333',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  },
  adminLink: {
    color: '#dc3545',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginLeft: '20px',
    paddingLeft: '20px',
    borderLeft: '1px solid #ddd'
  },
  userName: {
    color: '#666',
    fontWeight: '500'
  },
  signoutBtn: {
    padding: '6px 12px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  authLinks: {
    display: 'flex',
    gap: '10px',
    marginLeft: '20px',
    paddingLeft: '20px',
    borderLeft: '1px solid #ddd'
  },
  authLink: {
    color: '#007bff',
    textDecoration: 'none',
    padding: '6px 12px'
  },
  signupBtn: {
    padding: '6px 12px',
    background: '#28a745',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px'
  },
  main: {
    minHeight: 'calc(100vh - 80px)'
  }
};
