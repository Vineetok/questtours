import { api } from './api';
import { AuthResponse, LoginCredentials, RegisterData } from '@/lib/types';

export const authService = {
  login: (credentials: LoginCredentials) => {
    return api.post<AuthResponse>('/auth/login', credentials);
  },
  
  register: (userData: RegisterData) => {
    return api.post<AuthResponse>('/auth/register', userData);
  },
};
