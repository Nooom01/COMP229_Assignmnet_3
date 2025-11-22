import api from './api';

const educationService = {
  getAll: async () => {
    const response = await api.get('/education');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/education/${id}`);
    return response.data;
  },

  create: async (educationData) => {
    const response = await api.post('/education', educationData);
    return response.data;
  },

  update: async (id, educationData) => {
    const response = await api.put(`/education/${id}`, educationData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/education/${id}`);
    return response.data;
  }
};

export default educationService;
