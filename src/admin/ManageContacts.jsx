import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function ManageContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/contacts');
      setContacts(response.data.contacts || []);
    } catch (error) {
      toast.error('Error fetching contacts');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`/contacts/${id}`);
        toast.success('Contact deleted successfully');
        fetchContacts();
      } catch (error) {
        toast.error('Error deleting contact');
        console.error('Error:', error);
      }
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading contacts...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Contacts</h1>
        <Link to="/admin" style={styles.backButton}>Back to Dashboard</Link>
      </div>
      
      {contacts.length === 0 ? (
        <p style={styles.noData}>No contacts found.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact._id}>
                  <td style={styles.td}>
                    {contact.firstname} {contact.lastname}
                  </td>
                  <td style={styles.td}>{contact.email}</td>
                  <td style={styles.td}>
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      style={styles.deleteButton}
                    >
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
  backButton: {
    padding: '10px 20px',
    background: '#6c757d',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px'
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
  deleteButton: {
    padding: '5px 15px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
