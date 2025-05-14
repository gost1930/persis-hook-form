import { useCallback, useState } from "react"

interface Options {
  storage?: "local" | "session";
  expiresIn?: number;
  defaultValues?: Record<string, any>;
  onSave?: (data: any) => void;
  onLoad?: (data: any) => void;
  onRemove?: () => void;
}

const getStorage = (type: "local" | "session") =>
  type === "session" ? sessionStorage : localStorage

const isExpired = (timestamp: number, expiresIn: number): boolean => {
  return Date.now() > timestamp + expiresIn * 1000
}

export const usePersist = (key: string, options?: Options) => {
  const {
    storage = "local",
    expiresIn,
    defaultValues = {},
    onSave,
    onLoad,
    onRemove,
  } = options || {}

  const store = getStorage(storage)
  const [formValues, setFormValues] = useState<Record<string, any>>(() => {
    try {
      const raw = store.getItem(key)
      if (!raw) return defaultValues
      const parsed = JSON.parse(raw)
      if (expiresIn && isExpired(parsed._ts, expiresIn)) {
        store.removeItem(key)
        return defaultValues
      }
      onLoad?.(parsed.data)
      return parsed.data
    } catch (err) {
      return defaultValues
    }
  })

  const saveForm = useCallback(
    (fnOrData: Record<string, any> | ((prev: any) => any)) => {
      setFormValues((prev) => {
        const newData = typeof fnOrData === "function" ? fnOrData(prev) : fnOrData
        const toSave = {
          data: newData,
          _ts: Date.now(),
        }
        store.setItem(key, JSON.stringify(toSave))
        onSave?.(newData)
        return newData
      })
    },
    [key, store]
  )

  const removeForm = useCallback(() => {
    store.removeItem(key)
    setFormValues(defaultValues)
    onRemove?.()
  }, [key, store])

  const bindInput = (name: string) => {
    return {
      name,
      value: formValues[name] || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value } = e.target
        saveForm((prev) => ({ ...prev, [name]: value }))
      },
    }
  }

  return {
    formValues,
    saveForm,
    removeForm,
    bindInput,
  }
}
