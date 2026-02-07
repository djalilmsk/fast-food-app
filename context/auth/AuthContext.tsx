import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { customFetch } from '@/services/config';

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
  isLoading: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USER_STORAGE_KEY = '@fast_food_user';

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize user from storage and validate with /me endpoint
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Try to load user from storage
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);

        if (storedUser) {
          // Token is in cookies, automatically sent by axios (withCredentials: true)
          try {
            // Validate token with /me endpoint
            const response = await customFetch.get('/auth/me');

            if (response.data?.data?.user) {
              const userData = response.data.data.user;
              // Update user with fresh data from server
              setIsAuthenticated(true);
              setUserState(userData);
            }
          } catch (error) {
            // Token is invalid, clear storage
            console.log('Token validation failed, clearing storage');
            await AsyncStorage.removeItem(USER_STORAGE_KEY);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const setUser = useCallback(async (newUser: AuthUser) => {
    try {
      setUserState(newUser);
      setIsAuthenticated(true);

      // Save user data to AsyncStorage (token is in cookies)
      const userWithoutToken = { ...newUser };
      delete userWithoutToken.token;
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutToken));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }, []);

  const deleteUser = useCallback(async () => {
    try {
      setUserState(null);
      setIsAuthenticated(false);
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem(USER_STORAGE_KEY);

      // Note: Cookie will be cleared by backend on logout endpoint
    } catch (error) {
      console.error('Error deleting user from storage:', error);
    }
  }, []);

  const value: AuthContextType = {
    user,
    setUser,
    deleteUser,
    isAuthenticated,
    isLoading,
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
