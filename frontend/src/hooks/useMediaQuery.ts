import { useCallback, useSyncExternalStore } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches);
};

export const useSlidesPerView = (): number => {
  const isWide = useMediaQuery('(min-width: 1100px)');

  const isMedium = useMediaQuery('(min-width: 720px)');

  if (isWide) {
    return 3;
  }

  if (isMedium) {
    return 2;
  }

  return 1;
};
