import { Priority, TaskDraft } from '../../types/task';

export interface TaskFormProps {
  initialDraft?: TaskDraft;
  submitLabel: string;
  onSubmit: (draft: TaskDraft) => Promise<void>;
  onCancel: () => void;
}

export interface PriorityPickerProps {
  value: Priority;
  onChange: (priority: Priority) => void;
}
