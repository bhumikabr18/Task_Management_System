import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Store tasks
  const [newTask, setNewTask] = useState(""); // Input field state

  // ✅ Fetch tasks from backend when component loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // ✅ Add task to backend
  const addTask = async () => {
    if (!newTask.trim()) return; // Prevent empty tasks
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        name: newTask,
      });
      setTasks([...tasks, response.data]); // Update UI
      setNewTask(""); // Clear input
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // ✅ Delete task from backend
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id)); // Update UI
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ backgroundColor: "blue", color: "white", padding: "10px" }}>
        Task Management System
      </h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter new task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.name}{" "}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
