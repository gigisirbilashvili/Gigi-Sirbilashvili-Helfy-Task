import { useCallback, useEffect, useState } from 'react';

export type NoticeType = 'success' | 'error';

export interface Notice {
  id: number;
  type: NoticeType;
  text: string;
}

export const useNotice = (duration = 4000) => {
  const [notice, setNotice] = useState<Notice | null>(null);

  const showNotice = useCallback((type: NoticeType, text: string) => {
    setNotice({ id: Date.now(), type, text });
  }, []);

  const dismissNotice = useCallback(() => setNotice(null), []);

  useEffect(() => {
    if (!notice) return undefined;

    const timer = window.setTimeout(dismissNotice, duration);

    return () => window.clearTimeout(timer);
  }, [notice, duration, dismissNotice]);

  return { notice, showNotice, dismissNotice };
};
