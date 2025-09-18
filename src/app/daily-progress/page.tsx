'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/shinobi-focus/Header';
import { MissionLog } from '@/components/shinobi-focus/MissionLog';
import type { Task } from '@/lib/types';

export default function DailyProgressPage() {
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

  if (!isMounted) {
    return (
      <main className="min-h-screen bg-background font-body">
        <Header />
        <div className="container mx-auto max-w-3xl p-4">
            <p>Loading mission log...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background font-body">
      <Header />
      <div className="container mx-auto max-w-3xl p-4">
        <MissionLog allTasks={tasks} />
      </div>
       <footer className="text-center p-8 text-muted-foreground text-sm">
        <p>Review your progress and prepare for tomorrow's missions.</p>
      </footer>
    </main>
  );
}
