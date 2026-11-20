import React from 'react';

export const Input = React.forwardRef(
  ({ label, error, helperText, icon: Icon, className = '', id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(2, 9);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] text-sm px-3.5 py-2.5 transition-colors focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] disabled:opacity-50 disabled:bg-[var(--surface-alt)] ${
              Icon ? 'pl-9' : ''
            } ${error ? 'border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-[var(--danger)]">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-xs text-[var(--text-muted)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
