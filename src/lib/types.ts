export type MissionRankName = 'S' | 'A' | 'B' | 'C';

export interface Task {
  id: string;
  title: string;
  rank: MissionRankName;
  chakra: number;
  completed: boolean;
  createdAt: number; // Store as timestamp
  completedAt: number | null; // Store as timestamp
}

export interface NinjaRank {
  name: string;
  minChakra: number;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Rank {
    name: MissionRankName;
    chakra: number;
}
