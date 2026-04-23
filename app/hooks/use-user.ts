import { useState, useEffect } from 'react';
import { getUserData, User } from '@/lib/auth';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(getUserData());

    // Optional: Listen for changes to sync across tabs/components
    const handleStorageChange = () => {
      setUser(getUserData());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { user, setUser, mounted };
}
