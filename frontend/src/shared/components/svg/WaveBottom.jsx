import React from 'react';

/**
 * WaveBottom - Smooth wave boundary transitioning out of a section to the next
 */
export const WaveBottom = ({
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
          d="M0,0 L1200,0 L1200,40 C1050,110 800,20 650,75 C500,-10 250,95 0,35 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default WaveBottom;

