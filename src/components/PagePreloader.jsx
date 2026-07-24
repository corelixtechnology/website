import React, { useState, useEffect } from 'react';
import footerLogo from '../assets/corelix-logo-footer.webp';

export default function PagePreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Fast progress — completes in ~360ms, doesn't block LCP
    let ticks = 0;
    const maxTicks = 8;
    const interval = setInterval(() => {
      ticks++;
      setProgress(Math.min(Math.round((ticks / maxTicks) * 100), 100));
      if (ticks >= maxTicks) {
        clearInterval(interval);
        setTimeout(() => setFadeOut(true), 80);
        setTimeout(() => setLoading(false), 380);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div className={`page-preloader-screen ${fadeOut ? 'fade-exit' : ''}`} aria-label="Loading Application">
      <div className="preloader-content-box">
        {/* Multi-Color Animated Spinning Gradient Ring */}
        <div className="preloader-ring-wrapper">
          <svg className="preloader-spinner-svg" viewBox="0 0 160 160">
            <defs>
              <linearGradient id="preloaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="35%" stopColor="#3b82f6" />
                <stop offset="70%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
              <filter id="preloaderGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Background Track Ring */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="7"
            />
            {/* Multi-Color Animated Spinner Arc */}
            <circle
              className="spinner-arc"
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="url(#preloaderGradient)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="440"
              strokeDashoffset={440 - (440 * progress) / 100}
              filter="url(#preloaderGlow)"
            />
          </svg>

          {/* Centered Brand Logo */}
          <div className="preloader-logo-container">
            <img src={footerLogo} alt="Corelix Technology Logo" className="preloader-logo-img" />
          </div>
        </div>

        {/* Loading Progress Percentage & Linear Bar */}
        <div className="preloader-progress-info">
          <div className="preloader-percentage">{progress}%</div>
          <div className="preloader-progress-track">
            <div className="preloader-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="preloader-tagline">Engineering Excellence</div>
        </div>
      </div>
    </div>
  );
}
