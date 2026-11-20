import React from 'react';

export const Select = React.forwardRef(
  ({ label, options = [], error, helperText, className = '', id, ...props }, ref) => {
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
        <select
          id={inputId}
          ref={ref}
          className={`w-full rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] text-sm px-3.5 py-2.5 transition-colors focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] disabled:opacity-50 ${
            error ? 'border-[var(--danger)] focus:border-[var(--danger)]' : ''
          } ${className}`}
          {...props}
        >
          {options.map((opt) => {
            const value = typeof opt === 'object' ? opt.value : opt;
            const text = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={value} value={value} className="bg-[var(--card)] text-[var(--text)]">
                {text}
              </option>
            );
          })}
        </select>
        {error && <p className="mt-1 text-xs text-[var(--danger)]">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-xs text-[var(--text-muted)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
