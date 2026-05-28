import React from 'react';
import { BarChart2, HelpCircle, Zap, Calendar } from 'lucide-react';
import { GameMode } from '../types';

interface HeaderProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onStatsOpen: () => void;
  onHowToPlayOpen: () => void;
}

/**
 * Top navigation bar with logo, mode switcher, and icon buttons.
 */
const Header: React.FC<HeaderProps> = ({
  mode,
  onModeChange,
  onStatsOpen,
  onHowToPlayOpen,
}) => {
  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-40">
      <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        {/* Logo */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl" aria-hidden="true">🧩</span>
          <div className="leading-tight min-w-0">
            <span className="text-white font-bold text-sm sm:text-base whitespace-nowrap">
              Emoji Groups
            </span>
            <span className="text-teal-400 font-bold text-sm sm:text-base ml-1">
              Daily
            </span>
          </div>
        </div>

        {/* Mode switcher */}
        <nav
          className="flex items-center bg-slate-800 rounded-xl p-1 gap-1"
          aria-label="Game mode"
        >
          <button
            onClick={() => onModeChange('daily')}
            aria-pressed={mode === 'daily'}
            className={[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              mode === 'daily'
                ? 'bg-teal-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200',
            ].join(' ')}
          >
            <Calendar size={13} aria-hidden="true" />
            Today
          </button>
          <button
            onClick={() => onModeChange('practice')}
            aria-pressed={mode === 'practice'}
            className={[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              mode === 'practice'
                ? 'bg-teal-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200',
            ].join(' ')}
          >
            <Zap size={13} aria-hidden="true" />
            Practice
          </button>
        </nav>

        {/* Icon actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onStatsOpen}
            aria-label="View stats"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <BarChart2 size={18} aria-hidden="true" />
          </button>
          <button
            onClick={onHowToPlayOpen}
            aria-label="How to play"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <HelpCircle size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
