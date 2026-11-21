import { Priority, Task } from '../../types/task';

export interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export interface PriorityBadgeProps {
  priority: Priority;
}
