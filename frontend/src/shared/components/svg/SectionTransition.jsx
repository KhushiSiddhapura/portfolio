import React from 'react';

/**
 * SectionTransition - Responsive asymmetric curved boundary between sections
 */
export const SectionTransition = ({
  fill = 'var(--background)',
  flip = false,
  className = '',
  height = '50px',
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      style={{
        height,
        transform: flip ? 'scaleX(-1)' : 'none',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full h-full"
      >
        <path
          d="M0,32L60,42.7C120,53,240,75,360,69.3C480,64,600,32,720,26.7C840,21,960,43,1080,53.3C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default SectionTransition;
