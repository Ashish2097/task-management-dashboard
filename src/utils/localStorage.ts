import { Task } from "../components/TaskForm";

const LOCAL_STORAGE_KEY = 'tasks';

export const saveToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};

export const loadFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
};
