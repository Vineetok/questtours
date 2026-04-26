import { api } from './api';
import { User, Payment } from '@/lib/types';

export const userService = {
  getProfile: () => {
    return api.get<User>('/profile');
  },

  updateProfile: (data: Partial<User>) => {
    return api.put<{ message: string; user: User }>('/profile', data);
  },

  uploadAvatar: (formData: FormData) => {
    return api.post<{ avatarUrl: string }>('/profile/avatar', formData, true);
  },

  getPayments: () => {
    return api.get<Payment[]>('/profile/payments');
  },
};
