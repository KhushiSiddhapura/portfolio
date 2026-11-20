import React from 'react';

/**
 * CurvedDivider - Visible, long organic curve with colorful accent ribbon
 */
export const CurvedDivider = ({
  fill = 'var(--surface)',
  accentColor = '#7C3AED',
  inverted = false,
  className = '',
  height = '56px',
}) => {
  const id = React.useId().replace(/:/g, '');

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="relative block w-full h-full"
      >
        <defs>
          <linearGradient id={`cd-accent-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {inverted ? (
          <>
            <path
              d="M0,90 C340,10 780,105 1440,5 L1440,120 L0,120 Z"
              fill={`url(#cd-accent-${id})`}
            />
            <path
              d="M0,105 C380,25 820,115 1440,25 L1440,120 L0,120 Z"
              fill={fill}
            />
          </>
        ) : (
          <>
            <path
              d="M0,15 C440,115 920,5 1440,85 L1440,120 L0,120 Z"
              fill={`url(#cd-accent-${id})`}
            />
            <path
              d="M0,35 C460,125 940,25 1440,100 L1440,120 L0,120 Z"
              fill={fill}
            />
          </>
        )}
      </svg>
    </div>
  );
};

export default CurvedDivider;
