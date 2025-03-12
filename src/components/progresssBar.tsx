import React from 'react';

type Props = { 
  progress: number;
  label?: string;
};

const ProgressBar: React.FC<Props> = ({ progress, label = "Processing" }) => {
  // Ensure progress stays within 0-100 range
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className="progress-container">
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${normalizedProgress}%` }}
        ></div>
      </div>
      <div className="progress-info">
        <span>{label}...</span>
        <span className="progress-percentage">{normalizedProgress.toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;