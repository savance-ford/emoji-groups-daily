import React from 'react';

interface EmojiTileProps {
  emoji: string;
  isSelected: boolean;
  isShaking: boolean;
  disabled: boolean;
  onClick: () => void;
}

/**
 * Individual emoji tile in the game grid.
 * Handles selection state, shake animation on wrong guess,
 * and pop animation on selection.
 */
const EmojiTile: React.FC<EmojiTileProps> = ({
  emoji,
  isSelected,
  isShaking,
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Emoji tile: ${emoji}${isSelected ? ', selected' : ''}`}
      aria-pressed={isSelected}
      className={[
        'relative flex items-center justify-center rounded-2xl',
        'text-3xl sm:text-4xl select-none',
        'w-full aspect-square transition-all duration-150',
        'border-2 font-medium touch-manipulation',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
        disabled ? 'cursor-default opacity-80' : 'cursor-pointer',
        isSelected
          ? 'bg-slate-700 border-teal-400 scale-[0.97] shadow-lg shadow-teal-500/20'
          : 'bg-slate-800 border-slate-700 hover:border-slate-500 hover:bg-slate-700 hover:scale-[1.04]',
        isShaking ? 'animate-tile-shake' : '',
        isSelected ? 'animate-tile-pop' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isSelected && (
        <span
          className="absolute top-1 right-1.5 text-[10px] text-teal-400 font-bold leading-none"
          aria-hidden="true"
        >
          ✓
        </span>
      )}
      <span role="img" aria-hidden="true">
        {emoji}
      </span>
    </button>
  );
};

export default EmojiTile;
