// Core type definitions for Emoji Groups Daily

export type Difficulty = 'easy' | 'medium' | 'hard' | 'tricky';

export interface Group {
  id: string;
  category: string;
  difficulty: Difficulty;
  emojis: [string, string, string, string];
  explanation: string;
}

export interface Puzzle {
  id: number;
  date?: string; // YYYY-MM-DD format for daily puzzles
  title: string;
  groups: [Group, Group, Group, Group];
}

export interface Tile {
  id: string;
  emoji: string;
  groupId: string;
}

export interface SolvedGroup extends Group {
  solvedAt: number; // timestamp
  solveOrder: number; // 1-4
}

export type GameMode = 'daily' | 'practice';

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export interface GameState {
  puzzle: Puzzle | null;
  mode: GameMode;
  status: GameStatus;
  selectedTileIds: string[];
  solvedGroups: SolvedGroup[];
  remainingTiles: Tile[];
  mistakes: number;
  startTime: number | null;
  endTime: number | null;
  shakingTileIds: string[];
  oneAwayHint: boolean;
}

export interface PlayerStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  lastPlayedDate: string | null;
  totalMistakes: number;
  fastestSolveMs: number | null;
  completedDailyPuzzles: number[];
  completedDailyKeys: string[];
}
