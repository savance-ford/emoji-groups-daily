/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary brand teal
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Difficulty tier colors
        easy: {
          bg: '#d1fae5',
          border: '#6ee7b7',
          text: '#065f46',
          dot: '#10b981',
        },
        medium: {
          bg: '#fef3c7',
          border: '#fcd34d',
          text: '#92400e',
          dot: '#f59e0b',
        },
        hard: {
          bg: '#fee2e2',
          border: '#fca5a5',
          text: '#991b1b',
          dot: '#ef4444',
        },
        tricky: {
          bg: '#ede9fe',
          border: '#c4b5fd',
          text: '#4c1d95',
          dot: '#8b5cf6',
        },
        // Game surface colors
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      animation: {
        'tile-pop': 'tilePop 0.15s ease-out',
        'tile-shake': 'tileShake 0.5s ease-in-out',
        'group-reveal': 'groupReveal 0.4s ease-out',
        'confetti-fall': 'confettiFall 1s ease-in forwards',
        'modal-in': 'modalIn 0.25s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
        'pulse-glow': 'pulseGlow 1.5s ease-in-out infinite',
      },
      keyframes: {
        tilePop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        tileShake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '15%': { transform: 'translateX(-6px)' },
          '30%': { transform: 'translateX(6px)' },
          '45%': { transform: 'translateX(-4px)' },
          '60%': { transform: 'translateX(4px)' },
          '75%': { transform: 'translateX(-2px)' },
          '90%': { transform: 'translateX(2px)' },
        },
        groupReveal: {
          '0%': { opacity: '0', transform: 'scaleY(0.85) translateY(-8px)' },
          '100%': { opacity: '1', transform: 'scaleY(1) translateY(0)' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        modalIn: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-6px)' },
          '60%': { transform: 'translateY(-3px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(20, 184, 166, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(20, 184, 166, 0)' },
        },
      },
    },
  },
  plugins: [],
};
