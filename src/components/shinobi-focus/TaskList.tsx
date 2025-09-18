import type { Task } from '@/lib/types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id:string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-16">
        <p>Your mission log is empty.</p>
        <p>Accept a new mission to begin your training!</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-3">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
