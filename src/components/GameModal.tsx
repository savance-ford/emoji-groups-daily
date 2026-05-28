import React, { useEffect, useRef } from 'react';
import { RefreshCw, RotateCcw, Share2, X } from 'lucide-react';
import { GameMode, GameStatus, Group, SolvedGroup } from '../types';
import { buildShareText, DIFFICULTY_DOTS, DIFFICULTY_STYLES, formatTime } from '../utils';

interface GameModalProps {
  status: GameStatus;
  mode: GameMode;
  puzzleId: number;
  puzzleGroups: Group[];
  mistakes: number;
  maxMistakes: number;
  solveTimeMs: number;
  solvedGroups: SolvedGroup[];
  onPlayAgain: () => void;
  onClose: () => void;
}

/**
 * Win/loss end-of-game modal with result summary and share button.
 */
const GameModal: React.FC<GameModalProps> = ({
  status,
  mode,
  puzzleId,
  puzzleGroups,
  mistakes,
  maxMistakes,
  solveTimeMs,
  solvedGroups,
  onPlayAgain,
  onClose,
}) => {
  const shareRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = React.useState(false);
  const [copyFailed, setCopyFailed] = React.useState(false);

  const won = status === 'won';
  const solvedIds = new Set(solvedGroups.map((group) => group.id));

  // Auto-focus the share button when modal opens.
  useEffect(() => {
    const timerId = window.setTimeout(() => shareRef.current?.focus(), 200);
    return () => window.clearTimeout(timerId);
  }, []);

  const handleShare = async () => {
    const text = buildShareText(puzzleId, solveTimeMs, mistakes, solvedGroups, won);

    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setCopyFailed(false);
        window.setTimeout(() => setCopied(false), 2000);
      } else {
        setCopyFailed(true);
        window.setTimeout(() => setCopyFailed(false), 2000);
      }
    } catch {
      setCopyFailed(true);
      window.setTimeout(() => setCopyFailed(false), 2000);
    }
  };

  const resultGroups = won
    ? [...solvedGroups].sort((a, b) => a.solveOrder - b.solveOrder)
    : puzzleGroups;

  const shareLabel = copyFailed
    ? 'Copy unavailable'
    : copied
      ? 'Copied to clipboard!'
      : 'Share Result';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={won ? 'You won!' : 'Game over'}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md animate-modal-in shadow-2xl overflow-hidden">
        <div
          className={`h-2 w-full ${
            won
              ? 'bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500'
              : 'bg-gradient-to-r from-rose-500 to-orange-500'
          }`}
        />

        <div className="flex items-start justify-between p-5 pb-0">
          <div>
            <div className="text-4xl mb-2" aria-hidden="true">
              {won ? '🎉' : '😔'}
            </div>
            <h2 className="text-white text-2xl font-bold">
              {won ? 'Solved!' : 'Game Over'}
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              {won
                ? 'You found all 4 groups!'
                : mode === 'daily'
                  ? 'Come back tomorrow for a fresh daily puzzle.'
                  : 'Try another practice puzzle and run it back.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close result"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-all mt-1"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-2xl p-3 text-center">
              <div className="text-teal-400 text-lg font-bold">
                {formatTime(solveTimeMs)}
              </div>
              <div className="text-slate-400 text-xs mt-0.5">Time</div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-3 text-center">
              <div className="text-teal-400 text-lg font-bold">
                {mistakes}/{maxMistakes}
              </div>
              <div className="text-slate-400 text-xs mt-0.5">Mistakes</div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-3 text-center">
              <div className="text-teal-400 text-lg font-bold">
                {solvedGroups.length}/4
              </div>
              <div className="text-slate-400 text-xs mt-0.5">Groups</div>
            </div>
          </div>

          <div className="space-y-2 max-h-[34vh] overflow-y-auto pr-1 scrollbar-thin">
            {!won && (
              <p className="text-xs text-slate-400 px-1">
                Full answer reveal:
              </p>
            )}
            {resultGroups.map((group) => {
              const styles = DIFFICULTY_STYLES[group.difficulty];
              const wasSolved = solvedIds.has(group.id);

              return (
                <div
                  key={group.id}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border ${styles.bg} ${styles.border}`}
                >
                  <span className="text-base" aria-hidden="true">
                    {DIFFICULTY_DOTS[group.difficulty]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm font-bold ${styles.text} truncate`}>
                      {group.category}
                    </div>
                    {!won && (
                      <div className={`text-[11px] ${styles.text} opacity-70`}>
                        {wasSolved ? 'Solved' : 'Missed'}
                      </div>
                    )}
                  </div>
                  <span className="flex gap-1 text-sm" aria-label={group.emojis.join(' ')}>
                    {group.emojis.map((emoji, index) => (
                      <span key={`${group.id}-${emoji}-${index}`}>{emoji}</span>
                    ))}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            ref={shareRef}
            onClick={handleShare}
            className={[
              'w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl',
              'font-bold text-sm transition-all',
              copied
                ? 'bg-emerald-500 text-white'
                : copyFailed
                  ? 'bg-slate-700 text-slate-200'
                  : 'bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-400/30',
            ].join(' ')}
          >
            <Share2 size={16} aria-hidden="true" />
            {shareLabel}
          </button>

          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-600"
          >
            {mode === 'daily' ? (
              <>
                <RotateCcw size={15} aria-hidden="true" />
                Practice Mode
              </>
            ) : (
              <>
                <RefreshCw size={15} aria-hidden="true" />
                New Practice Puzzle
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
