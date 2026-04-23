import { api } from './api';
import { User, Payment } from '@/lib/types';

export const userService = {
  getProfile: () => {
    return api.get<User>('/profile');
  },

  updateProfile: (data: unknown) => {
    return api.put<unknown>('/profile', data);
  },

  uploadAvatar: (formData: FormData) => {
    return api.post<unknown>('/profile/avatar', formData, true);
  },

  getPayments: () => {
    return api.get<Payment[]>('/profile/payments');
  },
};
