import React from 'react';

/**
 * WaveBottom - Visible multi-layer long curved wave transition
 */
export const WaveBottom = ({
  fill = 'var(--surface)',
  accentColor = '#7C3AED',
  secondaryColor = '#A78BFA',
  className = '',
  height = '64px',
}) => {
  const id = React.useId().replace(/:/g, '');

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        className="relative block w-full h-full"
      >
        <defs>
          <linearGradient id={`wb-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.75" />
            <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.85" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Visible colored backdrop wave */}
        <path
          d="M0,20 C320,95 640,-15 960,65 C1200,120 1340,35 1440,55 L1440,140 L0,140 Z"
          fill={`url(#wb-grad-${id})`}
        />

        {/* Foreground transition wave */}
        <path
          d="M0,50 C360,110 720,25 1080,85 C1240,115 1380,75 1440,70 L1440,140 L0,140 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default WaveBottom;
