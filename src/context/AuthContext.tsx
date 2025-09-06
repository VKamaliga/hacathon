import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  orderCount: number;
  eWasteSaved: number;
  co2Saved: number;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  incrementOrderCount: (eWaste: number, co2: number) => void;
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
  const [eWasteSaved, setEWasteSaved] = useState(0);
  const [co2Saved, setCo2Saved] = useState(0);

  // Load user stats for a specific email
  const loadUserStats = (email: string): { orderCount: number; eWasteSaved: number; co2Saved: number } => {
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      return stats[email] || { orderCount: 0, eWasteSaved: 0, co2Saved: 0 };
    }
    return { orderCount: 0, eWasteSaved: 0, co2Saved: 0 };
  };

  // Save user stats for a specific email
  const saveUserStats = (email: string, orderCount: number, eWasteSaved: number, co2Saved: number) => {
    const savedStats = localStorage.getItem('userStats');
    const stats = savedStats ? JSON.parse(savedStats) : {};
    stats[email] = { orderCount, eWasteSaved, co2Saved };
    localStorage.setItem('userStats', JSON.stringify(stats));
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
      const userStats = loadUserStats(email);
      setUser(newUser);
      setOrderCount(userStats.orderCount);
      setEWasteSaved(userStats.eWasteSaved);
      setCo2Saved(userStats.co2Saved);
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
      const userStats = loadUserStats(email);
      setUser(newUser);
      setOrderCount(userStats.orderCount);
      setEWasteSaved(userStats.eWasteSaved);
      setCo2Saved(userStats.co2Saved);
      setLoading(false);
    }, 500);
  };

  const signOut = async () => {
    // Save current order count before signing out
    if (user) {
      saveUserStats(user.email, orderCount, eWasteSaved, co2Saved);
    }
    setUser(null);
    setOrderCount(0);
    setEWasteSaved(0);
    setCo2Saved(0);
  };

  const incrementOrderCount = (eWaste: number, co2: number) => {
    setOrderCount(prev => {
      const newCount = prev + 1;
      // Save the updated count immediately
      if (user) {
        const newEWaste = eWasteSaved + eWaste;
        const newCo2 = co2Saved + co2;
        setEWasteSaved(newEWaste);
        setCo2Saved(newCo2);
        saveUserStats(user.email, newCount, newEWaste, newCo2);
      }
      return newCount;
    });
  };
  const value = {
    user,
    loading,
    authError,
    orderCount,
    eWasteSaved,
    co2Saved,
    signIn,
    signUp,
    signOut,
    incrementOrderCount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};