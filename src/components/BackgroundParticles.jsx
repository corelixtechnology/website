import React, { useMemo } from 'react';

export default function BackgroundParticles() {
  // Generate random particle settings and memoize to prevent re-rendering offsets
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 5 + 3}px`, // between 3px and 8px
      delay: `${Math.random() * -20}s`, // pre-start animation at random offset
      duration: `${Math.random() * 20 + 15}s`, // float duration 15s to 35s
      color: i % 3 === 0 ? 'var(--secondary)' : i % 3 === 1 ? 'var(--success)' : 'var(--primary)',
      opacity: Math.random() * 0.16 + 0.08, // very soft ambient lighting
    }));
  }, []);

  return (
    <div className="global-particles-container" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="global-particle-node"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow: `0 0 10px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
