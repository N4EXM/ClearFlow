import React from 'react';

const CircularProgressBar = ({ progress, size = 100, strokeWidth = 10 }) => {
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (size - strokeWidth) / 2;
  // Arc length at 100% coverage is the circle circumference
  const circumference = radius * 2 * Math.PI;
  // Arc length at the current progress
  const strokeDashoffset = circumference - progress / 100 * circumference;

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#0f172a"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="#0f172a"
          stroke="#34d399"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap=""
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {/* Optional percentage text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: size * 0.25,
        fontWeight: 'bold',
        color: '#ffffff'
      }}>
        {progress}%
      </div>
    </div>
  );
};

export default CircularProgressBar;