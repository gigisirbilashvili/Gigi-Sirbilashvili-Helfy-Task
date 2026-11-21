import { PlusIcon } from 'lucide-react';
import { formatToday } from '../../utils/date';
import { Button } from '../common/Button';
import { AppHeaderProps } from './types';
import { describePending } from './utils';

export const AppHeader = ({ pendingCount, onCreate }: AppHeaderProps) => (
  <header className="app-header">
    <div>
      <p className="app-header__date">{formatToday()}</p>
      <h1 className="app-header__title">My tasks</h1>
      <p className="app-header__summary">{describePending(pendingCount)}</p>
    </div>
    <Button variant="primary" onClick={onCreate}>
      <PlusIcon />
      New task
    </Button>
  </header>
);
