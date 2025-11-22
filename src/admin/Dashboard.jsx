import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ManageUsers from './ManageUsers';

export default function AdminDashboard() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  const handleSignout = () => {
    signout();
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '2px solid #eee',
        paddingBottom: '10px'
      }}>
        <h1>Admin Dashboard</h1>
        <div>
          <span style={{ marginRight: '20px' }}>Welcome, {user?.name}</span>
          <button 
            onClick={handleSignout}
            style={{
              padding: '8px 16px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '10px 20px',
            margin: '0 10px 10px 0',
            background: activeTab === 'users' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Manage Users
        </button>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            margin: '0 10px 10px 0',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Site
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {activeTab === 'users' && <ManageUsers />}
      </div>
    </div>
  );
}