import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progressPercentage = total > 0 ? ((current+1) / total) * 100 : 0;
  const currentQuestionNumber = Math.min(current + 1, total);

  return (
    <div className="w-full mb-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {total > 0 && (
        <p className="text-right text-sm text-gray-600 mt-1">
          {currentQuestionNumber}/{total}
        </p>
      )}
    </div>
  );
};

export default ProgressBar; 