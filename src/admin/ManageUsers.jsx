import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : 'https://comp229-assignmnet-3.onrender.com/api';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(users.filter(u => u._id !== userId));
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const toggleAdmin = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/users/${userId}`, 
        { isAdmin: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers(); // Refresh the list
    } catch (err) {
      setError('Failed to update user');
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Users</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Admin</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Created</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{u.name}</td>
              <td style={{ padding: '10px' }}>{u.email}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={u.isAdmin || false}
                  onChange={() => toggleAdmin(u._id, u.isAdmin)}
                  disabled={u._id === user._id} // Can't remove own admin status
                />
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                {new Date(u.created).toLocaleDateString()}
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <button
                  onClick={() => deleteUser(u._id)}
                  disabled={u._id === user._id} // Can't delete own account
                  style={{
                    padding: '5px 10px',
                    background: u._id === user._id ? '#ccc' : '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: u._id === user._id ? 'not-allowed' : 'pointer'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No users found</p>
      )}
    </div>
  );
}