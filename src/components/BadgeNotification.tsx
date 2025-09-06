import React from 'react';
import { Badge } from '../types';
import { Trophy, X, Sparkles } from 'lucide-react';

interface BadgeNotificationProps {
  badge: Badge | null;
  onClose: () => void;
}

const BadgeNotification: React.FC<BadgeNotificationProps> = ({ badge, onClose }) => {
  if (!badge) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center transform shadow-2xl border border-gray-200 animate-[bounce_0.6s_ease-in-out_1,_fadeIn_0.3s_ease-in-out_0.6s_both]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center animate-pulse">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-spin">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <div className="text-6xl mb-4 animate-bounce">
          {badge.icon}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Badge Earned!
        </h2>
        <h3 className="text-xl font-semibold text-green-600 mb-4">
          {badge.name}
        </h3>
        <p className="text-gray-600 mb-6">
          {badge.description}
        </p>
        
        <div className="bg-green-50 rounded-2xl p-4 mb-6 border border-green-200">
          <p className="text-sm text-green-700 font-medium">
            🎉 Congratulations on your achievement!
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 px-8 rounded-2xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          Awesome!
        </button>
        
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default BadgeNotification;