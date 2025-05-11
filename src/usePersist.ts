import { useCallback } from "react";

type FormData = Record<string, any>;
type SaveFormArg = FormData | ((prev: FormData) => FormData);

export function usePersist() {
  const saveForm = useCallback((formName: string, data: SaveFormArg) => {
    const key = `react-persist:${formName}`;
    const prevDataRaw = localStorage.getItem(key);
    const prevData: FormData = prevDataRaw ? JSON.parse(prevDataRaw) : {};

    const newData =
      typeof data === "function" ? (data as (prev: FormData) => FormData)(prevData) : data;

    localStorage.setItem(key, JSON.stringify(newData));
  }, []);

  const getForm = useCallback((formName: string): FormData | null => {
    const data = localStorage.getItem(`react-persist:${formName}`);
    return data ? JSON.parse(data) : null;
  }, []);

  const removeForm = useCallback((formName: string) => {
    localStorage.removeItem(`react-persist:${formName}`);
  }, []);

  return { saveForm, getForm, removeForm };
}
