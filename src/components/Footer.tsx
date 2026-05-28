import React from 'react';

/**
 * Site footer with info links, SEO copy, and ad placeholders.
 */
const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-8 border-t border-slate-800">
      {/* ── Ad placeholder: Footer banner ──────────────────────────────── */}
      {/* <div id="ad-footer" className="w-full max-w-xl mx-auto px-4 py-3">
            <div className="bg-slate-800/50 rounded-xl h-16 flex items-center justify-center text-slate-600 text-xs border border-slate-700">
              Ad Slot: Footer Banner 728x90
            </div>
          </div> */}

      {/* SEO copy section */}
      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h2 className="text-white font-bold text-base mb-2">
            What is Emoji Groups Daily?
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Emoji Groups Daily is a free daily emoji category puzzle game. Each
            day you're presented with 16 emoji tiles hiding 4 secret groups of 4.
            Your challenge is to figure out what each group has in common and
            match them up — before you run out of mistakes!
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-base mb-2">How to Play</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Select 4 emoji tiles you think share a hidden theme, then press
            Submit. Solve all 4 groups to win. You have 4 mistakes to spare —
            use them wisely. A new puzzle drops every day, and you can also
            practice anytime with a random puzzle.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-base mb-2">
            Why Emoji Puzzles Are Fun
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Emoji are a universal language. They spark quick associations and
            clever misdirections that make for satisfying "aha!" moments. Emoji
            Groups Daily is quick to play, easy to share, and surprisingly
            tricky — the perfect daily brain warm-up.
          </p>
        </div>

        <div>
          <h2 className="text-white font-bold text-base mb-2">
            New Puzzle Every Day
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Every visitor gets the same puzzle on the same day — so you can
            share your score and compare notes with friends. Come back daily to
            keep your streak alive!
          </p>
        </div>
      </div>

      {/* Footer nav */}
      <div className="border-t border-slate-800 max-w-xl mx-auto px-4 py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <span className="text-lg" aria-hidden="true">🧩</span>
            <span className="text-slate-400 text-sm font-semibold">
              Emoji Groups Daily
            </span>
          </div>

          <nav
            className="flex flex-wrap gap-4"
            aria-label="Footer navigation"
          >
            {[
              { label: 'About', href: '#' },
              { label: 'Privacy Policy', href: '#' },
              { label: 'Contact', href: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="text-slate-600 text-xs mt-4 text-center">
          More emoji games coming soon ·{' '}
          <span className="text-slate-500">© {new Date().getFullYear()} Emoji Groups Daily</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
