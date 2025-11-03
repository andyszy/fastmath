import { useState, useEffect, useRef } from 'react';
import { Play } from './Icons';

export const GameSession = ({ 
  onAnswer, 
  problemDisplay, 
  currentProblem, 
  colorScheme = 'purple' 
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const answerInputRef = useRef(null);

  const colors = {
    purple: { input: 'border-purple-300 focus:border-purple-500', button: 'bg-purple-600 hover:bg-purple-700' },
    cyan: { input: 'border-cyan-300 focus:border-cyan-500', button: 'bg-cyan-600 hover:bg-cyan-700' },
    indigo: { input: 'border-indigo-300 focus:border-indigo-500', button: 'bg-indigo-600 hover:bg-indigo-700' },
  };

  const color = colors[colorScheme] || colors.purple;

  useEffect(() => {
    if (currentProblem && !feedback && answerInputRef.current) {
      answerInputRef.current.focus();
    }
  }, [currentProblem, feedback]);

  const checkAnswer = () => {
    if (userAnswer === '') return;
    const result = onAnswer(parseInt(userAnswer));
    setFeedback(result.feedback);
    
    setTimeout(() => {
      if (result.moveToNext) {
        setUserAnswer('');
        setFeedback('');
      }
    }, result.isCorrect ? 800 : 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !feedback) {
      checkAnswer();
    }
  };

  return (
    <div className="space-y-6">
      {currentProblem && (
        <div className={`bg-gradient-to-br from-${colorScheme}-50 to-blue-50 rounded-xl p-8 text-center`}>
          <div className="text-5xl font-bold text-gray-800 mb-6">
            {problemDisplay}
          </div>

          <input
            ref={answerInputRef}
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`text-3xl font-bold text-center border-4 ${color.input} rounded-lg p-4 w-48 mx-auto block focus:outline-none`}
            placeholder="?"
            autoFocus
            disabled={feedback !== ''}
          />

          <button
            onClick={checkAnswer}
            disabled={userAnswer === '' || feedback !== ''}
            className={`mt-6 ${color.button} disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors`}
          >
            Check Answer
          </button>

          {feedback && (
            <div className={`mt-6 text-xl font-bold whitespace-pre-line ${
              feedback.startsWith('✓') ? 'text-green-600' : 'text-orange-600'
            }`}>
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

