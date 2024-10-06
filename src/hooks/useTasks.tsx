import { useState, useCallback } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import { Task } from '../components/TaskForm';
import { SortValue } from '../components/FIlters';
import { ascending, descending } from '../utils/common';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchString, setSearchString] = useState("");
  const [dueDateSort, setDueDateSort] = useState<SortValue | null>(null);

  const loadTasks = useCallback(() => {
    let storedTasks = loadFromLocalStorage();
    if (searchString?.length) {
      const fieldsToSearch: (keyof Task)[] = ["description", "dueDate", "status", "title"]; 
      storedTasks = storedTasks.filter(task => fieldsToSearch.some(field => (task[field].toLowerCase()).includes(searchString.toLowerCase())));
    }

    if (dueDateSort) {
      const compFn = {
        [SortValue.asc]: ascending,
        [SortValue.desc]: descending,
      };

      storedTasks.sort(compFn[dueDateSort]("dueDate"));
    }

    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, [searchString, dueDateSort, tasks]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, task];
      saveToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  };

  const editTask = (updatedTask: Task) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
      saveToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter(task => task.id !== id);
      saveToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  };

  const search = (searchString?: string) => {
    setSearchString(searchString ?? "");
  }

  const updateDueDateSort = (sortOrder: SortValue | null) => {
    setDueDateSort(sortOrder);
  }

  return { tasks, addTask, editTask, deleteTask, loadTasks, search, updateDueDateSort };
};

export default useTasks;
