import { useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DESCRIPTION_MAX_LENGTH, EMPTY_DRAFT, TITLE_MAX_LENGTH } from '../../constants/task';
import { TaskDraft } from '../../types/task';
import { getErrorMessage } from '../../utils/errors';
import { draftRules, formatCharCount, normalizeDraft } from '../../utils/taskForm';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import { PriorityPicker } from './PriorityPicker';
import { TaskFormProps } from './types';
import '../../styles/task-form.css';

export const TaskForm = ({
  initialDraft = EMPTY_DRAFT,
  submitLabel,
  onSubmit,
  onCancel,
}: TaskFormProps) => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TaskDraft>({ defaultValues: initialDraft });
  const fieldId = useId();

  const submit = async (draft: TaskDraft) => {
    try {
      await onSubmit(normalizeDraft(draft));
    } catch (error) {
      setError('root.server', { message: getErrorMessage(error) });
    }
  };

  const titleId = `${fieldId}-title`;
  const descriptionId = `${fieldId}-description`;
  const submitError = errors.root?.server?.message;

  return (
    <form className="task-form" onSubmit={handleSubmit(submit)} noValidate>
      <FormField
        label="Title"
        htmlFor={titleId}
        error={errors.title?.message}
        hint={formatCharCount(watch('title'), TITLE_MAX_LENGTH)}
      >
        <input
          id={titleId}
          className="input"
          maxLength={TITLE_MAX_LENGTH}
          placeholder="What needs to be done?"
          autoFocus
          {...register('title', draftRules.title)}
        />
      </FormField>

      <FormField
        label="Description"
        htmlFor={descriptionId}
        error={errors.description?.message}
        hint={formatCharCount(watch('description'), DESCRIPTION_MAX_LENGTH)}
      >
        <textarea
          id={descriptionId}
          className="input input--textarea"
          maxLength={DESCRIPTION_MAX_LENGTH}
          rows={4}
          placeholder="Optional details"
          {...register('description', draftRules.description)}
        />
      </FormField>

      <FormField label="Priority">
        <Controller
          name="priority"
          control={control}
          render={({ field }) => <PriorityPicker value={field.value} onChange={field.onChange} />}
        />
      </FormField>

      {submitError && (
        <p className="task-form__error" role="alert">
          {submitError}
        </p>
      )}

      <div className="modal__actions">
        <Button onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  );
};
