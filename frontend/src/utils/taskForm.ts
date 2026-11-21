import { RegisterOptions } from 'react-hook-form';
import { DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH } from '../constants/task';
import { Task, TaskDraft } from '../types/task';

type DraftRules = { [K in keyof TaskDraft]?: RegisterOptions<TaskDraft, K> };

export const draftRules: DraftRules = {
  title: {
    validate: (value) => value.trim().length > 0 || 'Give the task a title',
    maxLength: {
      value: TITLE_MAX_LENGTH,
      message: `Keep the title under ${TITLE_MAX_LENGTH} characters`,
    },
  },
  description: {
    maxLength: {
      value: DESCRIPTION_MAX_LENGTH,
      message: `Keep the description under ${DESCRIPTION_MAX_LENGTH} characters`,
    },
  },
};

export const normalizeDraft = (draft: TaskDraft): TaskDraft => ({
  ...draft,
  title: draft.title.trim(),
  description: draft.description.trim(),
});

export const draftFromTask = ({ title, description, priority }: Task): TaskDraft => ({
  title,
  description,
  priority,
});

export const formatCharCount = (value: string, max: number): string => `${value.length}/${max}`;
