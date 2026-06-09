import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import GameModal from './components/GameModal';
import StatsModal from './components/StatsModal';
import HowToPlayModal from './components/HowToPlayModal';
import Confetti from './components/Confetti';
import { GameMode, GameState, PlayerStats, SolvedGroup } from './types';
import { getDailyPuzzle, getRandomPuzzle } from './puzzleData';
import Footer from './components/Footer';
import LegalPage, { LegalPageType } from './components/LegalPage';
import { SITE_CONFIG } from './config';
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

type AppPage = 'game' | LegalPageType;

const pageMeta: Record<AppPage, { title: string; description: string }> = {
  game: {
    title: `${SITE_CONFIG.siteName} — Daily Emoji Puzzle Game`,
    description:
      'Play Emoji Groups Daily, a free daily emoji grouping puzzle. Find four hidden groups of four emojis before you run out of mistakes.',
  },
  privacy: {
    title: `Privacy Policy — ${SITE_CONFIG.siteName}`,
    description:
      `Read the ${SITE_CONFIG.siteName} Privacy Policy, including details about local storage, cookies, analytics, ads, and third-party services.`,
  },
  terms: {
    title: `Terms of Use — ${SITE_CONFIG.siteName}`,
    description:
      `Read the ${SITE_CONFIG.siteName} Terms of Use for using the daily emoji puzzle website.`,
  },
  disclaimer: {
    title: `Disclaimer — ${SITE_CONFIG.siteName}`,
    description:
      `Read the ${SITE_CONFIG.siteName} disclaimer for puzzle accuracy, saved stats, third-party content, ads, and independent status.`,
  },
};

function getPageFromUrl(): AppPage {
  const normalizedHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  const normalizedPath = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
  const route = normalizedHash || normalizedPath;

  if (
    route === 'privacy' ||
    route === 'terms' ||
    route === 'disclaimer'
  ) {
    return route;
  }

  return 'game';
}

function updateMetaDescription(description: string): void {
  let descriptionTag = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]'
  );

  if (!descriptionTag) {
    descriptionTag = document.createElement('meta');
    descriptionTag.name = 'description';
    document.head.appendChild(descriptionTag);
  }

  descriptionTag.content = description;
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
  const [currentPage, setCurrentPage] = useState<AppPage>(() => getPageFromUrl());

  /** Keep the app route in sync when the user uses browser back/forward. */
useEffect(() => {
  const syncPageFromUrl = () => {
    setCurrentPage(getPageFromUrl());
    window.scrollTo({ top: 0 });
  };

  window.addEventListener('hashchange', syncPageFromUrl);
  window.addEventListener('popstate', syncPageFromUrl);

  return () => {
    window.removeEventListener('hashchange', syncPageFromUrl);
    window.removeEventListener('popstate', syncPageFromUrl);
  };
}, []);

/** Update browser title and description for the game and legal pages. */
useEffect(() => {
  const meta = pageMeta[currentPage];
  document.title = meta.title;
  updateMetaDescription(meta.description);
}, [currentPage]);

/** Navigate between the puzzle and static legal pages without adding a router dependency. */
const navigateToPage = useCallback((page: AppPage) => {
  setShowStats(false);
  setShowHowToPlay(false);
  setShowModal(false);
  setShowConfetti(false);
  setCurrentPage(page);
  window.scrollTo({ top: 0 });

  const nextUrl =
    page === 'game'
      ? `${window.location.pathname}${window.location.search}`
      : `/${page}`;

  window.history.pushState(null, '', nextUrl);
}, []);

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
      if (prev.status !== 'playing' || prev.shakingTileIds.length > 0) return prev;

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
      if (
        !puzzle ||
        current.status !== 'playing' ||
        current.shakingTileIds.length > 0 ||
        selectedTileIds.length !== 4
      ) {
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

      const puzzleId = puzzle.id;
      const gameStartedAt = startTime;
      const submittedMode = mode;
      const submittedTileIds = [...selectedTileIds];

      window.setTimeout(() => {
        setGameState((prev) => {
          const sameGuessContext =
            prev.puzzle?.id === puzzleId &&
            prev.mode === submittedMode &&
            prev.startTime === gameStartedAt;

          return {
            ...prev,
            shakingTileIds:
              sameGuessContext &&
              submittedTileIds.every((id) => prev.shakingTileIds.includes(id))
                ? []
                : prev.shakingTileIds,
            selectedTileIds:
              sameGuessContext &&
              submittedTileIds.every((id) => prev.selectedTileIds.includes(id))
                ? []
                : prev.selectedTileIds,
          };
        });
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
      if (prev.status !== 'playing' || prev.shakingTileIds.length > 0) return prev;
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
      if (prev.status !== 'playing' || prev.shakingTileIds.length > 0) return prev;
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
        onHomeClick={() => navigateToPage('game')}
      />

      {/* ── Ad placeholder: Below header banner ────────────────────────── */}
      {/* <div id="ad-below-header" className="w-full max-w-xl mx-auto px-4 pt-2">
            <div className="bg-slate-800/50 rounded-xl h-14 flex items-center justify-center text-slate-600 text-xs border border-slate-700">
              Ad Slot: Leaderboard 728x90
            </div>
          </div> */}

      {currentPage === 'game' ? (
  <>
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
          isPlaying={status === 'playing' && shakingTileIds.length === 0}
          onTileClick={handleTileClick}
          onSubmit={handleSubmit}
          onShuffle={handleShuffle}
          onDeselect={handleDeselect}
        />
      )}
    </main>
  </>
) : (
  <LegalPage page={currentPage} onBackHome={() => navigateToPage('game')} />
)}

      <Footer
  onNavigateHome={() => navigateToPage('game')}
  onNavigateLegal={navigateToPage}
  showSeoCopy={currentPage === 'game'}
/>

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
