import { Button } from '../common/Button';
import { Carousel } from '../carousel/Carousel';
import { StateMessage } from '../common/StateMessage';
import { TaskItem } from '../task-item/TaskItem';
import { TaskListProps } from './types';

export const TaskList = ({
  tasks,
  hasAnyTasks,
  onToggle,
  onEdit,
  onDelete,
  onCreate,
}: TaskListProps) => {
  if (tasks.length === 0) {
    return hasAnyTasks ? (
      <StateMessage title="Nothing matches" text="Try another filter or search term." />
    ) : (
      <StateMessage
        title="No tasks yet"
        text="Your list is empty. Add the first thing you want to get done."
        action={
          <Button variant="primary" onClick={onCreate}>
            Add a task
          </Button>
        }
      />
    );
  }

  return (
    <Carousel
      items={tasks}
      label="Tasks"
      getKey={(task) => task.id}
      renderItem={(task) => (
        <TaskItem task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      )}
    />
  );
};
