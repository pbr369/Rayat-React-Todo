import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    task: "",
    status: "Not Started",
  });

  const addTodo = () => {
    const todoWithTimestamp = { ...newTodo, timestamp: Date.now() };
    setTodos([todoWithTimestamp, ...todos]);
    setNewTodo({ title: "", task: "", status: "Not Started" });
  };

  const updateTodo = (index, updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const sortedTodos = todos.sort((a, b) => b.timestamp - a.timestamp);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Todo</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border rounded mr-2"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task"
          className="p-2 border rounded mr-2"
          value={newTodo.task}
          onChange={(e) => setNewTodo({ ...newTodo, task: e.target.value })}
        />
        <select
          value={newTodo.status}
          className="p-2 border rounded mr-2"
          onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })}
        >
          <option value="Not Started">Not Started</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Complete">Complete</option>
        </select>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <ul>
        {sortedTodos.map((todo, index) => (
          <li
            key={index}
            className="border p-4 mb-2 flex justify-between items-center"
          >
            <div>
              <strong>{todo.title}</strong> - {todo.task} ({todo.status})
              <div className="text-gray-500" style={{ minWidth: "150px" }}>
                Created on {new Date(todo.timestamp).toLocaleString()}
              </div>
            </div>
            <div>
              <button
                className="bg-yellow-500 text-white p-2 rounded mr-2"
                onClick={() =>
                  updateTodo(index, { ...todo, status: "Ongoing" })
                }
              >
                Start
              </button>
              <button
                className="bg-green-500 text-white p-2 rounded mr-2"
                onClick={() =>
                  updateTodo(index, { ...todo, status: "Complete" })
                }
              >
                Complete
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => deleteTodo(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
