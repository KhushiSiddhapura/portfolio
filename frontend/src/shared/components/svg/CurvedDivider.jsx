import React from 'react';

/**
 * CurvedDivider - Gentle organic curve between sections
 */
export const CurvedDivider = ({
  fill = 'var(--surface)',
  inverted = false,
  className = '',
  height = '40px',
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
        {inverted ? (
          <path
            d="M0,120 C300,20 800,100 1200,0 L1200,120 Z"
            fill={fill}
          />
        ) : (
          <path
            d="M0,0 C400,100 800,0 1200,80 L1200,120 L0,120 Z"
            fill={fill}
          />
        )}
      </svg>
    </div>
  );
};

export default CurvedDivider;

