import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'danger'
  size = 'md', // 'sm', 'md', 'lg'
  type = 'button',
  disabled = false,
  loading = false,
  icon: Icon,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-2.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] focus:ring-[var(--primary)] shadow-sm active:translate-y-0.5',
    secondary:
      'bg-[var(--surface-alt)] text-[var(--primary)] hover:bg-[var(--primary-soft)] border border-[var(--primary-border)] focus:ring-[var(--primary)]',
    outline:
      'bg-transparent text-[var(--text)] border border-[var(--border-strong)] hover:bg-[var(--surface)] hover:border-[var(--primary)] focus:ring-[var(--primary)]',
    ghost:
      'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)] focus:ring-[var(--border)]',
    danger:
      'bg-[var(--danger)] text-white hover:opacity-90 focus:ring-[var(--danger)] shadow-sm',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
