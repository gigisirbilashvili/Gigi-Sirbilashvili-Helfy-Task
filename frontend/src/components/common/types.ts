import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Notice } from '../../hooks/useNotice';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export interface IconButtonProps extends ButtonProps {
  label: string;
}

export interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export interface ConfirmDialogProps {
  title: string;
  message: ReactNode;
  confirmLabel: string;
  busyLabel: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}

export interface NoticeProps {
  notice: Notice | null;
  onDismiss: () => void;
}

export interface StateMessageProps {
  title: string;
  text?: string;
  action?: ReactNode;
  tone?: 'neutral' | 'error';
}
