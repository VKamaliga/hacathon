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

export const getCO2Equivalent = (co2Grams: number): string => {
  const examples = [
    // Small amounts (under 1kg)
    { threshold: 100, examples: [
      "charging your phone for 2 weeks",
      "boiling water for 20 cups of tea",
      "running an LED bulb for 3 days straight"
    ]},
    { threshold: 500, examples: [
      "driving a car for 2 kilometers",
      "charging a laptop for 2 months",
      "powering a refrigerator for 6 hours"
    ]},
    { threshold: 1000, examples: [
      "driving a car for 4 kilometers",
      "heating your home for 2 hours",
      "running a washing machine 3 times"
    ]},
    // Medium amounts (1-5kg)
    { threshold: 2000, examples: [
      "driving a car for 8 kilometers",
      "powering your home for half a day",
      "running an air conditioner for 4 hours"
    ]},
    { threshold: 5000, examples: [
      "driving a car for 20 kilometers",
      "powering your home for a full day",
      "taking a short domestic flight"
    ]},
    // Large amounts (5kg+)
    { threshold: 10000, examples: [
      "driving a car for 40 kilometers",
      "powering your home for 2 days",
      "manufacturing 50 plastic bottles"
    ]},
    { threshold: 20000, examples: [
      "driving a car for 80 kilometers",
      "powering your home for 4 days",
      "producing 10kg of beef"
    ]},
    { threshold: Infinity, examples: [
      "driving a car for 150+ kilometers",
      "powering your home for a week",
      "taking a medium-haul flight"
    ]}
  ];

  // Find the appropriate threshold
  const category = examples.find(cat => co2Grams <= cat.threshold);
  if (!category) return "making a significant environmental impact";

  // Return a random example from the category
  const randomExample = category.examples[Math.floor(Math.random() * category.examples.length)];
  return randomExample;
};