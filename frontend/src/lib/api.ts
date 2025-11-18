import axios from 'axios';
import { AuthResponse, LoginData, RegisterData, Todo, TodoFormData } from '../types';

const API_BASE_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
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

export const authAPI = {
  login: (data: LoginData): Promise<AuthResponse> =>
    api.post('/auth/login', data).then(res => res.data),
  
  register: (data: RegisterData): Promise<AuthResponse> =>
    api.post('/auth/register', data).then(res => res.data),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgotpassword', { email }).then(res => res.data),
  
  resetPassword: (token: string, password: string) =>
    api.put(`/auth/resetpassword/${token}`, { password }).then(res => res.data),
  
  getMe: () =>
    api.get('/auth/me').then(res => res.data),
};

export const todosAPI = {
  getTodos: (): Promise<{ success: boolean; data: Todo[] }> =>
    api.get('/todos').then(res => res.data),
  
  getTodo: (id: string): Promise<{ success: boolean; data: Todo }> =>
    api.get(`/todos/${id}`).then(res => res.data),
  
  createTodo: (data: TodoFormData): Promise<{ success: boolean; data: Todo }> =>
    api.post('/todos', data).then(res => res.data),
  
  updateTodo: (id: string, data: Partial<Todo>): Promise<{ success: boolean; data: Todo }> =>
    api.put(`/todos/${id}`, data).then(res => res.data),
  
  deleteTodo: (id: string): Promise<{ success: boolean }> =>
    api.delete(`/todos/${id}`).then(res => res.data),
  
  toggleTodo: (id: string): Promise<{ success: boolean; data: Todo }> =>
    api.put(`/todos/${id}/toggle`).then(res => res.data),
};

export default api;