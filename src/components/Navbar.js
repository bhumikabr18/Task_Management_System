import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Task Manager</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/add-task">Add Task</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
