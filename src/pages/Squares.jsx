import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, BarChart3 } from '../components/Icons';
import { ProgressCard } from '../components/ProgressCard';
import { RewardBanner } from '../components/RewardBanner';
import { GameSession } from '../components/GameSession';
import { useProgress } from '../hooks/useProgress';
import { getAverageResponseTime, calculateTotalRewards, generateWeightedProblem } from '../utils/helpers';

export const Squares = () => {
  const [activeTab, setActiveTab] = useState('play');
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [problemStartTime, setProblemStartTime] = useState(null);

  const { progress, updateProgress, resetProgress } = useProgress('squaresProgress', 12, 1);

  const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const rewardPerCategory = 0.50;

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
  }, [gameActive, timeLeft]);

  const generateProblem = (num) => {
    const squared = num * num;
    const isSquare = Math.random() < 0.5;

    if (isSquare) {
      return {
        number: num,
        type: 'square',
        questionText: `${num}²`,
        answer: squared,
      };
    } else {
      return {
        number: num,
        type: 'root',
        questionText: squared,
        answer: num,
      };
    }
  };

  const startGame = () => {
    setGameActive(true);
    setTimeLeft(300);
    setCurrentProblem(generateWeightedProblem(progress, categories, generateProblem));
    setProblemStartTime(Date.now());
  };

  const endGame = () => {
    setGameActive(false);
    setCurrentProblem(null);
  };

  const handleAnswer = (userAnswer) => {
    const isCorrect = userAnswer === currentProblem.answer;
    const category = currentProblem.number;
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
      const wrongQuestion = currentProblem.type === 'square' 
        ? currentProblem.questionText 
        : `√${currentProblem.questionText}`;
      feedbackText = `✗ Not quite. ${wrongQuestion} = ${currentProblem.answer}\n🥶 Reset streak to 0`;
    }

    const moveToNext = gameActive;
    if (moveToNext) {
      setTimeout(() => {
        setCurrentProblem(generateWeightedProblem(progress, categories, generateProblem));
        setProblemStartTime(Date.now());
      }, isCorrect ? 800 : 2000);
    }

    return { isCorrect, feedback: feedbackText, moveToNext };
  };

  const totalRewards = calculateTotalRewards(progress, categories, rewardPerCategory);

  const problemDisplay = currentProblem ? (
    currentProblem.type === 'square' ? (
      <>{currentProblem.questionText} = ?</>
    ) : (
      <>
        <span className="sqrt">
          <span className="sqrt-symbol">√</span>
          <span className="sqrt-radicand">{currentProblem.questionText}</span>
        </span>
        {' = ?'}
      </>
    )
  ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">²√</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Squares Master</h1>
                <p className="text-sm text-gray-600">1² through 12² and square roots</p>
              </div>
            </div>
            <Link to="/" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors">
              ← Back to Menu
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-4">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('play')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-colors ${
                activeTab === 'play' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Play size={20} />
              Practice
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-colors ${
                activeTab === 'progress' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'
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
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to practice?</h2>
                  <p className="text-gray-600 mb-2">You'll practice both squares and square roots.</p>
                  <p className="text-gray-600 mb-6">Master all 12 categories to earn $6.00 in rewards!</p>
                  <button
                    onClick={startGame}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors inline-flex items-center gap-2"
                  >
                    <Play size={24} />
                    Start Practice
                  </button>
                </div>
              ) : (
                <>
                  <GameSession
                    onAnswer={handleAnswer}
                    problemDisplay={problemDisplay}
                    currentProblem={currentProblem}
                    colorScheme="purple"
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
                categoryCount={12} 
                rewardPerCategory={rewardPerCategory} 
              />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map(num => {
                  const categoryProgress = progress[num];
                  const avgTime = getAverageResponseTime(categoryProgress);

                  return (
                    <ProgressCard
                      key={num}
                      title={`${num}'s`}
                      streak={categoryProgress.streak || 0}
                      hasTrophy={categoryProgress.hasTrophy}
                      correct={categoryProgress.correct}
                      total={categoryProgress.total}
                      avgTime={avgTime}
                      rewardAmount={rewardPerCategory}
                      colorScheme="purple"
                    />
                  );
                })}
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                <p>Get 🔥10 correct in a row to earn $0.50 and a permanent trophy! 🏆</p>
                <p className="mt-2">Each category has 2 problems: n² and √(n²)</p>
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

        <div className="mt-4 text-center text-sm text-gray-500">
          <a href="https://github.com/andyszy/fastmath" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

