import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState(["First todo"]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    setTodos((todo) => [...todo, input]);
    setInput("");
  };

  const editTodo = (id) => {
    const current = todos[id];
    const next = window.prompt("Edit todo:", current);
    if (!next || !next.trim()) return;

    setTodos((prev) => prev.map((todo, i) => (i === id ? next.trim() : todo)));
  };

  const deleteTodo = (id) => {
    if (!window.confirm("Delete this todo?")) return;

    setTodos((prev) => prev.filter((_, i) => i !== id));
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <h1> TodoList </h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos &&
            todos.map((todo, index) => (
              <li key={index} style={{ display: "flex", gap: "8px" }}>
                {todo}
                <button onClick={() => editTodo(index)}> Edit </button>
                <button onClick={() => deleteTodo(index)}> Delete </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
