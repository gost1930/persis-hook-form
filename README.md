# persist-form-hook

A lightweight React Hook to persist form values in `localStorage` or `sessionStorage`, with support for expiration, default values, auto-binding to input fields, and lifecycle callbacks.

## Features

* ✅ Persist form data automatically
* ✅ Auto-bind inputs for controlled components
* ✅ Supports `localStorage` and `sessionStorage`
* ✅ Set expiration time for data
* ✅ Default values support
* ✅ Callbacks: `onSave`, `onLoad`, `onRemove`

---

## Installation

```bash
npm install persist-form-hook
```

---

## Usage

### Basic Usage

```tsx
import { usePersist } from "persist-form-hook";

const MyForm = () => {
  const { formValues, saveForm, bindInput, removeForm } = usePersist("my-form");

  return (
    <form>
      <input {...bindInput("name")} placeholder="Name" />
      <input {...bindInput("email")} placeholder="Email" />
      <button onClick={removeForm}>Reset</button>
    </form>
  );
};
```

### With Options

```tsx
const { formValues } = usePersist("login", {
  storage: "session",
  expiresIn: 3600, // 1 hour
  defaultValues: { username: "" },
  onSave: (data) => console.log("Saved:", data),
  onLoad: (data) => console.log("Loaded:", data),
  onRemove: () => console.log("Removed")
});
```

### Manually Save Values

```tsx
saveForm({ name: "Farid", email: "farid@email.com" });

// or update part of form
saveForm(prev => ({ ...prev, name: "Farid" }));
```

---

## API

### `usePersist(key: string, options?: Options)`

#### Parameters:

* `key`: Unique key to store the form under.
* `options`:

  * `storage`: "local" | "session" (default: `local`)
  * `expiresIn`: number in seconds
  * `defaultValues`: default form values
  * `onSave`: callback when data is saved
  * `onLoad`: callback when data is loaded
  * `onRemove`: callback when data is removed

### Returns:

```ts
{
  formValues: Record<string, any>,
  saveForm: (data | updater) => void,
  removeForm: () => void,
  bindInput: (fieldName: string) => inputProps
}
```

---

## Check if Form Is Filled

```ts
const allFilled = Object.values(formValues).every(val => val?.toString().trim() !== "");
```

Or for specific fields:

```ts
const requiredFields = ["name", "email"];
const allValid = requiredFields.every(f => formValues[f]?.toString().trim() !== "");
```

---

## License

MIT © Gost1930
