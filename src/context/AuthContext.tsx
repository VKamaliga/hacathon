import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  orderCount: number;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  incrementOrderCount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [orderCount, setOrderCount] = useState(0);

  // Load order count for a specific email
  const loadOrderCount = (email: string): number => {
    const savedCounts = localStorage.getItem('userOrderCounts');
    if (savedCounts) {
      const counts = JSON.parse(savedCounts);
      return counts[email] || 0;
    }
    return 0;
  };

  // Save order count for a specific email
  const saveOrderCount = (email: string, count: number) => {
    const savedCounts = localStorage.getItem('userOrderCounts');
    const counts = savedCounts ? JSON.parse(savedCounts) : {};
    counts[email] = count;
    localStorage.setItem('userOrderCounts', JSON.stringify(counts));
  };

  const signIn = async (email: string, password: string) => {
    setAuthError(null);
    setLoading(true);
    
    // Simple validation
    if (!email || !password) {
      setAuthError('Please enter both email and password');
      setLoading(false);
      return;
    }

    // Simulate login delay
    setTimeout(() => {
      const newUser: User = {
        id: '1',
        name: email.split('@')[0], // Use email prefix as name
        email: email,
        location: '',
      };
      const userOrderCount = loadOrderCount(email);
      setUser(newUser);
      setOrderCount(userOrderCount);
      setLoading(false);
    }, 500);
  };

  const signUp = async (email: string, password: string, name: string) => {
    setAuthError(null);
    setLoading(true);
    
    // Simple validation
    if (!email || !password || !name) {
      setAuthError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Simulate signup delay
    setTimeout(() => {
      const newUser: User = {
        id: '1',
        name: name,
        email: email,
        location: '',
      };
      const userOrderCount = loadOrderCount(email);
      setUser(newUser);
      setOrderCount(userOrderCount);
      setLoading(false);
    }, 500);
  };

  const signOut = async () => {
    // Save current order count before signing out
    if (user) {
      saveOrderCount(user.email, orderCount);
    }
    setUser(null);
    setOrderCount(0);
  };

  const incrementOrderCount = () => {
    setOrderCount(prev => {
      const newCount = prev + 1;
      // Save the updated count immediately
      if (user) {
        saveOrderCount(user.email, newCount);
      }
      return newCount;
    });
  };
  const value = {
    user,
    loading,
    authError,
    orderCount,
    signIn,
    signUp,
    signOut,
    incrementOrderCount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};