import { useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T | null, (v: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setItem = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  return [storedValue, setItem];
};
