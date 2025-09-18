import type { NinjaRank, MissionRankName, Rank as MissionRankDetails } from '@/lib/types';
import { Badge, Bot, School, Shield, Crown, Eye, Swords } from 'lucide-react';

export const ranks: NinjaRank[] = [
  { name: 'Academy Student', minChakra: 0, icon: School },
  { name: 'Genin', minChakra: 10, icon: Badge },
  { name: 'Chunin', minChakra: 15, icon: Shield },
  { name: 'Jonin', minChakra: 30, icon: Bot },
  { name: 'ANBU Black Ops', minChakra: 50, icon: Eye },
  { name: 'Sannin', minChakra: 100, icon: Swords },
  { name: 'Kage', minChakra: 200, icon: Crown },
];

export const MISSION_RANKS: Record<MissionRankName, MissionRankDetails> = {
    C: { name: 'C', chakra: 1 },
    B: { name: 'B', chakra: 5 },
    A: { name: 'A', chakra: 8 },
    S: { name: 'S', chakra: 10 },
}

export const getRank = (chakra: number): NinjaRank => {
  let currentRank = ranks[0];
  for (const rank of ranks) {
    if (chakra >= rank.minChakra) {
      currentRank = rank;
    } else {
      break;
    }
  }
  return currentRank;
};

export const getNextRank = (chakra: number): NinjaRank | null => {
    const currentRank = getRank(chakra);
    const currentRankIndex = ranks.findIndex(r => r.name === currentRank.name);
    
    if (currentRankIndex < ranks.length - 1) {
        return ranks[currentRankIndex + 1];
    }

    return null;
}
