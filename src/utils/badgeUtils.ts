import { Badge, BADGE_REQUIREMENTS, ELECTRONICS_CATEGORIES } from '../types';

export const getBadgeDefinitions = (
  orderCount: number,
  co2Saved: number,
  eWasteItemsSaved: number
): Badge[] => {
  return [
    {
      id: 'greenStarter',
      name: 'Green Starter',
      icon: '🌱',
      description: 'Welcome to the eco-friendly community!',
      requirement: 'Complete your first order',
      earned: orderCount >= BADGE_REQUIREMENTS.greenStarter.orders,
      progress: Math.min(orderCount, BADGE_REQUIREMENTS.greenStarter.orders),
      maxProgress: BADGE_REQUIREMENTS.greenStarter.orders,
    },
    {
      id: 'ecoSaver',
      name: 'Eco Saver',
      icon: '🌍',
      description: "You've saved 50+ kg of CO₂! Great job!",
      requirement: 'Save 50kg+ of CO₂ through purchases',
      earned: co2Saved >= BADGE_REQUIREMENTS.ecoSaver.co2Saved,
      progress: Math.min(co2Saved, BADGE_REQUIREMENTS.ecoSaver.co2Saved),
      maxProgress: BADGE_REQUIREMENTS.ecoSaver.co2Saved,
    },
    {
      id: 'wasteWarrior',
      name: 'Waste Warrior',
      icon: '♻️',
      description: 'Champion of electronic waste reduction!',
      requirement: 'Help reduce 10+ electronic items from waste',
      earned: eWasteItemsSaved >= BADGE_REQUIREMENTS.wasteWarrior.eWasteItems,
      progress: Math.min(eWasteItemsSaved, BADGE_REQUIREMENTS.wasteWarrior.eWasteItems),
      maxProgress: BADGE_REQUIREMENTS.wasteWarrior.eWasteItems,
    },
  ];
};

export const checkBadgeEligibility = (
  orderCount: number,
  co2Saved: number,
  eWasteItemsSaved: number
) => {
  return {
    greenStarter: orderCount >= BADGE_REQUIREMENTS.greenStarter.orders,
    ecoSaver: co2Saved >= BADGE_REQUIREMENTS.ecoSaver.co2Saved,
    wasteWarrior: eWasteItemsSaved >= BADGE_REQUIREMENTS.wasteWarrior.eWasteItems,
  };
};

export const isElectronicsCategory = (category: string): boolean => {
  return ELECTRONICS_CATEGORIES.includes(category);
};

export const formatProgress = (current: number, max: number, type: 'orders' | 'co2' | 'items'): string => {
  switch (type) {
    case 'orders':
      return `${current}/${max} orders`;
    case 'co2':
      const currentKg = (current / 1000).toFixed(1);
      const maxKg = (max / 1000).toFixed(1);
      return `${currentKg}/${maxKg} kg CO₂`;
    case 'items':
      return `${current}/${max} items`;
    default:
      return `${current}/${max}`;
  }
};