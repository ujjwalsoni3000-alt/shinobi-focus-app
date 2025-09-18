import type { Task } from '@/lib/types';
import { TaskItem } from './TaskItem';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id:string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Missions</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
           <div className="text-center text-muted-foreground py-8">
             <p>Your mission log is clear.</p>
             <p>Accept a new mission to begin your training!</p>
           </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
