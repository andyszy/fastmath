import { Trophy } from './Icons';

export const ProgressCard = ({ 
  title, 
  subtitle, 
  streak, 
  hasTrophy, 
  correct, 
  total, 
  avgTime, 
  rewardAmount,
  colorScheme = 'purple' 
}) => {
  const colors = {
    purple: {
      border: hasTrophy ? 'border-yellow-400' : 'border-purple-200',
      bg: hasTrophy ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' : 'bg-purple-50',
      hover: hasTrophy ? '' : 'hover:border-purple-300',
    },
    cyan: {
      border: hasTrophy ? 'border-yellow-400' : 'border-cyan-200',
      bg: hasTrophy ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' : 'bg-cyan-50',
      hover: hasTrophy ? '' : 'hover:border-cyan-300',
    },
    green: {
      border: hasTrophy ? 'border-yellow-400' : 'border-green-200',
      bg: hasTrophy ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' : 'bg-green-50',
      hover: hasTrophy ? '' : 'hover:border-green-300',
    },
    orange: {
      border: hasTrophy ? 'border-yellow-400' : 'border-orange-200',
      bg: hasTrophy ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' : 'bg-orange-50',
      hover: hasTrophy ? '' : 'hover:border-orange-300',
    },
    red: {
      border: hasTrophy ? 'border-yellow-400' : 'border-red-200',
      bg: hasTrophy ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' : 'bg-red-50',
      hover: hasTrophy ? '' : 'hover:border-red-300',
    }
  };

  const color = colors[colorScheme];

  return (
    <div className={`relative border-2 rounded-xl p-4 transition-all ${color.border} ${color.bg} ${color.hover}`}>
      {hasTrophy && (
        <div className="absolute -top-3 -right-3">
          <Trophy className="text-yellow-500" size={32} weight="fill" />
        </div>
      )}

      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800 mb-1">
          {title}
        </div>
        {subtitle && (
          <div className="text-xs text-gray-600 mb-2">
            {subtitle}
          </div>
        )}

        <div className="my-3">
          <div className="w-full max-w-[140px] mx-auto h-3 bg-gray-300 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${(streak / 10) * 100}%` }}
            />
          </div>
          <div className="text-base font-semibold text-gray-700">
            {hasTrophy ? '🏆' : '🔥'} {streak}/10
          </div>
        </div>

        {total > 0 && (
          <div className="text-xs text-gray-600 mt-1">
            ✓ {correct}/{total}
            {avgTime !== null && `, ⏱ ${avgTime.toFixed(1)}s`}
          </div>
        )}

        <div className={`mt-2 text-sm font-bold ${
          hasTrophy ? 'text-green-700' : 'text-gray-500'
        }`}>
          {hasTrophy ? '✓ ' : ''}${rewardAmount.toFixed(2)} {hasTrophy ? 'earned!' : 'reward'}
        </div>
      </div>
    </div>
  );
};

