const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRouter = require('./routes/task');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGO_URL; // MongoDB connection URI from environment variable
mongoose.connect(uri)

  .then(() => {
    console.log('MongoDB database connection established successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.use('/api/tasks', taskRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
