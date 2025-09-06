import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf, Zap, Award, IndianRupee } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { orderCount, eWasteSaved, co2Saved, totalSpent } = useAuth();

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
      label: 'Total Price',
      value: `₹${totalSpent.toLocaleString()}`,
      icon: IndianRupee,
      color: 'from-green-600 to-emerald-700',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      labelColor: 'text-green-600',
    },
    {
      label: 'E-waste Diverted',
      value: formatWeight(eWasteSaved),
      icon: Leaf,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-gradient-to-br from-green-600 to-emerald-700',
      labelColor: 'text-white',
    },
    {
      label: 'CO₂ Equivalent Saved',
      value: formatCO2(co2Saved),
      icon: Zap,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      labelColor: 'text-green-600',
    },
    {
      label: 'Orders Placed',
      value: orderCount.toString(),
      icon: Award,
      color: 'from-green-600 to-emerald-700',
      bgColor: 'bg-gradient-to-br from-emerald-600 to-green-700',
      labelColor: 'text-white',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className={`${stat.bgColor} rounded-2xl p-6 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className={`text-2xl font-bold mb-1 ${stat.labelColor === 'text-white' ? 'text-white' : 'text-green-800'}`}>{stat.value}</p>
              <p className={`text-sm font-medium ${stat.labelColor}`}>{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;