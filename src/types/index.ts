export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Laptop' | 'Mobile' | 'Accessories' | 'Home Appliance' | 'Clothes' | 'Furniture' | 'Books' | 'Kitchen & Lifestyle' | 'Transport & Outdoor';
  description: string;
  image: string;
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