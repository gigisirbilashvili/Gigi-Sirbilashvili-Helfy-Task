import { useState } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';
import { ConfirmDialogProps } from './types';

export const ConfirmDialog = ({
  title,
  message,
  confirmLabel,
  busyLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const [isBusy, setIsBusy] = useState(false);

  const handleConfirm = async () => {
    setIsBusy(true);
    try {
      await onConfirm();
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Modal title={title} onClose={onCancel}>
      <p className="modal__message">{message}</p>
      <div className="modal__actions">
        <Button onClick={onCancel} disabled={isBusy}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm} disabled={isBusy} autoFocus>
          {isBusy ? busyLabel : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};
