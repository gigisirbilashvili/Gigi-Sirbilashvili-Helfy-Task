import { Task } from '../../types/task';

export interface TaskListProps {
  tasks: Task[];
  hasAnyTasks: boolean;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onCreate: () => void;
}
