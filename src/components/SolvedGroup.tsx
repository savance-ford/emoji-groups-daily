import React from 'react';
import { SolvedGroup as SolvedGroupType } from '../types';
import { DIFFICULTY_STYLES } from '../utils';

interface SolvedGroupProps {
  group: SolvedGroupType;
  orderIndex: number;
}

/**
 * Displays a successfully solved emoji group above the game board.
 * Animates in when the group is first solved.
 */
const SolvedGroup: React.FC<SolvedGroupProps> = ({ group, orderIndex }) => {
  const styles = DIFFICULTY_STYLES[group.difficulty];

  const difficultyLabel =
    group.difficulty.charAt(0).toUpperCase() + group.difficulty.slice(1);

  return (
    <div
      className={[
        'rounded-2xl border-2 p-3 sm:p-4',
        'animate-group-reveal',
        styles.bg,
        styles.border,
      ].join(' ')}
      style={{ animationDelay: `${orderIndex * 50}ms` }}
      role="region"
      aria-label={`Solved group: ${group.category}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className={`font-bold text-sm sm:text-base tracking-wide ${styles.text}`}>
          {group.category}
        </h3>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles.badge}`}
          aria-label={`Difficulty: ${difficultyLabel}`}
        >
          {difficultyLabel}
        </span>
      </div>

      {/* Emoji row */}
      <div className="flex gap-2 sm:gap-3 mb-2">
        {group.emojis.map((emoji, i) => (
          <span
            key={i}
            className="text-2xl sm:text-3xl"
            role="img"
            aria-label={emoji}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Explanation */}
      <p className={`text-xs sm:text-sm opacity-75 ${styles.text}`}>
        {group.explanation}
      </p>
    </div>
  );
};

export default SolvedGroup;
