
import { User } from './types';
export { type User };
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.62:5000/api';

export const getFullAvatarUrl = (path: string | null) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://192.168.1.62:5000';
  return `${baseUrl}${path}`;
};


export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const setUserData = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const updateUserData = (updatedData: Partial<User>) => {
  if (typeof window !== 'undefined') {
    const user = getUserData();
    if (user) {
      const dataToUpdate = { ...updatedData };
      if (dataToUpdate.avatar) {
        dataToUpdate.avatar = getFullAvatarUrl(dataToUpdate.avatar);
      }
      const newUser = { ...user, ...dataToUpdate };
      setUserData(newUser);
      return newUser;
    }
  }
  return null;
};

export const updateUserAvatar = (avatarUrl: string) => {
  if (typeof window !== 'undefined') {
    const user = getUserData();
    if (user) {
      user.avatar = getFullAvatarUrl(avatarUrl);
      setUserData(user);
    }
  }
};

export const getUserData = (): User | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};
