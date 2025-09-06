import React from 'react';
import { Badge } from '../types';
import { formatProgress } from '../utils/badgeUtils';
import { Award, Star, Trophy } from 'lucide-react';

interface BadgeSystemProps {
  badges: Badge[];
}

const BadgeSystem: React.FC<BadgeSystemProps> = ({ badges }) => {
  const earnedBadges = badges.filter(badge => badge.earned);
  const unearnedBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border border-green-300/50 p-6 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-3">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-800">My Achievements</h2>
          <p className="text-green-600 text-sm">
            {earnedBadges.length} of {badges.length} badges earned
          </p>
        </div>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Earned Badges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </div>
      )}

      {/* Unearned Badges with Progress */}
      {unearnedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Next Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {unearnedBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => {
  const progressPercentage = badge.maxProgress 
    ? Math.min((badge.progress || 0) / badge.maxProgress * 100, 100)
    : 0;

  return (
    <div className={`rounded-2xl p-6 border-2 transition-all duration-300 ${
      badge.earned
        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg hover:shadow-xl'
        : 'bg-gray-50 border-gray-200 opacity-75'
    }`}>
      <div className="text-center">
        <div className={`text-4xl mb-3 ${badge.earned ? 'animate-bounce' : 'grayscale'}`}>
          {badge.icon}
        </div>
        <h4 className={`text-lg font-bold mb-2 ${
          badge.earned ? 'text-green-800' : 'text-gray-500'
        }`}>
          {badge.name}
        </h4>
        <p className={`text-sm mb-4 ${
          badge.earned ? 'text-green-600' : 'text-gray-400'
        }`}>
          {badge.description}
        </p>
        
        {badge.earned ? (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
            ✓ Earned!
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-600">
              {getProgressText(badge)}
            </div>
            <div className="text-xs text-gray-500 italic">
              {badge.requirement}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getProgressText = (badge: Badge): string => {
  if (!badge.progress || !badge.maxProgress) return '';
  
  switch (badge.id) {
    case 'greenStarter':
      return formatProgress(badge.progress, badge.maxProgress, 'orders');
    case 'ecoSaver':
      return formatProgress(badge.progress, badge.maxProgress, 'co2');
    case 'wasteWarrior':
      return formatProgress(badge.progress, badge.maxProgress, 'items');
    default:
      return `${badge.progress}/${badge.maxProgress}`;
  }
};

export default BadgeSystem;