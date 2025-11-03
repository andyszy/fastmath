import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, BarChart3, Zap } from '../components/Icons';
import { ProgressCard } from '../components/ProgressCard';
import { RewardBanner } from '../components/RewardBanner';
import { GameSession } from '../components/GameSession';
import { useProgress } from '../hooks/useProgress';
import { getAverageResponseTime, calculateTotalRewards, generateWeightedProblem } from '../utils/helpers';

const DIFFICULTY_LEVELS = {
  easy: { tables: [2, 3, 4, 5, 10], reward: 0.50, color: 'green' },
  medium: { tables: [6, 7, 8, 9], reward: 1.00, color: 'orange' },
  hard: { tables: [11, 12], reward: 2.00, color: 'red' },
};

export const Multiplication = () => {
  const [activeTab, setActiveTab] = useState('play');
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [problemStartTime, setProblemStartTime] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const [showParentMode, setShowParentMode] = useState(false);
  const [parentPasscode, setParentPasscode] = useState('');
  const [parentModeUnlocked, setParentModeUnlocked] = useState(false);

  const { progress, updateProgress, resetProgress, setProgress } = useProgress('multiplicationProgress', 11, 2);

  const allCategories = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
  }, [gameActive, timeLeft]);

  const generateProblem = (selectedTable) => {
    const categoriesToUse = selectedCategories.length > 0 ? selectedCategories : allCategories;
    
    let multiplier;
    if (Math.random() < 0.5) {
      multiplier = Math.floor(Math.random() * (selectedTable - 1)) + 2;
    } else {
      const largerCategories = categoriesToUse.filter(c => c >= selectedTable);
      if (largerCategories.length > 0) {
        multiplier = largerCategories[Math.floor(Math.random() * largerCategories.length)];
      } else {
        multiplier = Math.floor(Math.random() * (selectedTable - 1)) + 2;
      }
    }

    return {
      table: selectedTable,
      multiplier,
      answer: selectedTable * multiplier,
    };
  };

  const startGame = () => {
    setGameActive(true);
    setTimeLeft(300);
    const categoriesToUse = selectedCategories.length > 0 ? selectedCategories : allCategories;
    setCurrentProblem(generateWeightedProblem(progress, categoriesToUse, generateProblem));
    setProblemStartTime(Date.now());
  };

  const endGame = () => {
    setGameActive(false);
    setCurrentProblem(null);
  };

  const handleAnswer = (userAnswer) => {
    const isCorrect = userAnswer === currentProblem.answer;
    const category = Math.max(currentProblem.table, currentProblem.multiplier);
    const responseTime = problemStartTime ? (Date.now() - problemStartTime) / 1000 : null;

    const currentStreak = progress[category].streak || 0;
    const hasTrophy = progress[category].hasTrophy;
    
    let newStreakValue = 0;
    let earnedTrophy = false;
    
    if (isCorrect) {
      if (!hasTrophy) {
        newStreakValue = currentStreak + 1;
        earnedTrophy = newStreakValue >= 10;
      } else {
        newStreakValue = 10;
        earnedTrophy = true;
      }
    }

    updateProgress(category, isCorrect, responseTime);

    let feedbackText;
    if (isCorrect) {
      const streakEmoji = earnedTrophy ? '🏆' : '🔥';
      const streakText = earnedTrophy ? `${streakEmoji}${newStreakValue} in a row!` : `${streakEmoji}${newStreakValue} in a row`;
      feedbackText = `✓ Correct! ${streakText}`;
    } else {
      feedbackText = `✗ Not quite. ${currentProblem.table} × ${currentProblem.multiplier} = ${currentProblem.answer}\n🥶 Reset streak to 0`;
    }

    const moveToNext = gameActive;
    if (moveToNext) {
      const categoriesToUse = selectedCategories.length > 0 ? selectedCategories : allCategories;
      setTimeout(() => {
        setCurrentProblem(generateWeightedProblem(progress, categoriesToUse, generateProblem));
        setProblemStartTime(Date.now());
      }, isCorrect ? 800 : 2000);
    }

    return { isCorrect, feedback: feedbackText, moveToNext };
  };

  const toggleCategory = (table) => {
    setSelectedCategories(prev => {
      if (prev.includes(table)) {
        return prev.filter(t => t !== table);
      } else {
        return [...prev, table].sort((a, b) => a - b);
      }
    });
  };

  const selectAllCategories = () => setSelectedCategories(allCategories);
  const deselectAllCategories = () => setSelectedCategories([]);

  const selectDifficulty = (difficulty) => {
    const tables = DIFFICULTY_LEVELS[difficulty].tables;
    setSelectedCategories(prev => {
      const combined = [...new Set([...prev, ...tables])];
      return combined.sort((a, b) => a - b);
    });
  };

  const deselectDifficulty = (difficulty) => {
    const tables = DIFFICULTY_LEVELS[difficulty].tables;
    setSelectedCategories(prev => prev.filter(t => !tables.includes(t)));
  };

  const getRewardAmount = (table) => {
    for (const [_, level] of Object.entries(DIFFICULTY_LEVELS)) {
      if (level.tables.includes(table)) {
        return level.reward;
      }
    }
    return 0;
  };

  const totalRewards = allCategories.reduce((total, table) => {
    if (progress[table] && progress[table].hasTrophy) {
      return total + getRewardAmount(table);
    }
    return total;
  }, 0);

  const toggleTrophy = (table) => {
    setProgress(prev => {
      const updated = { ...prev };
      updated[table] = {
        ...updated[table],
        hasTrophy: !updated[table].hasTrophy,
        streak: !updated[table].hasTrophy ? 10 : updated[table].streak
      };
      return updated;
    });
  };

  const problemDisplay = currentProblem ? (
    <>{currentProblem.table} × {currentProblem.multiplier} = ?</>
  ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Zap className="text-yellow-500" size={32} />
              <h1 className="text-3xl font-bold text-gray-800">Multiplication Master</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowParentMode(true)}
                className="text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                👤 Parent Mode
              </button>
              <Link to="/" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors">
                ← Back to Menu
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-4">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('play')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-colors ${
                activeTab === 'play' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Play size={20} />
              Play
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-colors ${
                activeTab === 'progress' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart3 size={20} />
              Progress
              <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-bold">
                ${totalRewards.toFixed(2)}
              </span>
            </button>
          </div>

          {activeTab === 'play' && (
            <div className="p-8">
              {!gameActive ? (
                <div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to practice?</h2>
                    <p className="text-gray-600 mb-2">You'll have 5 minutes to solve as many problems as you can.</p>
                    <p className="text-gray-600 mb-4">Select which multiplication tables you want to practice:</p>
                  </div>

                  <div className="max-w-3xl mx-auto mb-6">
                    <div className="flex justify-center gap-2 mb-6">
                      <button onClick={selectAllCategories} className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded transition-colors">
                        Select All
                      </button>
                      <button onClick={deselectAllCategories} className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded transition-colors">
                        Deselect All
                      </button>
                    </div>

                    {Object.entries(DIFFICULTY_LEVELS).map(([difficulty, config]) => (
                      <div key={difficulty} className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className={`text-lg font-bold text-${config.color}-700 capitalize`}>{difficulty}</h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => selectDifficulty(difficulty)}
                              className={`text-xs bg-${config.color}-100 hover:bg-${config.color}-200 text-${config.color}-700 font-semibold py-1 px-2 rounded transition-colors`}
                            >
                              Select
                            </button>
                            <button
                              onClick={() => deselectDifficulty(difficulty)}
                              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-1 px-2 rounded transition-colors"
                            >
                              Deselect
                            </button>
                          </div>
                        </div>
                        <div className={`grid ${difficulty === 'easy' ? 'grid-cols-3 md:grid-cols-5' : difficulty === 'medium' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2'} gap-3`}>
                          {config.tables.map(table => (
                            <label
                              key={table}
                              className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                selectedCategories.includes(table)
                                  ? `border-${config.color}-500 bg-${config.color}-50`
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(table)}
                                onChange={() => toggleCategory(table)}
                                className={`w-4 h-4 text-${config.color}-600 rounded focus:ring-${config.color}-500`}
                              />
                              <span className="font-bold text-gray-800">{table}'s</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <button
                      onClick={startGame}
                      disabled={selectedCategories.length === 0}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors inline-flex items-center gap-2"
                    >
                      <Play size={24} />
                      Start Session
                    </button>
                    {selectedCategories.length === 0 && (
                      <p className="mt-3 text-orange-600 text-sm font-semibold">
                        Please select at least one category
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <GameSession
                    onAnswer={handleAnswer}
                    problemDisplay={problemDisplay}
                    currentProblem={currentProblem}
                    colorScheme="indigo"
                  />
                  <button
                    onClick={endGame}
                    className="text-gray-600 hover:text-gray-800 underline block mx-auto mt-4"
                  >
                    End session early
                  </button>
                </>
              )}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Mastery</h2>
              
              <RewardBanner 
                totalRewards={totalRewards} 
                categoryCount={11} 
                rewardPerCategory={0} 
              />

              {Object.entries(DIFFICULTY_LEVELS).map(([difficulty, config]) => (
                <div key={difficulty} className="mb-8">
                  <h3 className={`text-xl font-bold text-${config.color}-700 mb-4 capitalize`}>{difficulty}</h3>
                  <div className={`grid ${difficulty === 'easy' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5' : difficulty === 'medium' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2'} gap-4`}>
                    {config.tables.map(table => {
                      const categoryProgress = progress[table];
                      const avgTime = getAverageResponseTime(categoryProgress);

                      return (
                        <ProgressCard
                          key={table}
                          title={`${table}'s`}
                          streak={categoryProgress.streak || 0}
                          hasTrophy={categoryProgress.hasTrophy}
                          correct={categoryProgress.correct}
                          total={categoryProgress.total}
                          avgTime={avgTime}
                          rewardAmount={config.reward}
                          colorScheme={config.color}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="mt-8 text-center text-sm text-gray-500">
                <p>Get 🔥10 correct in a row to earn rewards and a permanent trophy! 🏆</p>
                <p className="mt-2">Easy: $0.50 • Medium: $1.00 • Hard: $2.00</p>
                <p className="mt-2 text-xs">Wrong answer resets streak to 0, but trophies are permanent!</p>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={resetProgress}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Reset All Progress
                </button>
              </div>
            </div>
          )}
        </div>

        {showParentMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">👤 Parent Mode</h2>
                  <button
                    onClick={() => {
                      setShowParentMode(false);
                      setParentPasscode('');
                      setParentModeUnlocked(false);
                    }}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                {!parentModeUnlocked ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Enter passcode to access parent mode</p>
                    <input
                      type="password"
                      value={parentPasscode}
                      onChange={(e) => setParentPasscode(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const correctPasscode = import.meta.env.VITE_PARENT_PASSCODE || '0000';
                          if (parentPasscode === correctPasscode) {
                            setParentModeUnlocked(true);
                          } else {
                            alert('Incorrect passcode');
                            setParentPasscode('');
                          }
                        }
                      }}
                      className="text-2xl text-center border-2 border-gray-300 rounded-lg p-3 w-48 mx-auto block focus:outline-none focus:border-purple-500 mb-4"
                      placeholder="••••"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        const correctPasscode = import.meta.env.VITE_PARENT_PASSCODE || '0000';
                        if (parentPasscode === correctPasscode) {
                          setParentModeUnlocked(true);
                        } else {
                          alert('Incorrect passcode');
                          setParentPasscode('');
                        }
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                      Unlock
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4 text-center">Click on any category to manually award or remove trophy</p>
                    
                    {Object.entries(DIFFICULTY_LEVELS).map(([difficulty, config]) => (
                      <div key={difficulty} className="mb-6">
                        <h3 className={`text-lg font-bold text-${config.color}-700 mb-3 capitalize`}>{difficulty} (${config.reward.toFixed(2)} each)</h3>
                        <div className={`grid ${difficulty === 'easy' ? 'grid-cols-3 md:grid-cols-5' : difficulty === 'medium' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2'} gap-3`}>
                          {config.tables.map(table => {
                            const hasTrophy = progress[table].hasTrophy;
                            return (
                              <button
                                key={table}
                                onClick={() => toggleTrophy(table)}
                                className={`relative border-2 rounded-lg p-3 transition-all ${
                                  hasTrophy ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 bg-white hover:border-' + config.color + '-400'
                                }`}
                              >
                                <div className="text-center">
                                  <div className="text-xl font-bold text-gray-800">{table}'s</div>
                                  {hasTrophy && <div className="text-2xl mt-1">🏆</div>}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 text-center">
                      <div className="text-sm font-semibold text-gray-600">Total Rewards</div>
                      <div className="text-3xl font-bold text-green-700">
                        ${totalRewards.toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-center text-sm text-gray-500">
          <a href="https://github.com/andyszy/fastmath" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

