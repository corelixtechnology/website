import React from 'react';
import { Star } from 'lucide-react';
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
              Delivering <span className="text-red-highlight">Digital Solutions</span> <br />
              that grow and scale your <span className="text-red-highlight">business</span>
            </h1>
            
            <p className="new-hero-description-paragraph">
              The right Branding, Professional Website, Internet & Social Media Presence, and Strategic digital marketing with powerful tools to transform your business to all new heights.
            </p>
            
            <div className="new-hero-button-actions">
              <button 
                id="btn-hero-explore"
                onClick={handleExploreServices} 
                className="new-btn new-btn-red-solid"
              >
                EXPLORE SERVICES
              </button>
              <button 
                id="btn-hero-quote"
                onClick={onStartCalculator} 
                className="new-btn new-btn-red-outline"
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
                
                {/* 3 Years Experience Badge */}
                <div className="badge-experience-red-card">
                  <div className="laurel-wreath-outer">
                    {/* Laurel Wreath SVG */}
                    <svg className="laurel-wreath-graphics" viewBox="0 0 100 100">
                      <path 
                        d="M 30,75 C 10,60 10,40 30,25" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                      />
                      <path 
                        d="M 70,75 C 90,60 90,40 70,25" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                      />
                      
                      {/* Leaf details */}
                      <path d="M 23,67 C 18,63 18,59 23,55" fill="none" stroke="white" strokeWidth="2.5" />
                      <path d="M 18,53 C 13,49 13,45 18,41" fill="none" stroke="white" strokeWidth="2.5" />
                      <path d="M 23,39 C 18,35 18,31 23,27" fill="none" stroke="white" strokeWidth="2.5" />
                      
                      <path d="M 77,67 C 82,63 82,59 77,55" fill="none" stroke="white" strokeWidth="2.5" />
                      <path d="M 82,53 C 87,49 87,45 82,41" fill="none" stroke="white" strokeWidth="2.5" />
                      <path d="M 77,39 C 82,35 82,31 77,27" fill="none" stroke="white" strokeWidth="2.5" />
                    </svg>
                    
                    {/* Centered Wreath Text */}
                    <div className="laurel-wreath-inner-text">
                      <span className="wreath-years-number">3</span>
                      <span className="wreath-years-label">Years</span>
                    </div>
                  </div>

                  <div className="badge-experience-text-group">
                    <span className="badge-text-primary-row">Years of</span>
                    <span className="badge-text-secondary-row">Experience</span>
                  </div>
                </div>

                {/* Businesswoman at Desk Card with We're Online overlay */}
                <div className="collage-portrait-card woman-portrait-card">
                  <img 
                    src={heroWoman} 
                    alt="Corelix Technology Developer at Desk" 
                    className="collage-photo woman-photo" 
                  />
                  
                  {/* Chat bubble overlay */}
                  <div className="online-chat-bubble-container">
                    <div className="chat-bubble-inner-flex">
                      <div className="chat-bubble-text-section">
                        <div className="chat-bubble-main-title">We're Online!</div>
                        <div className="chat-bubble-sub-text">How may I help you today?</div>
                      </div>
                      <div className="online-indicator-dot-wrapper">
                        <span className="online-pulsing-green-dot"></span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Google Rating Card - Floating Overlap */}
            <div className="google-rating-float-badge">
              <div className="google-brand-logo">
                <span className="g-letter g-letter-blue">G</span>
                <span className="g-letter g-letter-red">o</span>
                <span className="g-letter g-letter-yellow">o</span>
                <span className="g-letter g-letter-blue">g</span>
                <span className="g-letter g-letter-green">l</span>
                <span className="g-letter g-letter-red">e</span>
              </div>
              <div className="google-rating-stats">
                <span className="google-rating-number">4.7</span>
                <div className="google-stars-layout">
                  <Star size={13} fill="#ffc107" stroke="none" />
                  <Star size={13} fill="#ffc107" stroke="none" />
                  <Star size={13} fill="#ffc107" stroke="none" />
                  <Star size={13} fill="#ffc107" stroke="none" />
                  <Star size={13} fill="#ffc107" stroke="none" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
