import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone. Are you sure you wish to proceed?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="text-sm text-[var(--text-secondary)] mt-0.5 leading-relaxed">
          {message}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          variant={confirmVariant}
          size="sm"
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
