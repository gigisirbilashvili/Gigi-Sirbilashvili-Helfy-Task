import { draftFromTask } from '../utils/taskForm';
import { FormState } from './types';

export const getFormConfig = (formState: NonNullable<FormState>) =>
  formState.mode === 'edit'
    ? {
        title: 'Edit task',
        submitLabel: 'Save changes',
        initialDraft: draftFromTask(formState.task),
      }
    : { title: 'New task', submitLabel: 'Add task', initialDraft: undefined };
