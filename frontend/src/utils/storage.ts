export type Guard<T> = (value: unknown) => value is T;

export const readStorage = <T>(key: string, fallback: T, isValid: Guard<T>): T => {
  try {
    const raw = window.localStorage.getItem(key);

    if (raw === null) {
      return fallback;
    }

    const parsed: unknown = JSON.parse(raw);

    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export const writeStorage = <T>(key: string, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
};
