import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className={`relative p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-alt)] border border-[var(--border)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 animate-in fade-in zoom-in duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--primary)] animate-in fade-in zoom-in duration-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
