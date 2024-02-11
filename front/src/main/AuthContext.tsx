import React, { createContext, useState, useContext, useEffect } from 'react';

export interface AuthContextType {
  authToken: string | null;
  username: string | null; 
  name: string | null; 
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>; 
  setName: React.Dispatch<React.SetStateAction<string | null>>; 
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('token'));
  const [username, setUsername] = useState<string | null>(null); // Initialize username state
  const [name, setName] = useState<string | null>(null); // Initialize name state
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('token');
      setAuthToken(updatedToken);
    };
    window.addEventListener('storage', handleStorageChange);

    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);
      const storedName = localStorage.getItem('name');
      setName(storedName);
    }

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, username, setUsername, name, setName, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
