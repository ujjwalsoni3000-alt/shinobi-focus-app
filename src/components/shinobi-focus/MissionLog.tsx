'use client';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Task } from '@/lib/types';
import { isSameDay, format } from 'date-fns';

interface MissionLogProps {
    allTasks: Task[];
}

export function MissionLog({ allTasks }: MissionLogProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const acceptedOnDay = date ? allTasks.filter(task => isSameDay(task.createdAt, date)) : [];
    const completedOnDay = date ? allTasks.filter(task => task.completedAt && isSameDay(task.completedAt, date)) : [];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Mission Log</CardTitle>
                <CardDescription>Review your daily progress.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />
                </div>
                
                {date && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-center">
                            Log for {format(date, 'PPP')}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <LogSection title="Missions Accepted" tasks={acceptedOnDay} />
                            <LogSection title="Missions Completed" tasks={completedOnDay} />
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

function LogSection({ title, tasks }: { title: string, tasks: Task[]}) {
    return (
        <div className="space-y-2">
            <h4 className="font-medium">{title} ({tasks.length})</h4>
            <ScrollArea className="h-48 rounded-md border p-2">
                {tasks.length > 0 ? (
                    <div className="space-y-2">
                        {tasks.map(task => (
                            <div key={task.id} className="text-sm p-2 bg-muted/50 rounded-md flex justify-between items-center">
                                <span>{task.title}</span>
                                <Badge variant="outline">{task.rank}-Rank</Badge>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-xs text-muted-foreground text-center pt-4">No missions {title.toLowerCase().split(' ')[1]} on this day.</div>
                )}
            </ScrollArea>
        </div>
    )
}
