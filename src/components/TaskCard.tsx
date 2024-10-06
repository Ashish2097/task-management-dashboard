import React, { useEffect, useRef, useState } from 'react';
import TaskForm, { Status, Task } from './TaskForm';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (cardRef?.current) {
        cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  }, []);

  function toggleEditForm() {
    setShowEditForm(!showEditForm);
  }

  function editTask(editedTask: Task) {
    toggleEditForm();
    onEdit(editedTask);
  }

  const statusBadgeClassMap = {
    [Status.Completed]: "badge text-bg-light",
    [Status.InProgress]: "badge text-bg-success",
    [Status.Pending]: "badge text-bg-danger"
  }

  const status = Status[task.status as keyof typeof Status];

  return (
    showEditForm ? <TaskForm onSubmit={editTask} task={task} onCancel={toggleEditForm} /> :
    <div ref={cardRef} className="card text-bg-light mb-3 highlightAnim"
      style={{
        marginBottom: "1rem",
      }}>
      <div className="card-header">
        {task.title}
        <span style={{ marginLeft: "1rem", fontSize: "0.625rem" }} className={statusBadgeClassMap[status]}>{status}</span>
      </div>
      <div className="card-body">
        <p className="card-title" style={{ fontSize: "0.875rem" }}>{task.description}</p>
        <p className="card-text" style={{ fontSize: "0.75rem" }}>Due: {task.dueDate}</p>
        <button style={{ marginRight: "0.5rem" }} className="btn btn-light" onClick={() => toggleEditForm()}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
