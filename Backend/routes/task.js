const express = require('express');
const Task = require('../models/task');

const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all tasks with filtering
router.get('/', async (req, res) => {
  try {
    const { status, type, assignedTo } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tasks = await Task.find(filter);
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    // Find the task to be deleted and check if it exists
    let existingTask = await Task.findById(req.params.id);
    if (!existingTask) {
      return res.status(404).send("Task not found");
    }

    // Perform deletion of the task
    let deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Task has been deleted", task: deletedTask });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
