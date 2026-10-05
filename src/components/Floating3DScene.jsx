import React from 'react';

export default function Floating3DScene() {
  return (
    <div className="floating-3d-scene-container" aria-hidden="true">
      {/* 3D Isometric Cube 1 (Amethyst) */}
      <div className="cube-3d cube-3d-1">
        <div className="cube-face cube-front"></div>
        <div className="cube-face cube-back"></div>
        <div className="cube-face cube-right"></div>
        <div className="cube-face cube-left"></div>
        <div className="cube-face cube-top"></div>
        <div className="cube-face cube-bottom"></div>
      </div>

      {/* 3D Isometric Cube 2 (Cyan Sapphire) */}
      <div className="cube-3d cube-3d-2">
        <div className="cube-face cube-front"></div>
        <div className="cube-face cube-back"></div>
        <div className="cube-face cube-right"></div>
        <div className="cube-face cube-left"></div>
        <div className="cube-face cube-top"></div>
        <div className="cube-face cube-bottom"></div>
      </div>

      {/* 3D Floating Ring Prism */}
      <div className="ring-3d ring-3d-1">
        <div className="ring-inner"></div>
      </div>

      {/* 3D Floating Ring Prism 2 (Gold Accent) */}
      <div className="ring-3d ring-3d-2">
        <div className="ring-inner ring-gold"></div>
      </div>
    </div>
  );
}
