export const getAverageResponseTime = (categoryProgress) => {
  if (!categoryProgress || !categoryProgress.responseTimes || categoryProgress.responseTimes.length === 0) {
    return null;
  }
  const sum = categoryProgress.responseTimes.reduce((acc, time) => acc + time, 0);
  return sum / categoryProgress.responseTimes.length;
};

export const calculateTotalRewards = (progress, categories, rewardAmount) => {
  let total = 0;
  categories.forEach(category => {
    if (progress[category] && progress[category].hasTrophy) {
      total += rewardAmount;
    }
  });
  return total;
};

export const getSuperscript = (n) => {
  const superscripts = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  return String(n).split('').map(d => superscripts[parseInt(d)]).join('');
};

export const generateWeightedProblem = (progress, categories, problemGenerator) => {
  const weights = [];
  
  categories.forEach(category => {
    const currentStreak = progress[category].streak || 0;
    const hasTrophy = progress[category].hasTrophy;
    const weight = hasTrophy ? 5 : (10 - currentStreak) + 20;
    weights.push({ category, weight });
  });

  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
  let random = Math.random() * totalWeight;
  let selectedCategory = categories[0];

  for (const w of weights) {
    random -= w.weight;
    if (random <= 0) {
      selectedCategory = w.category;
      break;
    }
  }

  return problemGenerator(selectedCategory);
};

