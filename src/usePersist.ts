import { useCallback } from "react";

export function usePersist() {
  const saveForm = useCallback((formName: string, data: Record<string, any>) => {
    localStorage.setItem(`react-persist:${formName}`, JSON.stringify(data));
  }, []);

  const getForm = useCallback((formName: string): Record<string, any> | null => {
    const data = localStorage.getItem(`react-persist:${formName}`);
    return data ? JSON.parse(data) : null;
  }, []);

  const removeForm = useCallback((formName: string) => {
    localStorage.removeItem(`react-persist:${formName}`);
  }, []);

  return { saveForm, getForm, removeForm };
}
