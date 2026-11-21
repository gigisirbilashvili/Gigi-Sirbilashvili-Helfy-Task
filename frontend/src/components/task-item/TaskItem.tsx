import { CheckIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { memo } from 'react';
import { formatCreatedAt } from '../../utils/date';
import { IconButton } from '../common/Button';
import { PriorityBadge } from './PriorityBadge';
import { TaskItemProps } from './types';
import { getTaskCardClass } from './utils';
import '../../styles/task-item.css';

const TaskItemComponent = ({ task, onToggle, onEdit, onDelete }: TaskItemProps) => (
  <article className={getTaskCardClass(task)}>
    <div className="task-card__meta">
      <PriorityBadge priority={task.priority} />
      <time className="task-card__date" dateTime={task.createdAt}>
        {formatCreatedAt(task.createdAt)}
      </time>
    </div>

    <h3 className="task-card__title">{task.title}</h3>

    {task.description ? (
      <p className="task-card__description">{task.description}</p>
    ) : (
      <p className="task-card__description task-card__description--empty">No description</p>
    )}

    <div className="task-card__footer">
      <button
        type="button"
        className="task-card__toggle"
        aria-pressed={task.completed}
        onClick={() => onToggle(task)}
      >
        <span className="task-card__checkbox">
          <CheckIcon />
        </span>
        {task.completed ? 'Completed' : 'Mark as done'}
      </button>

      <div className="task-card__tools">
        <IconButton label={`Edit "${task.title}"`} onClick={() => onEdit(task)}>
          <PencilIcon />
        </IconButton>
        <IconButton
          label={`Delete "${task.title}"`}
          className="icon-button--danger"
          onClick={() => onDelete(task)}
        >
          <TrashIcon />
        </IconButton>
      </div>
    </div>
  </article>
);

export const TaskItem = memo(TaskItemComponent);
