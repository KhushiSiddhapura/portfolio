import React from 'react';

/**
 * WaveTop - Smooth wave transitioning into a section from above
 */
export const WaveTop = ({
  fill = 'var(--surface)',
  className = '',
  height = '48px',
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-full"
      >
        <path
          d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default WaveTop;
