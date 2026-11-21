import { XIcon } from 'lucide-react';
import { NoticeProps } from './types';
import '../../styles/notice.css';

export const Notice = ({ notice, onDismiss }: NoticeProps) => {
  if (!notice) return null;

  return (
    <div
      key={notice.id}
      className={`notice notice--${notice.type}`}
      role={notice.type === 'error' ? 'alert' : 'status'}
    >
      <span>{notice.text}</span>
      <button
        type="button"
        className="notice__close"
        aria-label="Dismiss message"
        onClick={onDismiss}
      >
        <XIcon />
      </button>
    </div>
  );
};
