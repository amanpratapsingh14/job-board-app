import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to add signal to requests
const addSignal = (config, signal) => {
  if (signal) {
    return { ...config, signal };
  }
  return config;
};

// Auth API
export const authAPI = {
  register: (userData, signal) => api.post('/auth/register', userData, addSignal({}, signal)),
  login: (credentials, signal) => {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    return api.post('/auth/token', formData, addSignal({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }, signal));
  },
};

// Jobs API
export const jobsAPI = {
  getAll: (params = {}, signal) => api.get('/jobs/', addSignal({ params }, signal)),
  getById: (id, signal) => api.get(`/jobs/${id}`, addSignal({}, signal)),
  create: (jobData, signal) => api.post('/jobs/', jobData, addSignal({}, signal)),
  update: (id, jobData, signal) => api.put(`/jobs/${id}`, jobData, addSignal({}, signal)),
  delete: (id, signal) => api.delete(`/jobs/${id}`, addSignal({}, signal)),
};

// Applications API
export const applicationsAPI = {
  getAll: (params = {}, signal) => api.get('/applications/', addSignal({ params }, signal)),
  getById: (id, signal) => api.get(`/applications/${id}`, addSignal({}, signal)),
  getByJob: (jobId, signal) => api.get(`/applications/job/${jobId}`, addSignal({}, signal)),
  create: (applicationData, signal) => {
    // If applicationData is already a FormData object, use it directly
    if (applicationData instanceof FormData) {
      return api.post('/applications/', applicationData, addSignal({
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }, signal));
    }
    
    // Otherwise, create FormData from object (for backward compatibility)
    const formData = new FormData();
    Object.keys(applicationData).forEach(key => {
      if (applicationData[key] !== null && applicationData[key] !== undefined) {
        formData.append(key, applicationData[key]);
      }
    });
    return api.post('/applications/', formData, addSignal({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }, signal));
  },
  updateStatus: (id, status, signal) => api.put(`/applications/${id}`, { status }, addSignal({}, signal)),
  downloadResume: (applicationId, signal) => {
    const token = localStorage.getItem('token');
    const url = `${API_BASE_URL}/applications/${applicationId}/resume/download`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/octet-stream',
      },
      signal,
    });
  },
  viewResume: (applicationId, signal) => {
    const token = localStorage.getItem('token');
    const url = `${API_BASE_URL}/applications/${applicationId}/resume/view`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
      signal,
    });
  },
};

export default api; 