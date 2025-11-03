import { useState, useEffect } from 'react';

export const useProgress = (storageKey, categoryCount, startIndex = 0) => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      return JSON.parse(saved);
    }
    
    const initial = {};
    for (let i = startIndex; i < startIndex + categoryCount; i++) {
      initial[i] = {
        correct: 0,
        total: 0,
        streak: 0,
        hasTrophy: false,
        lastPracticed: null,
        responseTimes: [],
      };
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      const initial = {};
      for (let i = startIndex; i < startIndex + categoryCount; i++) {
        initial[i] = {
          correct: 0,
          total: 0,
          streak: 0,
          hasTrophy: false,
          lastPracticed: null,
          responseTimes: [],
        };
      }
      setProgress(initial);
      localStorage.setItem(storageKey, JSON.stringify(initial));
    }
  };

  const updateProgress = (category, isCorrect, responseTime) => {
    setProgress(prev => {
      const updated = { ...prev };
      const categoryProgress = { ...updated[category] };

      if (!categoryProgress.responseTimes) {
        categoryProgress.responseTimes = [];
      }
      if (categoryProgress.streak === undefined) {
        categoryProgress.streak = 0;
      }

      categoryProgress.total += 1;
      
      if (isCorrect) {
        categoryProgress.correct += 1;
        
        if (!categoryProgress.hasTrophy) {
          categoryProgress.streak += 1;
          
          if (categoryProgress.streak >= 10) {
            categoryProgress.hasTrophy = true;
          }
        }

        if (responseTime !== null) {
          categoryProgress.responseTimes.push(responseTime);
        }
      } else {
        if (!categoryProgress.hasTrophy) {
          categoryProgress.streak = 0;
        }
      }

      categoryProgress.lastPracticed = new Date().toISOString();
      updated[category] = categoryProgress;

      return updated;
    });
  };

  return { progress, setProgress, updateProgress, resetProgress };
};

