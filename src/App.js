import React, { useState, useEffect } from "react";
//import "./App.css";

const mockFetchTasks = () =>
  Promise.resolve([{ id: 1, text: "Buy groceries" }, { id: 2, text: "Walk the dog" }]);

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    async function fetchData() {
      const fetchedTasks = await mockFetchTasks();
      setTasks(fetchedTasks);
    }
    fetchData();
  }, []);

  const addTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: taskInput }]);
    setTaskInput("");
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Enter a task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
