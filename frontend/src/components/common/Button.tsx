import { classNames } from '../../utils/classNames';
import { ButtonProps, IconButtonProps } from './types';
import '../../styles/button.css';

export const Button = ({
  variant = 'secondary',
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) => (
  <button type={type} className={classNames('button', `button--${variant}`, className)} {...rest} />
);

export const IconButton = ({
  label,
  className = '',
  variant = 'ghost',
  ...rest
}: IconButtonProps) => (
  <Button
    variant={variant}
    className={classNames('icon-button', className)}
    aria-label={label}
    title={label}
    {...rest}
  />
);
