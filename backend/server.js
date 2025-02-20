const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Task Schema & Model
const taskSchema = new mongoose.Schema({ name: String });
const Task = mongoose.model("Task", taskSchema);

// ✅ GET all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// ✅ POST a new task
app.post("/api/tasks", async (req, res) => {
  try {
    if (!req.body.name) return res.status(400).json({ error: "Task name is required" });
    const newTask = new Task({ name: req.body.name });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Error adding task" });
  }
});

// ✅ DELETE a task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
