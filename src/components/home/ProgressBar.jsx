import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-BG rounded-full h-2.5">
      <div 
        className="bg-Pr h-2 rounded-full" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;