import { useState, useCallback } from "react";
import { Task, Priority, TaskStatus } from "@/types/task";

const SAMPLE_TASKS: Task[] = [
  { id: "1", title: "Design homepage layout", description: "Create wireframes and mockups", priority: "high", status: "in_progress", createdAt: new Date(Date.now() - 86400000 * 2) },
  { id: "2", title: "Set up CI/CD pipeline", priority: "medium", status: "todo", createdAt: new Date(Date.now() - 86400000) },
  { id: "3", title: "Write API documentation", description: "Document all endpoints", priority: "low", status: "done", createdAt: new Date(Date.now() - 86400000 * 5) },
  { id: "4", title: "Fix login bug", priority: "high", status: "todo", createdAt: new Date(Date.now() - 3600000) },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);

  const addTask = useCallback((title: string, description: string, priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description: description || undefined,
      priority,
      status: "todo",
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const updateStatus = useCallback((id: string, status: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tasks, addTask, updateStatus, deleteTask };
}
