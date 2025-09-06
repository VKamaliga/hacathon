import React, { createContext, useContext, useState } from 'react';
import { User, UserCredentials } from '../types';
import { checkBadgeEligibility, isElectronicsCategory } from '../utils/badgeUtils';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  orderCount: number;
  eWasteSaved: number;
  co2Saved: number;
  totalSpent: number;
  eWasteItemsSaved: number;
  newBadgeEarned: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  incrementOrderCount: (eWaste: number, co2: number, price: number, category?: string) => void;
  clearNewBadge: () => void;
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
  const [totalSpent, setTotalSpent] = useState(0);
  const [eWasteItemsSaved, setEWasteItemsSaved] = useState(0);
  const [newBadgeEarned, setNewBadgeEarned] = useState<string | null>(null);

  // Load user stats for a specific email
  const loadUserStats = (email: string): { 
    orderCount: number; 
    eWasteSaved: number; 
    co2Saved: number; 
    totalSpent: number; 
    eWasteItemsSaved: number;
    badges: { greenStarter: boolean; ecoSaver: boolean; wasteWarrior: boolean };
  } => {
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      return stats[email] || { 
        orderCount: 0, 
        eWasteSaved: 0, 
        co2Saved: 0, 
        totalSpent: 0, 
        eWasteItemsSaved: 0,
        badges: { greenStarter: false, ecoSaver: false, wasteWarrior: false }
      };
    }
    return { 
      orderCount: 0, 
      eWasteSaved: 0, 
      co2Saved: 0, 
      totalSpent: 0, 
      eWasteItemsSaved: 0,
      badges: { greenStarter: false, ecoSaver: false, wasteWarrior: false }
    };
  };

  // Save user stats for a specific email
  const saveUserStats = (
    email: string, 
    orderCount: number, 
    eWasteSaved: number, 
    co2Saved: number, 
    totalSpent: number, 
    eWasteItemsSaved: number,
    badges: { greenStarter: boolean; ecoSaver: boolean; wasteWarrior: boolean }
  ) => {
    const savedStats = localStorage.getItem('userStats');
    const stats = savedStats ? JSON.parse(savedStats) : {};
    stats[email] = { orderCount, eWasteSaved, co2Saved, totalSpent, eWasteItemsSaved, badges };
    localStorage.setItem('userStats', JSON.stringify(stats));
  };

  const signIn = async (email: string, password: string) => {
    setAuthError(null);
    setLoading(true);
    
    // Validation
    if (!email || !password) {
      setAuthError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    // Check if user exists
    const savedUsers = localStorage.getItem('userCredentials');
    const users: UserCredentials[] = savedUsers ? JSON.parse(savedUsers) : [];
    const existingUser = users.find(u => u.email === email);
    
    if (!existingUser) {
      setAuthError('Email not found. New users must sign up first.');
      setLoading(false);
      return;
    }
    
    if (existingUser.password !== password) {
      setAuthError('Incorrect password. Please try again.');
      setLoading(false);
      return;
    }

    // Simulate login delay for successful login
    setTimeout(() => {
      const userStats = loadUserStats(email);
      const newUser: User = {
        id: '1',
        name: existingUser.name,
        email: email,
        location: '',
        badges: userStats.badges,
      };
      setUser(newUser);
      setOrderCount(userStats.orderCount);
      setEWasteSaved(userStats.eWasteSaved);
      setCo2Saved(userStats.co2Saved);
      setTotalSpent(userStats.totalSpent);
      setEWasteItemsSaved(userStats.eWasteItemsSaved);
      setLoading(false);
    }, 500);
  };

  const signUp = async (email: string, password: string, name: string) => {
    setAuthError(null);
    setLoading(true);
    
    // Validation
    if (!email || !password || !name) {
      setAuthError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    // Check if user already exists
    const savedUsers = localStorage.getItem('userCredentials');
    const users: UserCredentials[] = savedUsers ? JSON.parse(savedUsers) : [];
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      setAuthError('Email already exists. Please sign in instead.');
      setLoading(false);
      return;
    }
    
    // Save new user credentials
    users.push({ email, password, name });
    localStorage.setItem('userCredentials', JSON.stringify(users));

    // Simulate signup delay
    setTimeout(() => {
      const userStats = loadUserStats(email);
      const newUser: User = {
        id: '1',
        name: name,
        email: email,
        location: '',
        badges: userStats.badges,
      };
      setUser(newUser);
      setOrderCount(userStats.orderCount);
      setEWasteSaved(userStats.eWasteSaved);
      setCo2Saved(userStats.co2Saved);
      setTotalSpent(userStats.totalSpent);
      setEWasteItemsSaved(userStats.eWasteItemsSaved);
      setLoading(false);
    }, 500);
  };

  const signOut = async () => {
    // Save current order count before signing out
    if (user) {
      saveUserStats(user.email, orderCount, eWasteSaved, co2Saved, totalSpent, eWasteItemsSaved, user.badges);
    }
    setUser(null);
    setOrderCount(0);
    setEWasteSaved(0);
    setCo2Saved(0);
    setTotalSpent(0);
    setEWasteItemsSaved(0);
    setNewBadgeEarned(null);
  };

  const incrementOrderCount = (eWaste: number, co2: number, price: number, category?: string) => {
    setOrderCount(prev => {
      const newCount = prev + 1;
      const newEWaste = eWasteSaved + eWaste;
      const newCo2 = co2Saved + co2;
      const newTotalSpent = totalSpent + price;
      
      // Check if this is an electronics item for e-waste tracking
      const isElectronics = category && isElectronicsCategory(category);
      const newEWasteItems = isElectronics ? eWasteItemsSaved + 1 : eWasteItemsSaved;
      
      // Save the updated count immediately
      if (user) {
        // Check for new badges
        const oldBadges = user.badges;
        const newBadgeEligibility = checkBadgeEligibility(newCount, newCo2, newEWasteItems);
        
        // Check which badge was just earned
        let earnedBadge: string | null = null;
        if (!oldBadges.greenStarter && newBadgeEligibility.greenStarter) {
          earnedBadge = 'greenStarter';
        } else if (!oldBadges.ecoSaver && newBadgeEligibility.ecoSaver) {
          earnedBadge = 'ecoSaver';
        } else if (!oldBadges.wasteWarrior && newBadgeEligibility.wasteWarrior) {
          earnedBadge = 'wasteWarrior';
        }
        
        const updatedBadges = {
          greenStarter: newBadgeEligibility.greenStarter,
          ecoSaver: newBadgeEligibility.ecoSaver,
          wasteWarrior: newBadgeEligibility.wasteWarrior,
        };
        
        // Update user with new badges
        const updatedUser = { ...user, badges: updatedBadges };
        setUser(updatedUser);
        
        setEWasteSaved(newEWaste);
        setCo2Saved(newCo2);
        setTotalSpent(newTotalSpent);
        setEWasteItemsSaved(newEWasteItems);
        
        // Show badge notification if a new badge was earned
        if (earnedBadge) {
          setNewBadgeEarned(earnedBadge);
        }
        
        saveUserStats(user.email, newCount, newEWaste, newCo2, newTotalSpent, newEWasteItems, updatedBadges);
      }
      return newCount;
    });
  };
  
  const clearNewBadge = () => {
    setNewBadgeEarned(null);
  };

  const value = {
    user,
    loading,
    authError,
    orderCount,
    eWasteSaved,
    co2Saved,
    totalSpent,
    eWasteItemsSaved,
    newBadgeEarned,
    signIn,
    signUp,
    signOut,
    incrementOrderCount,
    clearNewBadge,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};