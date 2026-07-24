import React, { useEffect, useRef } from 'react';

/**
 * AnimatedBackgroundVideo
 * ─────────────────────────────────────────────────────────────────────────────
 * Performance-optimised background animation.
 * 
 * BEFORE: Loaded two external 1080p videos from cdn.coverr.co + mixkit.co
 *         → blocked LCP, caused 14.5s delay on slow 4G connections
 * 
 * NOW: Canvas-only particle network animation.
 *      Zero external requests. Starts after page loads (requestIdleCallback).
 *      Particle count adapts to screen width (less on mobile = less CPU).
 */
export default function AnimatedBackgroundVideo() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Reduce particle count on mobile to spare CPU/battery
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 18 : 38;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Generate floating cyber particles & glowing nodes
    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.45 + 0.15,
      color: Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle cyber grid lines (skip on mobile for perf)
      if (!isMobile) {
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.04)';
        ctx.lineWidth = 1;
        const gridSize = 80;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }
      }

      // Draw connected particle network
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move particle
        p1.x += p1.vx;
        p1.y += p1.vy;
        if (p1.x < 0 || p1.x > width)  p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - dist / 130) * 0.14;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    // Defer animation start until browser is idle — don't compete with LCP
    const startAnimation = () => render();
    if ('requestIdleCallback' in window) {
      requestIdleCallback(startAnimation, { timeout: 500 });
    } else {
      setTimeout(startAnimation, 100);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="animated-bg-video-wrapper" aria-hidden="true">
      {/* Canvas-only particle network — no external video requests */}
      <canvas
        ref={canvasRef}
        className="animated-bg-canvas"
        style={{ willChange: 'transform' }}
      />

      {/* Dark Ambient Glass Overlay for 100% Text Legibility */}
      <div className="animated-bg-overlay" />
    </div>
  );
}
