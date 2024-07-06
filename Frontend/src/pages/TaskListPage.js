import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TaskListPage = () => {
  return (
    <div className="container">
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TaskListPage;
