import React, { useState } from 'react';
import { CATEGORY_WEIGHTS } from '../types';
import { calculateEcoImpact } from '../utils/calculations';
import { ArrowLeft, Upload, Package, CheckCircle } from 'lucide-react';

interface SellItemProps {
  onBack: () => void;
}

const SellItem: React.FC<SellItemProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Laptop' as keyof typeof CATEGORY_WEIGHTS,
    description: '',
    weight: CATEGORY_WEIGHTS.Laptop,
    quantity: 1,
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (category: keyof typeof CATEGORY_WEIGHTS) => {
    setFormData({
      ...formData,
      category,
      weight: CATEGORY_WEIGHTS[category],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    
    // Save product to localStorage
    const savedProducts = localStorage.getItem('products');
    const products = savedProducts ? JSON.parse(savedProducts) : [];
    
    const newProduct = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      description: formData.description,
      image: imagePreview,
      weight: formData.weight,
      quantity: formData.quantity,
      ecoImpact: {
        eWasteSaved: formData.weight,
        co2Saved: formData.weight * 6,
      },
      sellerId: '1', // Current user ID
      sellerName: 'Current User', // Would be actual user name
      timestamp: new Date(),
    };
    
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-green-200">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Product Listed Successfully!</h2>
            <p className="text-green-700 mb-8">Your item is now available in the marketplace</p>
            <button
              onClick={onBack}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all duration-200 mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Sell an Item</h1>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-green-300/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(CATEGORY_WEIGHTS).map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category as keyof typeof CATEGORY_WEIGHTS)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      formData.category === category
                        ? 'border-gray-800 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Package className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">{category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="e.g., MacBook Pro 13-inch"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Describe the condition, specifications, and any relevant details..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6">
                {imagePreview ? (
                  <div className="text-center">
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl mx-auto mb-4" />
                    <button
                      type="button"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <button
                      type="button"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="text-gray-700 hover:text-gray-900 font-medium"
                    >
                      Upload Image
                    </button>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Approximate Weight (grams)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                min="1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Default: {CATEGORY_WEIGHTS[formData.category]}g for {formData.category}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Listing Product...' : 'List Product'}
            </button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SellItem;