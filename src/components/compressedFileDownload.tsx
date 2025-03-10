import React from 'react';

type Props = { progress: number };

const ProgressBar: React.FC<Props> = ({ progress }) => (
  <div className="progress-container">
    <progress value={progress} max="100" />
    <p>Uploading... {progress}%</p>
  </div>
);

export default ProgressBar;
