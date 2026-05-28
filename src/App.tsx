import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import GameModal from './components/GameModal';
import StatsModal from './components/StatsModal';
import HowToPlayModal from './components/HowToPlayModal';
import Confetti from './components/Confetti';
import Footer from './components/Footer';
import { GameMode, GameState, PlayerStats, SolvedGroup } from './types';
import { getDailyPuzzle, getRandomPuzzle } from './puzzleData';
import {
  buildTiles,
  checkGuess,
  loadStats,
  recordGameResult,
  saveStats,
  shuffleArray,
} from './utils';

const MAX_MISTAKES = 4;

function buildInitialState(mode: GameMode): GameState {
  const dailyPuzzle = getDailyPuzzle();
  const puzzle = mode === 'daily' ? dailyPuzzle : getRandomPuzzle(dailyPuzzle.id);
  const allTiles = buildTiles(puzzle.groups);

  return {
    puzzle,
    mode,
    status: 'playing',
    selectedTileIds: [],
    solvedGroups: [],
    remainingTiles: shuffleArray(allTiles),
    mistakes: 0,
    startTime: Date.now(),
    endTime: null,
    shakingTileIds: [],
    oneAwayHint: false,
  };
}

function App() {
  const [gameState, setGameState] = useState<GameState>(() =>
    buildInitialState('daily')
  );
  const [stats, setStats] = useState<PlayerStats>(loadStats);
  const [showStats, setShowStats] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Show the end-of-game modal shortly after the game ends.
  useEffect(() => {
    if (gameState.status === 'won' || gameState.status === 'lost') {
      const timerId = window.setTimeout(() => setShowModal(true), 600);
      return () => window.clearTimeout(timerId);
    }
  }, [gameState.status]);

  // Trigger confetti on win.
  useEffect(() => {
    if (gameState.status === 'won') {
      setShowConfetti(true);
      const timerId = window.setTimeout(() => setShowConfetti(false), 4000);
      return () => window.clearTimeout(timerId);
    }
  }, [gameState.status]);

  /** Switch between Daily and Practice modes, starting a fresh game. */
  const handleModeChange = useCallback((mode: GameMode) => {
    setShowModal(false);
    setShowConfetti(false);
    setGameState(buildInitialState(mode));
  }, []);

  /** Handle a tile click: select/deselect, capped at 4. */
  const handleTileClick = useCallback((tileId: string) => {
    setGameState((prev) => {
      if (prev.status !== 'playing') return prev;

      const alreadySelected = prev.selectedTileIds.includes(tileId);
      if (alreadySelected) {
        return {
          ...prev,
          selectedTileIds: prev.selectedTileIds.filter((id) => id !== tileId),
          oneAwayHint: false,
        };
      }

      if (prev.selectedTileIds.length >= 4) return prev;

      return {
        ...prev,
        selectedTileIds: [...prev.selectedTileIds, tileId],
        oneAwayHint: false,
      };
    });
  }, []);

  /** Submit the current 4-tile selection. */
  const handleSubmit = useCallback(() => {
    setGameState((current) => {
      const { puzzle, selectedTileIds, solvedGroups, mistakes, startTime, mode } = current;
      if (!puzzle || current.status !== 'playing' || selectedTileIds.length !== 4) {
        return current;
      }

      const selectedTiles = current.remainingTiles.filter((tile) =>
        selectedTileIds.includes(tile.id)
      );

      if (selectedTiles.length !== 4) return current;

      const unsolvedGroups = puzzle.groups.filter(
        (group) => !solvedGroups.some((solved) => solved.id === group.id)
      );

      const result = checkGuess(selectedTiles, unsolvedGroups);

      if (result.correct && result.group) {
        const newSolvedGroup: SolvedGroup = {
          ...result.group,
          solvedAt: Date.now(),
          solveOrder: solvedGroups.length + 1,
        };
        const newSolvedGroups = [...solvedGroups, newSolvedGroup];
        const newRemainingTiles = current.remainingTiles.filter(
          (tile) => tile.groupId !== result.group?.id
        );

        const allSolved = newSolvedGroups.length === puzzle.groups.length;
        const finishedAt = allSolved ? Date.now() : null;

        if (finishedAt !== null) {
          const solveMs = finishedAt - (startTime ?? finishedAt);
          const updatedStats = recordGameResult(
            stats,
            true,
            mistakes,
            solveMs,
            puzzle.id,
            mode === 'daily'
          );
          setStats(updatedStats);
          saveStats(updatedStats);
        }

        return {
          ...current,
          solvedGroups: newSolvedGroups,
          remainingTiles: newRemainingTiles,
          selectedTileIds: [],
          status: allSolved ? 'won' : 'playing',
          endTime: finishedAt,
          oneAwayHint: false,
        };
      }

      const newMistakes = mistakes + 1;
      const lost = newMistakes >= MAX_MISTAKES;
      const finishedAt = lost ? Date.now() : null;

      if (finishedAt !== null) {
        const solveMs = finishedAt - (startTime ?? finishedAt);
        const updatedStats = recordGameResult(
          stats,
          false,
          newMistakes,
          solveMs,
          puzzle.id,
          mode === 'daily'
        );
        setStats(updatedStats);
        saveStats(updatedStats);
      }

      window.setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          shakingTileIds: [],
          selectedTileIds: [],
        }));
      }, 520);

      return {
        ...current,
        shakingTileIds: [...selectedTileIds],
        mistakes: newMistakes,
        status: lost ? 'lost' : 'playing',
        endTime: finishedAt,
        oneAwayHint: result.oneAway && !lost,
      };
    });
  }, [stats]);

  /** Shuffle the remaining tiles. */
  const handleShuffle = useCallback(() => {
    setGameState((prev) => {
      if (prev.status !== 'playing') return prev;
      return {
        ...prev,
        remainingTiles: shuffleArray(prev.remainingTiles),
        oneAwayHint: false,
      };
    });
  }, []);

  /** Clear selection. */
  const handleDeselect = useCallback(() => {
    setGameState((prev) => {
      if (prev.status !== 'playing') return prev;
      return {
        ...prev,
        selectedTileIds: [],
        oneAwayHint: false,
      };
    });
  }, []);

  /** Start a new practice game from the modal. */
  const handlePlayAgain = useCallback(() => {
    setShowModal(false);
    setShowConfetti(false);
    setGameState(buildInitialState('practice'));
  }, []);

  const {
    puzzle,
    mode,
    status,
    selectedTileIds,
    solvedGroups,
    remainingTiles,
    mistakes,
    startTime,
    endTime,
    shakingTileIds,
    oneAwayHint,
  } = gameState;

  const solveTimeMs = startTime !== null ? (endTime ?? Date.now()) - startTime : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header
        mode={mode}
        onModeChange={handleModeChange}
        onStatsOpen={() => setShowStats(true)}
        onHowToPlayOpen={() => setShowHowToPlay(true)}
      />

      {/* ── Ad placeholder: Below header banner ────────────────────────── */}
      {/* <div id="ad-below-header" className="w-full max-w-xl mx-auto px-4 pt-2">
            <div className="bg-slate-800/50 rounded-xl h-14 flex items-center justify-center text-slate-600 text-xs border border-slate-700">
              Ad Slot: Leaderboard 728x90
            </div>
          </div> */}

      <main className="flex-1 flex flex-col pb-4" id="main-content">
        {puzzle && (
          <GameBoard
            tiles={remainingTiles}
            selectedTileIds={selectedTileIds}
            shakingTileIds={shakingTileIds}
            solvedGroups={solvedGroups}
            mistakes={mistakes}
            maxMistakes={MAX_MISTAKES}
            oneAwayHint={oneAwayHint}
            puzzleTitle={puzzle.title}
            mode={mode}
            isPlaying={status === 'playing'}
            onTileClick={handleTileClick}
            onSubmit={handleSubmit}
            onShuffle={handleShuffle}
            onDeselect={handleDeselect}
          />
        )}

        {/* ── Ad placeholder: Below puzzle ───────────────────────────── */}
        {/* <div id="ad-below-puzzle" className="w-full max-w-xl mx-auto px-4 pt-3">
              <div className="bg-slate-800/50 rounded-xl h-28 flex items-center justify-center text-slate-600 text-xs border border-slate-700">
                Ad Slot: Rectangle 300x250
              </div>
            </div> */}
      </main>

      <Footer />

      {showConfetti && <Confetti />}

      {showModal && puzzle && (status === 'won' || status === 'lost') && (
        <GameModal
          status={status}
          mode={mode}
          puzzleId={puzzle.id}
          puzzleGroups={puzzle.groups}
          mistakes={mistakes}
          maxMistakes={MAX_MISTAKES}
          solveTimeMs={solveTimeMs}
          solvedGroups={solvedGroups}
          onPlayAgain={handlePlayAgain}
          onClose={() => setShowModal(false)}
        />
      )}

      {showStats && <StatsModal stats={stats} onClose={() => setShowStats(false)} />}

      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
    </div>
  );
}

export default App;
