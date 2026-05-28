import React, { useEffect, useState } from 'react';

const COLORS = ['#2dd4bf', '#f59e0b', '#34d399', '#60a5fa', '#f87171', '#a78bfa'];
const COUNT = 40;

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
}

/**
 * Lightweight CSS confetti burst on win. Auto-removes after animation.
 * Respects prefers-reduced-motion.
 */
const Confetti: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(false);
      return;
    }

    setParticles(
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 8,
        duration: 1.2 + Math.random() * 0.8,
        delay: Math.random() * 0.6,
        rotate: Math.random() * 360,
      }))
    );

    // Remove after animations finish
    const t = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!visible || particles.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
