import axios from 'axios';
import store from '../store';
import { logout } from '../store/slices/authSlice';

const API_URL = 'http://localhost:5050/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adds token to requests
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

// Response interceptor - handles 401 responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Dispatch logout action to clear auth state
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  getProfile: () => api.get('/auth/profile')
};

export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getProducts: () => api.get('/admin/products'),
  createProduct: (productData) => api.post('/admin/products', productData),
  updateProduct: (id, productData) => api.put(`/admin/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  // Catégories admin
  getCategories: (topLevelOnly = false) => api.get(`/admin/categories?topLevelOnly=${topLevelOnly}`),
  getCategoryById: (id) => api.get(`/admin/categories/${id}`),
  createCategory: (categoryData) => api.post('/admin/categories', categoryData),
  updateCategory: (id, categoryData) => api.put(`/admin/categories/${id}`, categoryData),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}`)
};

export const categoriesAPI = {
  getAll: (topLevelOnly = false) => api.get(`/categories?topLevelOnly=${topLevelOnly}`),
  getById: (id) => api.get(`/categories/${id}`),
  getSubCategories: (id) => api.get(`/categories/${id}/subcategories`),
  getProducts: (id) => api.get(`/categories/${id}/products`)
};

export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`)
};