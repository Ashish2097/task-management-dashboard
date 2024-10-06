import React from 'react';
import TaskCard from './TaskCard';
import { Task } from './TaskForm';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
