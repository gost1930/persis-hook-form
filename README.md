# persist-form-hook

A simple React hook for storing and retrieving form data from localStorage.

## Installation

```bash
npm install persist-form-hook
```
or  if you have any error from react v 
run this command:

```bash
npm install persist-form-hook --legacy-peer-deps
```
## Usage

```tsx
import { usePersist } from "persist-form-hook";

const MyComponent = () => {
  const { saveForm, getForm, removeForm } = usePersist();

  const handleSave = () => {
    saveForm("myForm", { name: "gost", age: 23 });
  };

  const handleLoad = () => {
    const data = getForm("myForm");
    console.log(data);
  };

  const handleRemove = () => {
    removeForm("myForm");
  };

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoad}>Load</button>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};
```

## API

### `saveForm(formName: string, data: Record<string, any>)`
Stores the form data under the given name.

### `getForm(formName: string): Record<string, any> | null`
Retrieves the form data by name.

### `removeForm(formName: string)`
Removes the saved form data.

---