const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: String, required: true }, // Contact to whom the task is assigned
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  type: { type: String, required: true }, // Task type from dropdown
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
