import React from 'react';

/**
 * VisibleLongWave - A high-visibility, long curved wave divider with rich, multi-layered visible colors
 */
export const VisibleLongWave = ({
  fill = 'var(--surface)',
  accentColor = '#7C3AED',
  secondaryColor = '#A78BFA',
  tertiaryColor = '#C4B5FD',
  inverted = false,
  className = '',
  height = '72px',
}) => {
  const id = React.useId().replace(/:/g, '');

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      style={{
        height,
        transform: inverted ? 'scaleY(-1)' : 'none',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="block w-full h-full"
      >
        <defs>
          <linearGradient id={`grad-primary-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.85" />
            <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id={`grad-accent-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.45" />
            <stop offset="100%" stopColor={tertiaryColor} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Layer 1: Long flowing background curve in soft accent color */}
        <path
          d="M0,45 C280,115 540,-10 820,55 C1100,120 1280,30 1440,70 L1440,160 L0,160 Z"
          fill={`url(#grad-accent-${id})`}
        />

        {/* Layer 2: Long prominent visible curve in vibrant brand color */}
        <path
          d="M0,75 C240,15 480,125 760,60 C1040,-5 1260,95 1440,40 L1440,160 L0,160 Z"
          fill={`url(#grad-primary-${id})`}
          opacity="0.85"
        />

        {/* Layer 3: Solid base fill matching target surface with sleek curve boundary */}
        <path
          d="M0,105 C320,50 620,135 960,80 C1200,45 1360,110 1440,95 L1440,160 L0,160 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default VisibleLongWave;
