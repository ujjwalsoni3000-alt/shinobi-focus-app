'use client';
import { useState } from 'react';
import type { Task } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ShurikenIcon } from '@/components/icons/ShurikenIcon';
import { ChakraIcon } from '@/components/icons/ChakraIcon';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 500); // Match animation duration
  };

  return (
    <Card className={cn(
      "transition-all duration-500",
      isDeleting ? 'animate-shuriken-spin-out' : 'opacity-100',
      task.completed ? 'bg-muted/50' : 'bg-card'
    )}>
      <CardContent className="p-4 flex items-center gap-4">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            "flex-grow text-sm font-medium",
            task.completed && 'line-through text-muted-foreground'
          )}
        >
          {task.title}
        </label>
        <Badge variant="outline">{task.rank}-Rank</Badge>
        <div className="flex items-center gap-1" title={`${task.chakra} Chakra`}>
           <ChakraIcon className="h-4 w-4 text-accent" />
           <span className="text-sm font-bold text-accent">{task.chakra}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          aria-label={`Delete task ${task.title}`}
          className="shrink-0 text-muted-foreground hover:text-destructive"
        >
          <ShurikenIcon className="h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
}
