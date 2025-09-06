export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Laptop' | 'Mobile' | 'Accessories' | 'Home Appliance';
  description: string;
  image: string;
  weight: number; // in grams
  ecoImpact: {
    eWasteSaved: number; // in grams
    co2Saved: number; // in grams
  };
  sellerId: string;
  sellerName: string;
  timestamp: any;
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
};