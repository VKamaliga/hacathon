import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';
import { formatWeight, formatCO2, getCO2Equivalent } from '../utils/calculations';
import { ArrowLeft, User, Leaf, Zap, CheckCircle, Sparkles } from 'lucide-react';

interface BuyItemsProps {
  onBack: () => void;
}

const BuyItems: React.FC<BuyItemsProps> = ({ onBack }) => {
  const { incrementOrderCount } = useAuth();
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [co2Celebration, setCo2Celebration] = useState<{ show: boolean; co2Saved: number; productName: string }>({
    show: false,
    co2Saved: 0,
    productName: '',
  });

  // Mock products data
  const products: Product[] = [
    {
      id: '1',
      name: 'MacBook Pro 13-inch',
      category: 'Laptop',
      description: 'Excellent condition MacBook Pro with M1 chip, 8GB RAM, 256GB SSD. Perfect for work and creative tasks.',
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800',
      weight: 2500,
      ecoImpact: {
        eWasteSaved: 2500,
        co2Saved: 15000,
      },
      sellerId: '2',
      sellerName: 'John Doe',
      timestamp: new Date(),
    },
    {
      id: '2',
      name: 'iPhone 12',
      category: 'Mobile',
      description: 'Great condition iPhone 12, 128GB storage, unlocked. Battery health at 85%. Includes original charger.',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800',
      weight: 200,
      ecoImpact: {
        eWasteSaved: 200,
        co2Saved: 1200,
      },
      sellerId: '3',
      sellerName: 'Sarah Smith',
      timestamp: new Date(),
    },
    {
      id: '3',
      name: 'Wireless Headphones',
      category: 'Accessories',
      description: 'Sony WH-1000XM4 noise-canceling headphones. Excellent sound quality and battery life.',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      weight: 100,
      ecoImpact: {
        eWasteSaved: 100,
        co2Saved: 600,
      },
      sellerId: '4',
      sellerName: 'Mike Johnson',
      timestamp: new Date(),
    },
  ];

  const handleOrder = async (product: Product) => {
    incrementOrderCount();
    
    // Show CO2 celebration popup
    setCo2Celebration({
      show: true,
      co2Saved: product.ecoImpact.co2Saved,
      productName: product.name,
    });
    
    // Hide celebration after 3 seconds
    setTimeout(() => {
      setCo2Celebration({ show: false, co2Saved: 0, productName: '' });
    }, 3000);
    
    setOrderSuccess(product.name);
    setTimeout(() => setOrderSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-4">
      {/* CO2 Celebration Popup */}
      {co2Celebration.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center transform animate-bounce shadow-2xl border border-gray-200">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center animate-pulse">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {formatCO2(co2Celebration.co2Saved)} saved!
            </h2>
            <p className="text-lg text-green-600 font-semibold mb-4">Hurray! 🎉</p>
            <div className="bg-green-50 rounded-2xl p-4 mb-4 border border-green-200">
              <p className="text-sm text-green-700 font-medium mb-1">That's equivalent to:</p>
              <p className="text-green-800 font-semibold">
                {getCO2Equivalent(co2Celebration.co2Saved)}
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              By choosing {co2Celebration.productName}, you're helping reduce electronic waste and carbon emissions!
            </p>
            
            <div className="mt-6 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all duration-200 mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Buy Items</h1>
        </div>

        {orderSuccess && (
          <div className="bg-gray-100 border border-gray-400 text-gray-800 px-4 py-3 rounded-xl mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Order placed successfully for "{orderSuccess}"!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="w-4 h-4 mr-1" />
                  <span>Sold by {product.sellerName}</span>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Eco Impact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Leaf className="w-4 h-4 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">E-waste saved</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">
                        {formatWeight(product.ecoImpact.eWasteSaved)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">CO₂ saved</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">
                        {formatCO2(product.ecoImpact.co2Saved)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleOrder(product)}
                  className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-3 px-4 rounded-2xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyItems;