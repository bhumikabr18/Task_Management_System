import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../reducers/taskReducer";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    dispatch(addTask({ id: Date.now(), name: task })); 
    setTask(""); 
    navigate("/"); // Redirect back to task list
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
