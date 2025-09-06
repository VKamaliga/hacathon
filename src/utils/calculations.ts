export const calculateEcoImpact = (weight: number) => {
  return {
    eWasteSaved: weight,
    co2Saved: Math.round(weight * 6), // Simple formula: 6g CO₂ per gram of e-waste
  };
};

export const formatWeight = (grams: number): string => {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(1)}kg`;
  }
  return `${grams}g`;
};

export const formatCO2 = (grams: number): string => {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(1)}kg CO₂`;
  }
  return `${grams}g CO₂`;
};