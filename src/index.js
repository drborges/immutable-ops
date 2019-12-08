import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const uuid = ((id = 0) => () => id++)();
const useList = initialState => {
  const [list, setList] = useState(initialState);
  const api = {
    add: item => setList([...list, item])
  };

  return [list, api];
};

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: event => setValue(event.target.value)
  };
};

function App() {
  const [todos, todoList] = useList([]);
  const todoInput = useInput("");

  return (
    <div className="App">
      <h1>Todos</h1>
      <div>
        <input {...todoInput} />
        <button onClick={todoList.add({ id: uuid(), text: todoInput.value })}>
          Add
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
