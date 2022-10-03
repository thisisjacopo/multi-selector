import { useState } from "react";
import { Select, SelectOption } from "./components/Select";

const options = [
  { label: "Option 1", value: "Hello World" },
  { label: "Option 2", value: "Hello from Jacopo" },
  { label: "Option 3", value: "Hello from Barcelona" },
  { label: "Option 4", value: "Hello from Zurich" },
];

function App() {
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);
  return (
    <div className="App">
      <h1>Multi Selector:</h1>
      <Select
        multiple
        options={options}
        value={value1}
        onChange={(opt) => setValue1(opt)}
      />
      <br />
      <h1>Single Selector:</h1>
      <Select
        options={options}
        value={value2}
        onChange={(opt) => setValue2(opt)}
      />
    </div>
  );
}

export default App;
