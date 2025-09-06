export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  badges: {
    greenStarter: boolean;
    ecoSaver: boolean;
    wasteWarrior: boolean;
  };
}

export interface Product {
  id: string;
  name: string;
  category: 'Laptop' | 'Mobile' | 'Accessories' | 'Home Appliance' | 'Clothes' | 'Furniture' | 'Books' | 'Kitchen & Lifestyle' | 'Transport & Outdoor';
  description: string;
  image: string;
  price: number; // in rupees
  weight: number; // in grams
  quantity: number;
  ecoImpact: {
    eWasteSaved: number; // in grams
    co2Saved: number; // in grams
  };
  sellerId: string;
  sellerName: string;
  timestamp: any;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  requirement: string;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface UserCredentials {
  email: string;
  password: string;
  name: string;
}
export interface Order {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  productName: string;
  timestamp: any;
}

export const CATEGORY_WEIGHTS = {
  'Laptop': 2500, // 2.5kg average
  'Mobile': 200, // 200g average
  'Accessories': 100, // 100g average
  'Home Appliance': 5000, // 5kg average
  'Clothes': 300, // 300g average
  'Furniture': 8000, // 8kg average
  'Books': 400, // 400g average
  'Kitchen & Lifestyle': 250, // 250g average
  'Transport & Outdoor': 12000, // 12kg average
};

// Electronics categories for e-waste tracking
export const ELECTRONICS_CATEGORIES = ['Laptop', 'Mobile', 'Accessories', 'Home Appliance'];

// Badge requirements
export const BADGE_REQUIREMENTS = {
  greenStarter: { orders: 1 },
  ecoSaver: { co2Saved: 50000 }, // 50kg in grams
  wasteWarrior: { eWasteItems: 10 }, // 10 electronic items
};
export const CATEGORY_PRICE_RANGES = {
  'Laptop': { min: 10000, max: 60000 },
  'Mobile': { min: 5000, max: 40000 },
  'Accessories': { min: 200, max: 5000 },
  'Home Appliance': { min: 3000, max: 30000 },
  'Clothes': { min: 100, max: 2000 },
  'Furniture': { min: 500, max: 15000 },
  'Books': { min: 50, max: 1000 },
  'Kitchen & Lifestyle': { min: 100, max: 5000 },
  'Transport & Outdoor': { min: 1000, max: 20000 },
};