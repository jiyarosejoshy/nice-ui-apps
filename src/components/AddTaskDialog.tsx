import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Priority } from "@/types/task";

interface AddTaskDialogProps {
  onAdd: (title: string, description: string, priority: Priority) => void;
}

export function AddTaskDialog({ onAdd }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim(), priority);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <Input
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">🔴 High Priority</SelectItem>
              <SelectItem value="medium">🟡 Medium Priority</SelectItem>
              <SelectItem value="low">🔵 Low Priority</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full" disabled={!title.trim()}>
            Add Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
