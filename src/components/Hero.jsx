import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { db } from '../utils/db';

// Hero images served from /public — preloaded in index.html for early browser discovery
const heroMan   = '/hero-man.webp';
const heroWoman = '/hero-woman.webp';

export default function Hero({ onStartCalculator }) {
  const [settings, setSettings] = useState(() => db.getSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(db.getSettings());
    };
    window.addEventListener('wm_settings_updated', handleUpdate);
    return () => window.removeEventListener('wm_settings_updated', handleUpdate);
  }, []);

  const handleExploreServices = () => {
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroTitle = settings.heroTitle || 'Engineering Digital Solutions that Scale Your Business';
  const heroSubtitle = settings.heroSubtitle || 'Empowering forward-thinking brands with premium web ecosystems, conversion-focused design systems, and high-impact digital strategies designed to drive real growth.';

  return (
    <section id="home" className="new-hero-section">
      {/* Decorative Accents */}
      <div className="new-hero-bg-accent"></div>
      <div className="new-hero-dot-pattern"></div>

      <div className="new-hero-container">
        <div className="new-hero-grid-layout">
          
          {/* Left Column: Proper Business Content */}
          <div className="new-hero-text-content">
            <h1 className="new-hero-main-title reveal reveal-slide-right">
              {heroTitle.includes('Engineering') ? (
                <>
                  Engineering <span className="text-violet-highlight">Digital Solutions</span> <br />
                  that Scale Your <span className="text-violet-highlight">Business</span>
                </>
              ) : (
                <span>{heroTitle}</span>
              )}
            </h1>
            
            <p className="new-hero-description-paragraph reveal reveal-slide-right" data-delay="0.15s">
              {heroSubtitle}
            </p>
            
            <div className="new-hero-button-actions reveal reveal-slide-right" data-delay="0.3s">
              <button 
                id="btn-hero-explore"
                onClick={handleExploreServices} 
                className="new-btn new-btn-violet-solid"
              >
                EXPLORE SERVICES
              </button>
              <button 
                id="btn-hero-quote"
                onClick={onStartCalculator} 
                className="new-btn new-btn-violet-outline"
              >
                GET QUOTE
              </button>
            </div>
          </div>

          {/* Right Column: Premium Business Graphics & Badges */}
          <div className="new-hero-visual-graphics reveal reveal-slide-left" data-delay="0.2s">
            
            <div className="visuals-collage-grid">
              
              {/* Left Column: Portrait Businessman Card */}
              <div className="visuals-col-left-man reveal reveal-scale-up" data-delay="0.2s">
                <div className="collage-portrait-card man-portrait-card">
                  <img 
                    src={heroMan} 
                    alt="Corelix Technology Senior Consultant" 
                    className="collage-photo man-photo"
                    fetchpriority="high"
                    loading="eager"
                    decoding="async"
                    width="400"
                    height="500"
                  />
                </div>
              </div>

              {/* Right Column: Experience Badge & Businesswoman Card */}
              <div className="visuals-col-right-stack">
                
                {/* 100% Satisfaction Badge */}
                <div className="badge-experience-violet-card reveal reveal-scale-up" data-delay="0.4s">
                  <div className="badge-icon-wrapper">
                    <Award size={26} className="badge-icon" />
                  </div>
                  <div className="badge-experience-text-group">
                    <span className="badge-text-primary-row">Client Success</span>
                    <span className="badge-text-secondary-row">100% Guaranteed</span>
                  </div>
                </div>

                {/* Businesswoman at Desk Card with We're Online overlay */}
                <div className="collage-portrait-card woman-portrait-card reveal reveal-scale-up" data-delay="0.3s">
                  <img 
                    src={heroWoman} 
                    alt="Corelix Technology Developer at Desk" 
                    className="collage-photo woman-photo" 
                    fetchpriority="high"
                    loading="eager"
                    decoding="async"
                    width="400"
                    height="460"
                  />
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
