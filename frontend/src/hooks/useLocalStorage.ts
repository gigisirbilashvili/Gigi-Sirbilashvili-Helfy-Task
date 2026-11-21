import { useEffect, useState } from 'react';
import { Guard, readStorage, writeStorage } from '../utils/storage';

export const useLocalStorage = <T>(key: string, fallback: T, isValid: Guard<T>) => {
  const [value, setValue] = useState<T>(() => readStorage(key, fallback, isValid));

  useEffect(() => {
    writeStorage(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};
