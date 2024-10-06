import React, { useEffect } from 'react';
import useTasks from './hooks/useTasks';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Filters from './components/FIlters';

const App: React.FC = () => {
  const { tasks, addTask, editTask, deleteTask, loadTasks, search, updateDueDateSort } = useTasks();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <div className="app">
      <h1>Task Management Dashboard</h1>
      <TaskForm onSubmit={addTask} />
      <Filters search={search} updateDueDateSort={updateDueDateSort}/>
      <TaskList tasks={tasks} onEdit={editTask} onDelete={deleteTask} />
      <div style={{ position: "absolute", bottom: "1rem", right: "1rem" }}>Made with <i className="bi bi-heart-fill text-danger"/> by Ashish </div>
    </div>

  );
};

export default App;
