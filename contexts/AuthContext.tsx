import React, { createContext, useState, ReactNode, useContext } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

// For demo purposes, the password can be set here or ideally from an env var.
// Since we can't rely on `process.env` being set in this environment, we'll use a default.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check session storage to maintain login state across refreshes
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
