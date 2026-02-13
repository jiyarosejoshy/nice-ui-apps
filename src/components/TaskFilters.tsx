import { Button } from "@/components/ui/button";
import { TaskStatus } from "@/types/task";
import { cn } from "@/lib/utils";
import { ListTodo, Loader, CheckCircle2, LayoutGrid } from "lucide-react";

interface TaskFiltersProps {
  active: TaskStatus | "all";
  onChange: (filter: TaskStatus | "all") => void;
  counts: Record<TaskStatus | "all", number>;
}

const filters = [
  { key: "all" as const, label: "All", icon: LayoutGrid },
  { key: "todo" as const, label: "To Do", icon: ListTodo },
  { key: "in_progress" as const, label: "In Progress", icon: Loader },
  { key: "done" as const, label: "Done", icon: CheckCircle2 },
];

export function TaskFilters({ active, onChange, counts }: TaskFiltersProps) {
  return (
    <div className="flex gap-1 bg-muted p-1 rounded-lg">
      {filters.map(({ key, label, icon: Icon }) => (
        <Button
          key={key}
          variant="ghost"
          size="sm"
          onClick={() => onChange(key)}
          className={cn(
            "gap-1.5 text-sm rounded-md transition-all",
            active === key
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
          <span className={cn(
            "ml-0.5 text-xs tabular-nums",
            active === key ? "text-foreground" : "text-muted-foreground"
          )}>
            {counts[key]}
          </span>
        </Button>
      ))}
    </div>
  );
}
