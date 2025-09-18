import type { Rank } from '@/lib/types';
import { Badge, Bot, School, Shield, Crown } from 'lucide-react';

export const ranks: Rank[] = [
  { name: 'Academy Student', minTasks: 0, icon: School },
  { name: 'Genin', minTasks: 5, icon: Badge },
  { name: 'Chunin', minTasks: 15, icon: Shield },
  { name: 'Jonin', minTasks: 30, icon: Bot },
  { name: 'Kage', minTasks: 50, icon: Crown },
];

export const getRank = (tasksCompleted: number): Rank => {
  let currentRank = ranks[0];
  for (const rank of ranks) {
    if (tasksCompleted >= rank.minTasks) {
      currentRank = rank;
    } else {
      break;
    }
  }
  return currentRank;
};

export const getNextRank = (tasksCompleted: number): Rank | null => {
    const currentRank = getRank(tasksCompleted);
    const currentRankIndex = ranks.findIndex(r => r.name === currentRank.name);
    
    if (currentRankIndex < ranks.length - 1) {
        return ranks[currentRankIndex + 1];
    }

    return null;
}
