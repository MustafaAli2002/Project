import { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  isLoading: true,
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to parse user data", error);
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch profile');

      const data = await response.json();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error("Profile fetch error:", error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      isLoading,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};