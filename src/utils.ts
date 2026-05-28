// Utility functions for Emoji Groups Daily

import { Difficulty, Group, PlayerStats, SolvedGroup, Tile } from './types';

const STATS_KEY = 'emojigroups_stats';

const DEFAULT_STATS: PlayerStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  lastPlayedDate: null,
  totalMistakes: 0,
  fastestSolveMs: null,
  completedDailyPuzzles: [],
  completedDailyKeys: [],
};

// Color dots used in the share result string
export const DIFFICULTY_DOTS: Record<Difficulty, string> = {
  easy: '🟢',
  medium: '🟡',
  hard: '🔴',
  tricky: '🟣',
};

// Tailwind class sets for each difficulty tier
export const DIFFICULTY_STYLES: Record<Difficulty, {
  bg: string;
  border: string;
  text: string;
  badge: string;
  dot: string;
}> = {
  easy: {
    bg: 'bg-emerald-100',
    border: 'border-emerald-300',
    text: 'text-emerald-900',
    badge: 'bg-emerald-200 text-emerald-800',
    dot: 'bg-emerald-500',
  },
  medium: {
    bg: 'bg-amber-100',
    border: 'border-amber-300',
    text: 'text-amber-900',
    badge: 'bg-amber-200 text-amber-800',
    dot: 'bg-amber-500',
  },
  hard: {
    bg: 'bg-rose-100',
    border: 'border-rose-300',
    text: 'text-rose-900',
    badge: 'bg-rose-200 text-rose-800',
    dot: 'bg-rose-500',
  },
  tricky: {
    bg: 'bg-violet-100',
    border: 'border-violet-300',
    text: 'text-violet-900',
    badge: 'bg-violet-200 text-violet-800',
    dot: 'bg-violet-500',
  },
};

/** Shuffle an array without mutating the original input. */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Convert puzzle groups into uniquely identifiable tiles. */
export function buildTiles(groups: Group[]): Tile[] {
  return groups.flatMap((group) =>
    group.emojis.map((emoji, emojiIndex) => ({
      id: `${group.id}-${emojiIndex}`,
      emoji,
      groupId: group.id,
    }))
  );
}

/** Check if the selected tiles belong to the same unsolved group. */
export function checkGuess(
  selectedTiles: Tile[],
  groups: Group[]
): { correct: boolean; group: Group | null; oneAway: boolean } {
  if (selectedTiles.length !== 4) {
    return { correct: false, group: null, oneAway: false };
  }

  for (const group of groups) {
    const matches = selectedTiles.filter((tile) => tile.groupId === group.id);
    if (matches.length === 4) {
      return { correct: true, group, oneAway: false };
    }
    if (matches.length === 3) {
      return { correct: false, group: null, oneAway: true };
    }
  }

  return { correct: false, group: null, oneAway: false };
}

/** Format milliseconds into a mm:ss display string. */
export function formatTime(ms: number): string {
  const safeMs = Number.isFinite(ms) && ms > 0 ? ms : 0;
  const totalSeconds = Math.floor(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/** Get today's local date string in YYYY-MM-DD format. */
export function getTodayStr(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Load player stats from localStorage and safely migrate older saves. */
export function loadStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return { ...DEFAULT_STATS };

    const parsed = JSON.parse(raw) as Partial<PlayerStats>;
    return {
      ...DEFAULT_STATS,
      ...parsed,
      completedDailyPuzzles: parsed.completedDailyPuzzles ?? [],
      completedDailyKeys: parsed.completedDailyKeys ?? [],
    };
  } catch {
    // Corrupted or unavailable localStorage — reset gracefully.
    return { ...DEFAULT_STATS };
  }
}

/** Persist player stats to localStorage without crashing gameplay if storage is blocked. */
export function saveStats(stats: PlayerStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // Private browsing or storage permissions can block writes.
  }
}

/**
 * Update stats after a game ends.
 * Daily results are counted once per local date to prevent stat farming by restarting Today.
 */
export function recordGameResult(
  stats: PlayerStats,
  won: boolean,
  mistakes: number,
  solveTimeMs: number,
  puzzleId: number,
  isDaily: boolean
): PlayerStats {
  const today = getTodayStr();
  const dailyKey = `${today}-${puzzleId}`;

  if (isDaily && stats.completedDailyKeys.includes(dailyKey)) {
    return stats;
  }

  const updated: PlayerStats = {
    ...DEFAULT_STATS,
    ...stats,
    completedDailyPuzzles: [...stats.completedDailyPuzzles],
    completedDailyKeys: [...stats.completedDailyKeys],
  };

  updated.gamesPlayed += 1;
  if (won) updated.gamesWon += 1;
  updated.totalMistakes += mistakes;

  // Streak tracking is based on daily puzzle wins only.
  if (isDaily) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = [
      yesterday.getFullYear(),
      String(yesterday.getMonth() + 1).padStart(2, '0'),
      String(yesterday.getDate()).padStart(2, '0'),
    ].join('-');

    if (won) {
      if (updated.lastPlayedDate === yesterdayStr) {
        updated.currentStreak += 1;
      } else if (updated.lastPlayedDate !== today) {
        updated.currentStreak = 1;
      }
      updated.maxStreak = Math.max(updated.maxStreak, updated.currentStreak);
    } else {
      updated.currentStreak = 0;
    }

    if (!updated.completedDailyPuzzles.includes(puzzleId)) {
      updated.completedDailyPuzzles.push(puzzleId);
    }
    updated.completedDailyKeys.push(dailyKey);
  }

  if (won) {
    if (updated.fastestSolveMs === null || solveTimeMs < updated.fastestSolveMs) {
      updated.fastestSolveMs = solveTimeMs;
    }
  }

  if (isDaily) {
    updated.lastPlayedDate = today;
  }

  return updated;
}

/** Build share text from the completed game. */
export function buildShareText(
  puzzleId: number,
  solveTimeMs: number,
  mistakes: number,
  solvedGroups: SolvedGroup[],
  won: boolean
): string {
  const timeStr = formatTime(solveTimeMs);
  const dots = [...solvedGroups]
    .sort((a, b) => a.solveOrder - b.solveOrder)
    .map((group) => DIFFICULTY_DOTS[group.difficulty].repeat(4))
    .join('\n');

  const header = won ? `Emoji Groups Daily #${puzzleId}` : `Emoji Groups Daily #${puzzleId} — Game Over`;
  const resultLine = won ? `Solved in ${timeStr}` : `Found ${solvedGroups.length}/4 groups in ${timeStr}`;

  return `${header}\n${resultLine}\nMistakes: ${mistakes}/4${dots ? `\n${dots}` : ''}`;
}
