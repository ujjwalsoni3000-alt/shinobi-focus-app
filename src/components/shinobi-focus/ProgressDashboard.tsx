import type { Rank, Task } from '@/lib/types';
import { getNextRank, getRank } from '@/lib/ranks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MotivationSensei } from './MotivationSensei';

interface ProgressDashboardProps {
  tasks: Task[];
  userName: string;
}

export function ProgressDashboard({ tasks, userName }: ProgressDashboardProps) {
  const completedTasks = tasks.filter(t => t.completed);
  const tasksCompletedCount = completedTasks.length;
  const totalChakra = completedTasks.reduce((sum, task) => sum + task.chakra, 0);

  const currentRank = getRank(tasksCompletedCount);
  const nextRank = getNextRank(tasksCompletedCount);
  
  const progressToNextRank = nextRank
    ? ((tasksCompletedCount - currentRank.minTasks) / (nextRank.minTasks - currentRank.minTasks)) * 100
    : 100;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4 md:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
          <currentRank.icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentRank.name}</div>
          {nextRank ? (
            <>
              <p className="text-xs text-muted-foreground">
                {nextRank.minTasks - tasksCompletedCount} missions to {nextRank.name}
              </p>
              <Progress value={progressToNextRank} className="mt-2 h-2" />
            </>
          ) : (
            <p className="text-xs text-muted-foreground">You have reached the highest rank!</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Missions Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tasksCompletedCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Chakra Expended</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalChakra}</div>
        </CardContent>
      </Card>
      <div className="md:col-span-2 lg:col-span-3">
        <MotivationSensei 
          userName={userName}
          tasksCompleted={tasksCompletedCount}
          chakraAllocated={totalChakra}
          currentRank={currentRank.name}
        />
      </div>
    </div>
  );
}
