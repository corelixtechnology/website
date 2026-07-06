import React from 'react';
import { Award } from 'lucide-react';
import heroMan from '../assets/hero-man.png';
import heroWoman from '../assets/hero-woman.png';

export default function Hero({ onStartCalculator }) {
  const handleExploreServices = () => {
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="new-hero-section">
      {/* Decorative Accents */}
      <div className="new-hero-bg-accent"></div>
      <div className="new-hero-dot-pattern"></div>

      <div className="new-hero-container">
        <div className="new-hero-grid-layout">
          
          {/* Left Column: Proper Business Content */}
          <div className="new-hero-text-content">
            <h1 className="new-hero-main-title">
              Engineering <span className="text-violet-highlight">Digital Solutions</span> <br />
              that Scale Your <span className="text-violet-highlight">Business</span>
            </h1>
            
            <p className="new-hero-description-paragraph">
              Empowering forward-thinking brands with premium web ecosystems, conversion-focused design systems, and high-impact digital strategies designed to drive real growth.
            </p>
            
            <div className="new-hero-button-actions">
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
          <div className="new-hero-visual-graphics">
            
            <div className="visuals-collage-grid">
              
              {/* Left Column: Portrait Businessman Card */}
              <div className="visuals-col-left-man">
                <div className="collage-portrait-card man-portrait-card">
                  <img 
                    src={heroMan} 
                    alt="Corelix Technology Senior Consultant" 
                    className="collage-photo man-photo" 
                  />
                </div>
              </div>

              {/* Right Column: Experience Badge & Businesswoman Card */}
              <div className="visuals-col-right-stack">
                
                {/* 100% Satisfaction Badge */}
                <div className="badge-experience-violet-card">
                  <div className="badge-icon-wrapper">
                    <Award size={26} className="badge-icon" />
                  </div>
                  <div className="badge-experience-text-group">
                    <span className="badge-text-primary-row">Client Success</span>
                    <span className="badge-text-secondary-row">100% Guaranteed</span>
                  </div>
                </div>

                {/* Businesswoman at Desk Card with We're Online overlay */}
                <div className="collage-portrait-card woman-portrait-card">
                  <img 
                    src={heroWoman} 
                    alt="Corelix Technology Developer at Desk" 
                    className="collage-photo woman-photo" 
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
