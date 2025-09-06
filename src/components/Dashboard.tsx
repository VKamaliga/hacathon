import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf, Zap, Award } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { orderCount } = useAuth();

  // Mock data for demo
  const stats = [
    {
      label: 'E-waste Diverted',
      value: '2.5kg',
      icon: Leaf,
      color: 'from-gray-700 to-gray-900',
      bgColor: 'bg-gray-50',
    },
    {
      label: 'CO₂ Equivalent Saved',
      value: '15kg CO₂',
      icon: Zap,
      color: 'from-gray-600 to-gray-800',
      bgColor: 'bg-gray-100',
    },
    {
      label: 'Orders Placed',
      value: orderCount.toString(),
      icon: Award,
      color: 'from-gray-800 to-black',
      bgColor: 'bg-gray-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className={`${stat.bgColor} rounded-2xl p-6 border border-gray-200`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;