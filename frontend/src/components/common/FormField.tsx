import { classNames } from '../../utils/classNames';
import { FormFieldProps } from './types';

export const FormField = ({ label, htmlFor, error, hint, children }: FormFieldProps) => (
  <div className={classNames('form-field', error && 'form-field--invalid')}>
    <div className="form-field__top">
      <label className="form-field__label" htmlFor={htmlFor}>
        {label}
      </label>
      {hint && <span className="form-field__hint">{hint}</span>}
    </div>
    {children}
    {error && (
      <p className="form-field__error" role="alert">
        {error}
      </p>
    )}
  </div>
);
