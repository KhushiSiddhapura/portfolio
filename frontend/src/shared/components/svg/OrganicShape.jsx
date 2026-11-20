import React from 'react';

/**
 * OrganicShape - Decorative subtle floating background blob for visual identity
 */
export const OrganicShape = ({
  className = '',
  size = 320,
  opacity = 0.08,
}) => {
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, opacity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          fill="var(--primary)"
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90.1,-16.3,87.7,-1.4C85.3,13.5,77.9,27,69.5,39.6C61.1,52.2,51.8,63.9,39.6,71.1C27.4,78.3,13.7,81,0.2,80.6C-13.3,80.3,-26.6,76.9,-39.3,70.1C-52,63.4,-64.1,53.3,-72.4,40.4C-80.8,27.5,-85.4,11.8,-84.9,-3.9C-84.4,-19.6,-78.8,-35.3,-69.5,-47.9C-60.2,-60.5,-47.2,-70,-33.4,-77.3C-19.6,-84.6,-5,-89.7,7.2,-87.3C19.4,-84.9,30.6,-83.6,44.7,-76.4Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
};

export default OrganicShape;
