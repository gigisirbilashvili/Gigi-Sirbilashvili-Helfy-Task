import { PRIORITY_OPTIONS } from '../../constants/task';
import { PriorityPickerProps } from './types';

export const PriorityPicker = ({ value, onChange }: PriorityPickerProps) => (
  <div className="priority-picker" role="radiogroup" aria-label="Priority">
    {PRIORITY_OPTIONS.map((option) => (
      <label
        key={option.value}
        className={`priority-picker__option priority-picker__option--${option.value}`}
      >
        <input
          type="radio"
          name="priority"
          value={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
        />
        <span>{option.label}</span>
      </label>
    ))}
  </div>
);
