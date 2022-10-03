import { useState } from "react";
import { Select } from "./components/Select";

const options = [
  { label: "Option 1", value: "Hello World" },
  { label: "Option 2", value: "Hello from Jacopo" },
  { label: "Option 3", value: "Hello from Barcelona" },
  { label: "Option 4", value: "Hello from Zurich" },
];

function App() {
  const [value, setValue] = useState<typeof options[0] | undefined>(options[0]);
  return (
    <div className="App">
      <Select
        options={options}
        value={value}
        onChange={(opt) => setValue(opt)}
      />
    </div>
  );
}

export default App;
