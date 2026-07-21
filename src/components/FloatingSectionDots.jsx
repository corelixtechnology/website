import React, { useState, useEffect } from 'react';

const homeSections = [
  { id: 'home', label: 'Hero' },
  { id: 'brands', label: 'Clients' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'techstack', label: 'Technologies' },
  { id: 'contact', label: 'Contact' },
];

export default function FloatingSectionDots() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = homeSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(homeSections[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(homeSections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="floating-section-dots-wrapper" aria-label="Section Navigation">
      <div className="dots-nav-track">
        {homeSections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className={`section-dot-btn ${activeSection === sec.id ? 'active' : ''}`}
            title={`Scroll to ${sec.label}`}
          >
            <span className="dot-tooltip">{sec.label}</span>
            <span className="dot-circle" />
          </button>
        ))}
      </div>
    </div>
  );
}
