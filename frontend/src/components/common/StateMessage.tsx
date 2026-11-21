import { StateMessageProps } from './types';
import '../../styles/states.css';

export const StateMessage = ({ title, text, action, tone = 'neutral' }: StateMessageProps) => (
  <div
    className={`state-message state-message--${tone}`}
    role={tone === 'error' ? 'alert' : undefined}
  >
    <h2 className="state-message__title">{title}</h2>
    {text && <p className="state-message__text">{text}</p>}
    {action}
  </div>
);
