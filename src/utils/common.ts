import { Task } from "../components/TaskForm";

export function ascending(field: keyof Task) {
  return (a: Task, b: Task) => a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
}

export function descending(field: keyof Task) {
  return (a: Task, b: Task) => a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
}
