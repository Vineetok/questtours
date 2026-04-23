import { api } from './api';

export const userService = {
  getProfile: () => {
    return api.get<any>('/profile');
  },
  
  updateProfile: (data: any) => {
    return api.put<any>('/profile', data);
  },
  
  uploadAvatar: (formData: FormData) => {
    return api.post<any>('/profile/avatar', formData, true);
  },
};
