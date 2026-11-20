import React from 'react';

/**
 * WaveTop - Visible multi-layer long curved wave transition from above
 */
export const WaveTop = ({
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
          <linearGradient id={`wt-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.75" />
            <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.85" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Visible colored backdrop wave */}
        <path
          d="M0,80 C280,20 620,125 940,45 C1220,-25 1360,60 1440,50 L1440,140 L0,140 Z"
          fill={`url(#wt-grad-${id})`}
        />

        {/* Foreground wave */}
        <path
          d="M0,95 C340,35 700,120 1060,60 C1260,25 1380,80 1440,75 L1440,140 L0,140 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default WaveTop;
