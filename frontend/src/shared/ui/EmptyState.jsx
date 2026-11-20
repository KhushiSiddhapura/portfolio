import React from 'react';
import { FolderOpen } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = 'No items found',
  description = 'There are no items to display at this time.',
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-[var(--surface-alt)] text-[var(--primary)] flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-[var(--text)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--text-muted)] max-w-sm mb-5">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

