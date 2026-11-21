import { XIcon } from 'lucide-react';
import { MouseEvent, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { IconButton } from './Button';
import { ModalProps } from './types';
import '../../styles/modal.css';

export const Modal = ({ title, onClose, children }: ModalProps) => {
  const titleId = useId();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('no-scroll');

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('no-scroll');
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div className="modal-backdrop" onMouseDown={handleBackdropClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="modal__header">
          <h2 id={titleId} className="modal__title">
            {title}
          </h2>
          <IconButton label="Close" onClick={onClose}>
            <XIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};
