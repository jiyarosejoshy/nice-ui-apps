import { Task, TaskStatus } from "@/types/task";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  high: { label: "High", className: "bg-priority-high/15 text-priority-high border-priority-high/30" },
  medium: { label: "Medium", className: "bg-priority-medium/15 text-priority-medium border-priority-medium/30" },
  low: { label: "Low", className: "bg-priority-low/15 text-priority-low border-priority-low/30" },
};

const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const nextStatus: Record<TaskStatus, TaskStatus> = {
  todo: "in_progress",
  in_progress: "done",
  done: "todo",
};

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const isDone = task.status === "done";
  const priority = priorityConfig[task.priority];
  const timeAgo = getTimeAgo(task.createdAt);

  return (
    <Card className={cn(
      "group p-4 transition-all duration-200 hover:shadow-md border",
      isDone && "opacity-60"
    )}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isDone}
          onCheckedChange={() => onStatusChange(task.id, isDone ? "todo" : "done")}
          className="mt-1"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className={cn(
              "font-medium text-card-foreground truncate",
              isDone && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            <Badge variant="outline" className={cn("text-xs shrink-0", priority.className)}>
              {priority.label}
            </Badge>
          </div>
          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo}
            </span>
            <button
              onClick={() => onStatusChange(task.id, nextStatus[task.status])}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ArrowRight className="h-3 w-3" />
              {statusLabels[nextStatus[task.status]]}
            </button>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
