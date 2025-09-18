'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/shinobi-focus/Header';
import { ProgressDashboard } from '@/components/shinobi-focus/ProgressDashboard';
import { TaskForm } from '@/components/shinobi-focus/TaskForm';
import { TaskList } from '@/components/shinobi-focus/TaskList';
import type { Task } from '@/lib/types';

const USER_NAME = 'Young Shinobi';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('shinobi-tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('shinobi-tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to set tasks in localStorage", error);
      }
    }
  }, [tasks, isMounted]);

  const handleAddTask = (title: string, chakra: number) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      chakra,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  if (!isMounted) {
    return null; 
  }

  return (
    <main className="min-h-screen bg-background font-body">
      <Header />
      <ProgressDashboard tasks={tasks} userName={USER_NAME} />
      <div className="container mx-auto max-w-3xl">
        <TaskForm onAddTask={handleAddTask} />
        <TaskList 
          tasks={tasks} 
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      </div>
      <footer className="text-center p-8 text-muted-foreground text-sm">
        <p>Train hard, {USER_NAME}. Your path to greatness awaits.</p>
      </footer>
    </main>
  );
}
