import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Types
export interface AuthUser {
  _id: string;
  email: string;
  name?: string;
  token?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  deleteUser: () => void;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<AuthUser | null>(null);

  const setUser = useCallback((newUser: AuthUser) => {
    setUserState(newUser);
  }, []);

  const deleteUser = useCallback(() => {
    setUserState(null);
  }, []);

  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    setUser,
    deleteUser,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
