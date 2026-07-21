import React, { useRef } from 'react';

export default function SectionVideoBackground({ videoUrl, posterUrl, overlayGradient, opacity = 0.35 }) {
  const videoRef = useRef(null);

  return (
    <div className="section-video-bg-container" aria-hidden="true">
      <video
        ref={videoRef}
        className="section-video-bg-element"
        autoPlay
        loop
        muted
        playsInline
        poster={posterUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80'}
        style={{ opacity }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div 
        className="section-video-bg-overlay"
        style={{ 
          background: overlayGradient || 'radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.75) 0%, rgba(7, 10, 19, 0.94) 100%)' 
        }} 
      />
    </div>
  );
}
