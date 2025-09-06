import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';
import { formatWeight, formatCO2, getCO2Equivalent } from '../utils/calculations';
import { ArrowLeft, User, Leaf, Zap, CheckCircle, Sparkles, Filter, Package } from 'lucide-react';

interface BuyItemsProps {
  onBack: () => void;
}

const BuyItems: React.FC<BuyItemsProps> = ({ onBack }) => {
  const { incrementOrderCount } = useAuth();
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [co2Celebration, setCo2Celebration] = useState<{ show: boolean; co2Saved: number; productName: string; message: string }>({
    show: false,
    co2Saved: 0,
    productName: '',
    message: '',
  });

  // Load products from localStorage
  const loadProducts = (): Product[] => {
    // Default products if none exist
    const defaultProducts: Product[] = [
      {
        id: '1',
        name: 'MacBook Pro 13-inch',
        category: 'Laptop',
        description: 'Excellent condition MacBook Pro with M1 chip, 8GB RAM, 256GB SSD. Perfect for work and creative tasks.',
        image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800',
        weight: 2500,
        quantity: 2,
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
        quantity: 1,
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
        quantity: 3,
        ecoImpact: {
          eWasteSaved: 100,
          co2Saved: 600,
        },
        sellerId: '4',
        sellerName: 'Mike Johnson',
        timestamp: new Date(),
      },
    ];
    
    const savedProducts = localStorage.getItem('products');
    let allProducts = [...defaultProducts];
    
    if (savedProducts) {
      const userProducts = JSON.parse(savedProducts);
      // Add user products to default products (avoid duplicates by ID)
      userProducts.forEach((userProduct: Product) => {
        if (!allProducts.find(p => p.id === userProduct.id)) {
          allProducts.push(userProduct);
        }
      });
    }
    
    return allProducts;
  };

  const [products, setProducts] = useState<Product[]>(loadProducts());
  
  // Separate available and sold out products
  const availableProducts = products.filter(product => product.quantity > 0);
  const soldOutProducts = products.filter(product => product.quantity === 0);

  const categories = ['All', 'Laptop', 'Mobile', 'Accessories', 'Home Appliance'];
  
  const filteredProducts = selectedCategory === 'All' 
    ? availableProducts 
    : availableProducts.filter(product => product.category === selectedCategory);
    
  const filteredSoldOutProducts = selectedCategory === 'All' 
    ? soldOutProducts 
    : soldOutProducts.filter(product => product.category === selectedCategory);

  const handleOrder = async (product: Product) => {
    // Update product quantity
    const updatedProducts = products.map(p => 
      p.id === product.id 
        ? { ...p, quantity: p.quantity - 1 }
        : p
    );
    
    setProducts(updatedProducts);
    
    // Update localStorage
    const savedProducts = localStorage.getItem('products') || '[]';
    const allProducts = JSON.parse(savedProducts);
    
    // Check if this is a user-added product or default product
    const isUserProduct = allProducts.find((p: Product) => p.id === product.id);
    
    if (isUserProduct) {
      // Update user products in localStorage
      const updatedUserProducts = allProducts.map((p: Product) => 
        p.id === product.id 
          ? { ...p, quantity: p.quantity - 1 }
          : p
      );
      localStorage.setItem('products', JSON.stringify(updatedUserProducts));
    } else {
      // For default products, add them to localStorage with updated quantity
      const defaultProductUpdate = {
        ...product,
        quantity: product.quantity - 1
      };
      allProducts.push(defaultProductUpdate);
      localStorage.setItem('products', JSON.stringify(allProducts));
    }
    
    incrementOrderCount(product.ecoImpact.eWasteSaved, product.ecoImpact.co2Saved);
    
    // Show CO2 celebration popup
    setCo2Celebration({
      show: true,
      co2Saved: product.ecoImpact.co2Saved,
      productName: product.name,
      message: getRandomCelebrationMessage(),
    });
    
    // Hide celebration after 3 seconds
    setTimeout(() => {
      setCo2Celebration({ show: false, co2Saved: 0, productName: '', message: '' });
    }, 7000);
    
    setOrderSuccess(product.name);
    setTimeout(() => setOrderSuccess(null), 3000);
  };

  const getRandomCelebrationMessage = () => {
    const messages = [
      "Excellent choice!",
      "Great decision!",
      "Well done!",
      "Fantastic!",
      "Outstanding!",
      "Wonderful choice!",
      "Perfect selection!",
      "Brilliant decision!",
      "Superb choice!",
      "Amazing impact!",
      "Incredible contribution!",
      "Remarkable choice!",
      "Exceptional decision!",
      "Impressive impact!",
      "Magnificent choice!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-4">
      {/* CO2 Celebration Popup */}
      {co2Celebration.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center transform shadow-2xl border border-gray-200 animate-[bounce_0.6s_ease-in-out_1,_fadeIn_0.3s_ease-in-out_0.6s_both]">
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
            <p className="text-lg text-green-600 font-semibold mb-4">{co2Celebration.message} 🎉</p>
            <div className="bg-green-50 rounded-2xl p-4 mb-4 border border-green-200">
              <p className="text-sm text-green-700 font-medium mb-1">That's equivalent to:</p>
              <p className="text-green-800 font-semibold">
                {getCO2Equivalent(co2Celebration.co2Saved)}
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              By choosing {co2Celebration.productName}, you're helping reduce electronic waste and carbon emissions!
            </p>
            
            <button
              onClick={() => setCo2Celebration({ show: false, co2Saved: 0, productName: '', message: '' })}
              className="mt-6 bg-gradient-to-r from-gray-800 to-black text-white py-2 px-6 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              Go Back
            </button>
            
            <div className="mt-4 flex justify-center space-x-2">
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

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg'
                  : 'bg-white/95 text-green-700 border border-green-200 hover:bg-green-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>{category}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Available Products */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center mr-3">
              <Package className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-800">Available Products</h2>
          </div>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-green-400" />
              </div>
              <p className="text-green-700 text-lg font-medium">No products available in this category</p>
              <p className="text-green-600 text-sm mt-2">Check back later for new eco-friendly items!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOrder={handleOrder} />
              ))}
            </div>
          )}
        </div>

        {/* Sold Out Products */}
        {filteredSoldOutProducts.length > 0 && (
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-3">
                <Package className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-red-600">Sold Out Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSoldOutProducts.map((product) => (
                <SoldOutProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard: React.FC<{ product: Product; onOrder: (product: Product) => void }> = ({ product, onOrder }) => {
  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-green-300/50 overflow-hidden hover:shadow-2xl hover:border-green-400/70 transform hover:-translate-y-2 transition-all duration-300">
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
            {product.category}
          </span>
          <span className="text-sm text-green-600 font-medium">
            {product.quantity} available
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-green-800 mb-2">{product.name}</h3>
        <p className="text-green-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center text-sm text-green-500 mb-4">
          <User className="w-4 h-4 mr-1" />
          <span>Sold by {product.sellerName}</span>
        </div>
        
        <div className="bg-green-50 rounded-2xl p-4 mb-4 border border-green-200">
          <h4 className="text-sm font-semibold text-green-700 mb-2">Eco Impact</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Leaf className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-green-600">E-waste saved</span>
              </div>
              <span className="text-sm font-semibold text-green-800">
                {formatWeight(product.ecoImpact.eWasteSaved)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-green-600">CO₂ saved</span>
              </div>
              <span className="text-sm font-semibold text-green-800">
                {formatCO2(product.ecoImpact.co2Saved)}
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onOrder(product)}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 px-4 rounded-2xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

// Sold Out Product Card Component
const SoldOutProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-gray-100/95 backdrop-blur-lg rounded-3xl shadow-lg border border-gray-300 overflow-hidden opacity-75">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover grayscale"
        />
        <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
          <span className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold text-lg">
            SOLD OUT
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full">
            {product.category}
          </span>
          <span className="text-sm text-red-600 font-medium">
            0 available
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-600 mb-2">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <User className="w-4 h-4 mr-1" />
          <span>Sold by {product.sellerName}</span>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Eco Impact</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Leaf className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-500">E-waste saved</span>
              </div>
              <span className="text-sm font-semibold text-gray-600">
                {formatWeight(product.ecoImpact.eWasteSaved)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-500">CO₂ saved</span>
              </div>
              <span className="text-sm font-semibold text-gray-600">
                {formatCO2(product.ecoImpact.co2Saved)}
              </span>
            </div>
          </div>
        </div>
        
        <button
          disabled
          className="w-full bg-gray-400 text-white py-3 px-4 rounded-2xl font-semibold cursor-not-allowed"
        >
          Sold Out
        </button>
      </div>
    </div>
  );
};

export default BuyItems;