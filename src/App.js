import React from 'react';
import './App.css'; // Import your CSS file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskListPage from './pages/TaskListPage';
import UpdateTaskPage from './pages/UpdateTaskPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/tasks/:id" element={<UpdateTaskPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
