import { useEffect, useState, Dispatch, SetStateAction } from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const localStorageValue = window.localStorage.getItem(key);
    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}