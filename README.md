# persist-form-hook

A simple React hook for storing and retrieving form data from `localStorage`.  
✅ Now supports functional updates (callback) to merge new data with previously saved form data.

## Installation

```bash
npm install persist-form-hook
If you have any issues due to React version compatibility, try:

bash
Copy
Edit
npm install persist-form-hook --legacy-peer-deps
Usage
tsx
Copy
Edit
import { usePersist } from "persist-form-hook";

const MyComponent = () => {
  const { saveForm, getForm, removeForm } = usePersist();

  const handleSave = () => {
    // Merge with previous data using a callback
    saveForm("myForm", (prev) => ({
      ...prev,
      name: "gost",
      age: 23,
    }));
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
# API
saveForm(formName: string, data: Record<string, any> | (prev: Record<string, any>) => Record<string, any>)
Saves or updates form data into localStorage.
You can now pass either:

An object (replaces previous data), or

A callback function (prevData) => newData to merge with previous data.

getForm(formName: string): Record<string, any> | null
Retrieves the form data saved under the given name. Returns null if not found.

removeForm(formName: string)
Removes the form data for the given name from localStorage.

Made with ❤️ by gost1930