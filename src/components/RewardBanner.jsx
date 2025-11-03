export const RewardBanner = ({ totalRewards, categoryCount, rewardPerCategory }) => {
  return (
    <div className="bg-gradient-to-r from-green-100 to-yellow-100 border-2 border-yellow-400 rounded-xl p-6 mb-6">
      <div className="text-center">
        <div className="text-sm font-semibold text-gray-600 mb-1">Total Rewards Earned</div>
        <div className="text-4xl font-bold text-green-700">
          ${totalRewards.toFixed(2)}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          ${rewardPerCategory.toFixed(2)} per mastered category • {categoryCount} categories total
        </div>
      </div>
    </div>
  );
};

