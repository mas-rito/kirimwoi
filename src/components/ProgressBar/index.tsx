import React from "react"

interface ProgressBarProps {
  progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="my-4 w-full rounded-full bg-gray-200">
      <div
        className="rounded-full bg-primary p-0.5 text-center text-xs font-medium leading-none text-blue-100"
        style={{ width: `${progress}%` }}
      >
        {progress.toFixed(2)}%
      </div>
    </div>
  )
}

export default ProgressBar
