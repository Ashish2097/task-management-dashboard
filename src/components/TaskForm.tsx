import React, { useRef, useState } from 'react';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  task?: Task;
  onCancel?: () => void;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: Status;
}

export enum Status {
  Pending = "Pending",
  Completed = "Completed",
  InProgress = "In Progress"
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, task, onCancel }) => {
  const [title, setTitle] = useState<string>(task?.title ?? '');
  const [description, setDescription] = useState<string>(task?.description ?? '');
  const [dueDate, setDueDate] = useState<string>(task?.dueDate ?? '');
  const [status, setStatus] = useState<Status>(Status.Pending);

  const formRef = useRef<HTMLDivElement>(null);
  
  const isEditing = !!task;

  const handleSubmit = (e: React.FormEvent) => {
    debugger;
    e.preventDefault();

    if (title && dueDate) {
      const lastUpdatedAt = Date.now().toString();

      onSubmit({
        id: task?.id ?? lastUpdatedAt,
        title,
        description,
        dueDate,
        status
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus(Status.Pending);
    }
  };

  function onFormBlur(e: React.FocusEvent<HTMLFormElement | Element> ) {
    if (formRef.current && 
        (
          !(formRef.current === e.nativeEvent.target) &&
          !formRef.current.contains(e?.relatedTarget)
        )
      ) {
      onCancel?.();
    }
  }

  return (
    <div ref={formRef} onBlur={onFormBlur}>
      <form onSubmit={handleSubmit} style={{ border: isEditing ? "2px solid lightgreen" : "none", borderRadius: "16px", padding: "1rem", gap: "1rem" }}>
        <input className='form-control' autoFocus type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className='form-control' placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select className='form-control' value={status} onChange={(e) => setStatus(e.target.value as Status)}>
          {Object.keys(Status).map(item => 
            <option key={item} value={item}>{Status[item as keyof typeof Status]}</option>
          )}
        </select>
        <input className="form-control" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        <button className="btn btn-success" type="submit">{isEditing ? "Update" : "Add"} Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
