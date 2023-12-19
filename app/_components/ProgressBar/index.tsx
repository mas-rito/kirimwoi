import React from "react";
interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full my-4">
      <div
        className="bg-primary text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${progress}%` }}
      >
        {progress.toFixed(2)}%
      </div>
    </div>
  );
};

export default ProgressBar;
