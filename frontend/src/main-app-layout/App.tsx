import { useCallback, useState } from 'react';
import { AppHeader } from '../components/header/AppHeader';
import { Button } from '../components/common/Button';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Modal } from '../components/common/Modal';
import { Notice } from '../components/common/Notice';
import { StateMessage } from '../components/common/StateMessage';
import { TaskForm } from '../components/task-form/TaskForm';
import { TaskList } from '../components/task-list/TaskList';
import { TaskSkeleton } from '../components/task-list/TaskSkeleton';
import { TaskToolbar } from '../components/task-filter/TaskToolbar';
import { useNotice } from '../hooks/useNotice';
import { useTasks } from '../hooks/useTasks';
import { useTaskView } from '../hooks/useTaskView';
import { Task, TaskDraft } from '../types/task';
import { getErrorMessage } from '../utils/errors';
import { FormState } from './types';
import { getFormConfig } from './utils';
import '../styles/layout.css';

export const App = () => {
  const { tasks, isLoading, loadError, loadTasks, addTask, editTask, toggleTask, deleteTask } =
    useTasks();
  const view = useTaskView(tasks);
  const { notice, showNotice, dismissNotice } = useNotice();

  const [formState, setFormState] = useState<FormState>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [createdCount, setCreatedCount] = useState(0);

  const openCreateForm = useCallback(() => setFormState({ mode: 'create' }), []);
  const openEditForm = useCallback((task: Task) => setFormState({ mode: 'edit', task }), []);
  const closeForm = useCallback(() => setFormState(null), []);
  const closeDeleteDialog = useCallback(() => setTaskToDelete(null), []);

  const handleToggle = useCallback(
    async (task: Task) => {
      try {
        await toggleTask(task.id);
      } catch (error) {
        showNotice('error', getErrorMessage(error));
      }
    },
    [toggleTask, showNotice],
  );

  const handleSubmit = async (draft: TaskDraft) => {
    if (formState?.mode === 'edit') {
      await editTask(formState.task.id, draft);
      showNotice('success', 'Task updated');
    } else {
      await addTask(draft);
      setCreatedCount((count) => count + 1);
      showNotice('success', 'Task added');
    }
    closeForm();
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      await deleteTask(taskToDelete.id);
      showNotice('success', 'Task deleted');
    } catch (error) {
      showNotice('error', getErrorMessage(error));
    }
    closeDeleteDialog();
  };

  const formConfig = formState && getFormConfig(formState);

  const renderBoard = () => {
    if (isLoading) {
      return <TaskSkeleton />;
    }

    if (loadError) {
      return (
        <StateMessage
          tone="error"
          title="Couldn't load your tasks"
          text={loadError}
          action={<Button onClick={loadTasks}>Try again</Button>}
        />
      );
    }

    return (
      <TaskList
        key={`${view.viewKey}|${createdCount}`}
        tasks={view.visibleTasks}
        hasAnyTasks={tasks.length > 0}
        onToggle={handleToggle}
        onEdit={openEditForm}
        onDelete={setTaskToDelete}
        onCreate={openCreateForm}
      />
    );
  };

  return (
    <div className="app">
      <main className="app__container">
        <AppHeader pendingCount={view.counts.pending} onCreate={openCreateForm} />

        <TaskToolbar
          status={view.status}
          counts={view.counts}
          query={view.query}
          sort={view.sort}
          onStatusChange={view.setStatus}
          onQueryChange={view.setQuery}
          onSortChange={view.setSort}
        />

        <section className="app__board">{renderBoard()}</section>
      </main>

      <Notice notice={notice} onDismiss={dismissNotice} />

      {formConfig && (
        <Modal title={formConfig.title} onClose={closeForm}>
          <TaskForm
            initialDraft={formConfig.initialDraft}
            submitLabel={formConfig.submitLabel}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        </Modal>
      )}

      {taskToDelete && (
        <ConfirmDialog
          title="Delete task?"
          message={
            <>
              <strong>{taskToDelete.title}</strong> will be removed permanently.
            </>
          }
          confirmLabel="Delete"
          busyLabel="Deleting…"
          onConfirm={handleConfirmDelete}
          onCancel={closeDeleteDialog}
        />
      )}
    </div>
  );
};
