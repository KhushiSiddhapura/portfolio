export const Loader = ({ text = 'Loading...', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 gap-3 text-center ${className}`}>
      <div
        className={`${sizeMap[size]} border-[var(--primary-border)] border-t-[var(--primary)] rounded-full animate-spin`}
      />
      {text && <p className="text-xs text-[var(--text-muted)] font-medium">{text}</p>}
    </div>
  );
};

export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-[var(--surface-alt)] rounded-lg ${className}`} />
);

export default Loader;

