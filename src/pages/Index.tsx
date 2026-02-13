import { useState, useMemo } from "react";
import { useTasks } from "@/hooks/useTasks";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { TaskCard } from "@/components/TaskCard";
import { TaskFilters } from "@/components/TaskFilters";
import { TaskStatus } from "@/types/task";
import { CheckSquare } from "lucide-react";

const Index = () => {
  const { tasks, addTask, updateStatus, deleteTask } = useTasks();
  const [filter, setFilter] = useState<TaskStatus | "all">("all");

  const counts = useMemo(() => ({
    all: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  }), [tasks]);

  const filtered = useMemo(
    () => filter === "all" ? tasks : tasks.filter((t) => t.status === filter),
    [tasks, filter]
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <CheckSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Tasks</h1>
              <p className="text-sm text-muted-foreground">
                {counts.done} of {counts.all} completed
              </p>
            </div>
          </div>
          <AddTaskDialog onAdd={addTask} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TaskFilters active={filter} onChange={setFilter} counts={counts} />
        </div>

        {/* Task List */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No tasks here yet</p>
              <p className="text-muted-foreground text-sm mt-1">Create one to get started</p>
            </div>
          ) : (
            filtered.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={updateStatus}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
