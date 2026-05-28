import React from 'react';
import { ChevronRight, Shuffle, Trash2 } from 'lucide-react';
import EmojiTile from './EmojiTile';
import SolvedGroup from './SolvedGroup';
import MistakesCounter from './MistakesCounter';
import { GameMode, SolvedGroup as SolvedGroupType, Tile } from '../types';

interface GameBoardProps {
  tiles: Tile[];
  selectedTileIds: string[];
  shakingTileIds: string[];
  solvedGroups: SolvedGroupType[];
  mistakes: number;
  maxMistakes: number;
  oneAwayHint: boolean;
  puzzleTitle: string;
  mode: GameMode;
  isPlaying: boolean;
  onTileClick: (tileId: string) => void;
  onSubmit: () => void;
  onShuffle: () => void;
  onDeselect: () => void;
}

/**
 * Main game board: solved groups, emoji grid, controls, and mistake counter.
 */
const GameBoard: React.FC<GameBoardProps> = ({
  tiles,
  selectedTileIds,
  shakingTileIds,
  solvedGroups,
  mistakes,
  maxMistakes,
  oneAwayHint,
  puzzleTitle,
  mode,
  isPlaying,
  onTileClick,
  onSubmit,
  onShuffle,
  onDeselect,
}) => {
  const selectedCount = selectedTileIds.length;
  const canSubmit = isPlaying && selectedCount === 4;
  const hasSelection = isPlaying && selectedCount > 0;
  const canShuffle = isPlaying && tiles.length > 1;

  return (
    <div className="w-full max-w-xl mx-auto px-4 flex flex-col gap-3">
      <section className="text-center pt-3" aria-labelledby="puzzle-title">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3 py-1 mb-2">
          <span className="text-slate-400 text-[11px] uppercase tracking-widest font-bold">
            {mode === 'daily' ? "Today's Puzzle" : 'Practice Puzzle'}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden="true" />
          <span className="text-slate-500 text-[11px] font-semibold">
            {solvedGroups.length}/4 groups solved
          </span>
        </div>
        <h1 id="puzzle-title" className="text-white text-xl sm:text-2xl font-extrabold tracking-tight">
          {puzzleTitle}
        </h1>
      </section>

      {solvedGroups.length > 0 && (
        <div className="space-y-2" aria-label="Solved groups">
          {[...solvedGroups]
            .sort((a, b) => a.solveOrder - b.solveOrder)
            .map((group, index) => (
              <SolvedGroup key={group.id} group={group} orderIndex={index} />
            ))}
        </div>
      )}

      {oneAwayHint && (
        <div
          className="bg-amber-500/15 border border-amber-500/40 rounded-xl px-4 py-2.5 text-center animate-fade-in"
          role="alert"
          aria-live="polite"
        >
          <span className="text-amber-300 font-semibold text-sm">
            You&apos;re one away! 🔥
          </span>
        </div>
      )}

      {tiles.length > 0 && (
        <div
          className="grid grid-cols-4 gap-2 sm:gap-3"
          role="group"
          aria-label="Emoji tile grid"
        >
          {tiles.map((tile) => (
            <EmojiTile
              key={tile.id}
              emoji={tile.emoji}
              isSelected={selectedTileIds.includes(tile.id)}
              isShaking={shakingTileIds.includes(tile.id)}
              disabled={!isPlaying}
              onClick={() => onTileClick(tile.id)}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-900/80 border border-slate-800 p-3">
        <MistakesCounter maxMistakes={maxMistakes} mistakesMade={mistakes} />
        <div className="text-right">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
            Selected
          </p>
          <p className="text-white font-bold text-lg" aria-live="polite">
            {selectedCount}/4
          </p>
        </div>
      </div>

      <div className="flex gap-2 pb-2">
        <button
          type="button"
          onClick={onShuffle}
          disabled={!canShuffle}
          aria-label="Shuffle remaining tiles"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-all border border-slate-700 hover:border-slate-500 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Shuffle size={15} aria-hidden="true" />
          Shuffle
        </button>

        <button
          type="button"
          onClick={onDeselect}
          disabled={!hasSelection}
          aria-label="Deselect all selected emojis"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-all border border-slate-700 hover:border-slate-500 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 size={15} aria-hidden="true" />
          Deselect
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          aria-label="Submit selected emojis as a group guess"
          className={[
            'flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl',
            'font-bold text-sm transition-all',
            canSubmit
              ? 'bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/25 animate-pulse-glow'
              : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed',
          ].join(' ')}
        >
          Submit
          {canSubmit && <ChevronRight size={15} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
