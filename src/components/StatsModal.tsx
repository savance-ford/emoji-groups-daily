import React from 'react';
import { X, Trophy, Flame, Zap, Clock } from 'lucide-react';
import { PlayerStats } from '../types';
import { formatTime } from '../utils';

interface StatsModalProps {
  stats: PlayerStats;
  onClose: () => void;
}

interface StatItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => (
  <div className="flex flex-col items-center gap-1 bg-slate-800 rounded-2xl p-4">
    <div className="text-teal-400 mb-1">{icon}</div>
    <span className="text-white text-2xl font-bold">{value}</span>
    <span className="text-slate-400 text-xs text-center leading-tight">{label}</span>
  </div>
);

/**
 * Modal showing cumulative player statistics.
 */
const StatsModal: React.FC<StatsModalProps> = ({ stats, onClose }) => {
  const winRate =
    stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 0;

  const avgMistakes =
    stats.gamesPlayed > 0
      ? (stats.totalMistakes / stats.gamesPlayed).toFixed(1)
      : '—';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Player statistics"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md animate-modal-in shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="text-white text-xl font-bold">Your Stats</h2>
          <button
            onClick={onClose}
            aria-label="Close stats"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {stats.gamesPlayed === 0 ? (
            <div className="text-center py-8">
              <span className="text-5xl">🎮</span>
              <p className="text-slate-400 mt-4">
                Play your first game to start tracking stats!
              </p>
            </div>
          ) : (
            <>
              {/* Main stats grid */}
              <div className="grid grid-cols-2 gap-3">
                <StatItem
                  icon={<Trophy size={20} />}
                  value={`${winRate}%`}
                  label="Win Rate"
                />
                <StatItem
                  icon={<Zap size={20} />}
                  value={stats.gamesPlayed}
                  label="Games Played"
                />
                <StatItem
                  icon={<Flame size={20} />}
                  value={stats.currentStreak}
                  label="Current Streak"
                />
                <StatItem
                  icon={<Flame size={20} />}
                  value={stats.maxStreak}
                  label="Best Streak"
                />
              </div>

              {/* Secondary stats */}
              <div className="grid grid-cols-2 gap-3">
                <StatItem
                  icon={<Clock size={20} />}
                  value={
                    stats.fastestSolveMs !== null
                      ? formatTime(stats.fastestSolveMs)
                      : '—'
                  }
                  label="Fastest Solve"
                />
                <StatItem
                  icon={<span className="text-rose-400 text-lg">✕</span>}
                  value={avgMistakes}
                  label="Avg Mistakes"
                />
              </div>

              {/* Progress bar */}
              <div className="bg-slate-800 rounded-2xl p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Games Won</span>
                  <span className="text-white font-semibold">
                    {stats.gamesWon} / {stats.gamesPlayed}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <div
                    className="bg-teal-400 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${winRate}%` }}
                    role="progressbar"
                    aria-valuenow={winRate}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
