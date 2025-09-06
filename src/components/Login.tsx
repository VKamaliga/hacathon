import React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Recycle, Leaf, Globe } from 'lucide-react';

const Login: React.FC = () => {
  const { signIn, signUp, loading, authError } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      await signUp(formData.email, formData.password, formData.name);
    } else {
      await signIn(formData.email, formData.password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-emerald-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center border border-gray-200">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center">
                <Recycle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Leaf className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-green-800 mb-2">EcoFinds</h1>
          <p className="text-green-700 mb-8">Sustainable Second-Hand Marketplace</p>
          
          {authError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-xl">
              <p className="text-red-700 text-sm">{authError}</p>
            </div>
          )}
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <Globe className="w-4 h-4" />
              <span className="text-sm">EcoFinds, eco-friendly you.</span>
            </div>
            
            {isSignUp && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left">
                <h4 className="font-semibold text-green-800 mb-2">Sign Up Guidelines:</h4>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>• Use a valid email address</li>
                  <li>• Choose a secure password</li>
                  <li>• Your credentials will be saved securely</li>
                  <li>• Use the same credentials to sign in later</li>
                </ul>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-4 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            )}
            
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-4 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (isSignUp ? 'Creating Account...' : 'Signing In...') : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>
          
          <div className="mt-6">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-green-700 hover:text-green-900 text-sm font-medium"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
          
          <p className="text-xs text-green-600 mt-6">
            Sustainability starts with simple actions: reuse, recycle, and rethink consumption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;