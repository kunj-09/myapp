import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type:'',
    assignedTo: '',
    status: 'open'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Collect user input from form fields
      const updatedFormData = {
        title: formData.title,
        description: formData.description,
        status: 'open', // Default status or based on form input
        type: formData.type, // Assuming 'type' is from a form input
        assignedTo: formData.assignedTo // Assuming 'assignedTo' is from a form input
      };
  
      await setFormData(updatedFormData); // Update formData state with user inputs
  
      // Send POST request to create task
      const response = await axios.post('http://localhost:5000/api/tasks', updatedFormData);
      console.log('Response:', response.data); // Log response data for debugging
  
      alert('Task created successfully!');
      
      // Optionally reset form fields after successful creation
      setFormData({
        title: '',
        description: '',
        type: '',
        assignedTo: '',
        status: 'open'
      });
    } catch (error) {
      console.error('Error creating task:', error.response.data); // Log specific error response
      alert('Failed to create task. Please check the details and try again.');
    }
  };
  

  
  
  return (
    <div className="container">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <textarea id="type" name="type" value={formData.type} onChange={handleInputChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="assignedto">Assigned To:</label>
          <textarea id="assignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleInputChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
