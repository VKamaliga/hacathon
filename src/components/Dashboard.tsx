import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf, Zap, Award } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { orderCount, eWasteSaved, co2Saved } = useAuth();

  const formatWeight = (grams: number): string => {
    if (grams >= 1000) {
      return `${(grams / 1000).toFixed(1)}kg`;
    }
    return `${grams}g`;
  };

  const formatCO2 = (grams: number): string => {
    if (grams >= 1000) {
      return `${(grams / 1000).toFixed(1)}kg CO₂`;
    }
    return `${grams}g CO₂`;
  };

  const stats = [
    {
      label: 'E-waste Diverted',
      value: formatWeight(eWasteSaved),
      icon: Leaf,
      color: 'from-green-600 to-emerald-700',
      bgColor: 'bg-green-50',
    },
    {
      label: 'CO₂ Equivalent Saved',
      value: formatCO2(co2Saved),
      icon: Zap,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Orders Placed',
      value: orderCount.toString(),
      icon: Award,
      color: 'from-green-700 to-emerald-800',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className={`${stat.bgColor} rounded-2xl p-6 border border-green-200`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-800 mb-1">{stat.value}</p>
              <p className="text-sm text-green-700">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;