import { useState } from "react";
import "./Dropdown.css ";

export default function Dropdown() {
  const [items, setItems] = useState(["Apple", "Mango", "Orange"]); // dropdown items
  const [input, setInput] = useState("");

  const addItem = () => {
    if (input.trim() === "") return;
    setItems([...items, input.trim()]);
    setInput("");
  };

  return (
    <div className="dropdown-container">
      <select>
        {items.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Enter new item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addItem}>Add to Dropdown</button>
    </div>
  );
}
