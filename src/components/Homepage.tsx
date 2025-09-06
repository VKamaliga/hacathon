import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Package, LogOut, User, Trophy } from 'lucide-react';
import Dashboard from './Dashboard';
import BadgeSystem from './BadgeSystem';
import BadgeNotification from './BadgeNotification';
import { getBadgeDefinitions } from '../utils/badgeUtils';

interface HomepageProps {
  onNavigate: (page: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onNavigate }) => {
  const { user, signOut, orderCount, co2Saved, eWasteItemsSaved, newBadgeEarned, clearNewBadge } = useAuth();
  
  const badges = getBadgeDefinitions(orderCount, co2Saved, eWasteItemsSaved);
  const newBadge = newBadgeEarned ? badges.find(b => b.id === newBadgeEarned) : null;
  const earnedBadgesCount = badges.filter(b => b.earned).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      {/* Badge Notification */}
      <BadgeNotification badge={newBadge} onClose={clearNewBadge} />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800">EcoFinds</h1>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-green-700">Welcome back, {user?.name}</p>
                {earnedBadgesCount > 0 && (
                  <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                    <Trophy className="w-3 h-3 text-yellow-600" />
                    <span className="text-xs font-semibold text-yellow-700">{earnedBadgesCount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
            <button
              onClick={signOut}
              className="p-2 text-green-600 hover:text-green-800 hover:bg-white/50 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard */}
        <Dashboard />

        {/* Badge System */}
        <BadgeSystem badges={badges} />

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => onNavigate('sell')}
            className="group bg-white/95 backdrop-blur-lg rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Package className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">Sell an Item</h3>
              <p className="text-green-700">List your electronics and make a positive environmental impact</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('buy')}
            className="group bg-white/95 backdrop-blur-lg rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">Buy an Item</h3>
              <p className="text-green-700">Find quality pre-owned electronics at great prices</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;