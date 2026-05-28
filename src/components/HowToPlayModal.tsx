import React from 'react';
import { X } from 'lucide-react';
import { DIFFICULTY_STYLES } from '../utils';
import { Difficulty } from '../types';

interface HowToPlayModalProps {
  onClose: () => void;
}

const STEPS = [
  {
    icon: '👀',
    title: 'Study the Grid',
    desc: 'You see 16 emoji tiles. Hidden inside are 4 secret groups of 4.',
  },
  {
    icon: '🖱️',
    title: 'Select 4 Emojis',
    desc: 'Tap any tile to select it. Pick exactly 4 that you think share a theme.',
  },
  {
    icon: '✅',
    title: 'Submit Your Guess',
    desc: 'Hit Submit. If all 4 belong together, the group is revealed above the board.',
  },
  {
    icon: '⚠️',
    title: 'Watch Your Mistakes',
    desc: 'A wrong guess costs one of your 4 mistakes. Run out and it\'s game over.',
  },
  {
    icon: '🔀',
    title: 'Shuffle & Spot Patterns',
    desc: 'Use the Shuffle button to reorganise tiles and spot hidden connections.',
  },
];

const DIFFICULTIES: { label: string; key: Difficulty }[] = [
  { label: 'Easy', key: 'easy' },
  { label: 'Medium', key: 'medium' },
  { label: 'Hard', key: 'hard' },
  { label: 'Tricky', key: 'tricky' },
];

/**
 * Modal explaining game rules and difficulty tiers.
 */
const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="How to play"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-modal-in shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="text-white text-xl font-bold">How to Play</h2>
          <button
            onClick={onClose}
            aria-label="Close how to play"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Goal */}
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-4 text-center">
            <span className="text-3xl">🎯</span>
            <p className="text-white font-semibold mt-2">
              Find all 4 hidden emoji groups before you run out of mistakes!
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-xl flex-shrink-0 mt-0.5">{step.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{step.title}</p>
                  <p className="text-slate-400 text-sm mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Difficulty legend */}
          <div>
            <h3 className="text-slate-300 font-semibold text-sm mb-3 uppercase tracking-widest">
              Difficulty Tiers
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {DIFFICULTIES.map(({ label, key }) => {
                const s = DIFFICULTY_STYLES[key];
                return (
                  <div
                    key={key}
                    className={`rounded-xl p-3 border-2 ${s.bg} ${s.border}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                      <span className={`font-semibold text-sm ${s.text}`}>
                        {label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* One-away tip */}
          <div className="bg-slate-800 rounded-2xl p-4">
            <p className="text-slate-300 text-sm">
              <span className="text-amber-400 font-bold">Tip:</span> If 3 of your
              4 selected emojis belong to the same group, you'll see a{' '}
              <span className="text-white font-semibold">"You're one away"</span>{' '}
              hint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayModal;
