import { api } from './api';

export const authService = {
  login: (credentials: any) => {
    return api.post<any>('/auth/login', credentials);
  },
  
  register: (userData: any) => {
    return api.post<any>('/auth/register', userData);
  },
};
