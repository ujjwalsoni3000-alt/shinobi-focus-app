export interface Task {
  id: string;
  title: string;
  chakra: number;
  completed: boolean;
}

export interface Rank {
  name: string;
  minTasks: number;
  icon: React.ComponentType<{ className?: string }>;
}
