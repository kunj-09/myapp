import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // Default filter value

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://deploy-b6a6.onrender.com/api/tasks'); // Adjust URL as per your backend
        setTasks(response.data);
        applyFilter(response.data, statusFilter); // Apply current filter to newly fetched tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [statusFilter]); // Include statusFilter as dependency to re-fetch tasks when it changes

  const applyFilter = (tasksArray, filter) => {
    if (filter === 'all') {
      setFilteredTasks(tasksArray); // Show all tasks
    } else {
      const filtered = tasksArray.filter(task => task.status === filter);
      setFilteredTasks(filtered);
    }
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://deploy-b6a6.onrender.com/api/tasks/${id}`); // Adjust URL as per your backend
      const updatedTasks = tasks.filter(task => task._id !== id);
      setTasks(updatedTasks);
      applyFilter(updatedTasks, statusFilter); // Update filtered tasks after deletion
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'open' ? 'closed' : 'open';

    try {
      await axios.put(`https://deploy-b6a6.onrender.com/api/tasks/${id}`, { status: newStatus }); // Adjust URL as per your backend
      const updatedTasks = tasks.map(task =>
        task._id === id ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
      applyFilter(updatedTasks, statusFilter); // Update filtered tasks after status update
      alert('Task status updated successfully!');
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Function to fetch tasks again and update state after adding a new task
  const fetchTasksAndUpdateState = async () => {
    try {
      const response = await axios.get('https://deploy-b6a6.onrender.com/api/tasks'); // Adjust URL as per your backend
      setTasks(response.data);
      applyFilter(response.data, statusFilter); // Apply current filter to newly fetched tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleNewTaskAdded = () => {
    // Example function to handle adding a new task
    // After adding a new task, fetch tasks again to update the list
    fetchTasksAndUpdateState();
  };

  return (
    <div className="container">
      <h2>All Tasks</h2>
      <div className="filter">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select id="statusFilter" value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task._id}>
            <Link to={`/tasks/${task._id}`}>
              <h3>{task.title}</h3>
            </Link>
            <p>Description: {task.description}</p>
            <p>Type: {task.type}</p>
            <p>Assigned To: {task.assignedTo}</p>

            <p>Status: {task.status}</p>
            <div className="actions">
              <button onClick={() => handleToggleStatus(task._id, task.status)}>
                {task.status === 'open' ? 'Mark Closed' : 'Mark Open'}
              </button>
              <button  onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
