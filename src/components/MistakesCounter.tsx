import React from 'react';

interface MistakesCounterProps {
  maxMistakes: number;
  mistakesMade: number;
}

/**
 * Visual indicator of remaining mistake chances.
 * Dots change from teal (available) to red (used).
 */
const MistakesCounter: React.FC<MistakesCounterProps> = ({
  maxMistakes,
  mistakesMade,
}) => {
  const remaining = maxMistakes - mistakesMade;

  return (
    <div
      className="flex flex-col items-center gap-2"
      aria-label={`Mistakes remaining: ${remaining} of ${maxMistakes}`}
      role="status"
      aria-live="polite"
    >
      <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
        Mistakes Left
      </span>
      <div className="flex gap-2">
        {Array.from({ length: maxMistakes }).map((_, i) => {
          const used = i < mistakesMade;
          return (
            <span
              key={i}
              className={[
                'w-4 h-4 rounded-full transition-all duration-300',
                used
                  ? 'bg-rose-500 scale-90'
                  : 'bg-teal-400',
              ].join(' ')}
              aria-hidden="true"
            />
          );
        })}
      </div>
    </div>
  );
};

export default MistakesCounter;
