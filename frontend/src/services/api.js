import axios from 'axios';

// API base URL - will be relative when served from same domain
const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
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
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Admin Registration (one-time setup)
export const adminRegister = async (email, password) => {
  const res = await api.post('/admin/register', { email, password });
  return res.data;
};

// Admin Login (returns JWT token)
export const adminLogin = async (email, password) => {
  const res = await api.post('/admin/login', { email, password });
  return res.data; // { access_token, token_type }
};

// Create Job (admin only)
export const createJob = async (job) => {
  const res = await api.post('/admin/jobs', job);
  return res.data;
};

// Get Job List (public)
export const getJobs = async () => {
  const res = await api.get('/jobs');
  return res.data;
};

// Get single job (public)
export const getJob = async (jobId) => {
  const res = await api.get(`/jobs/${jobId}`);
  return res.data;
};

// Apply for Job (public, multipart/form-data)
export const applyForJob = async (jobId, formData) => {
  const res = await api.post(`/jobs/${jobId}/apply`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// Get applications (admin only)
export const getApplications = async () => {
  const res = await api.get('/admin/applications');
  return res.data;
};

// Get user applications
export const getUserApplications = async () => {
  const res = await api.get('/user/applications');
  return res.data;
};

// User registration
export const userRegister = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

// User login
export const userLogin = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

// Get user profile
export const getUserProfile = async () => {
  const res = await api.get('/user/profile');
  return res.data;
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  const res = await api.put('/user/profile', profileData);
  return res.data;
};

// Get company profile
export const getCompanyProfile = async (companyId) => {
  const res = await api.get(`/company/${companyId}`);
  return res.data;
};

// Create company profile
export const createCompanyProfile = async (companyData) => {
  const res = await api.post('/company', companyData);
  return res.data;
};

// Update company profile
export const updateCompanyProfile = async (companyId, companyData) => {
  const res = await api.put(`/company/${companyId}`, companyData);
  return res.data;
};

export default api; 