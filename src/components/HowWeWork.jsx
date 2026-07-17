import React from 'react';

export default function HowWeWork() {
  const steps = [
    {
      id: '01',
      title: 'Requirement Gathering',
      connectorType: 'right',
    },
    {
      id: '02',
      title: 'Planning & Strategy',
      connectorType: 'right',
    },
    {
      id: '03',
      title: 'UI / UX Design',
      connectorType: 'right',
    },
    {
      id: '04',
      title: 'Development',
      connectorType: 'right',
    },
    {
      id: '05',
      title: 'Testing',
      connectorType: 'right',
    },
    {
      id: '06',
      title: 'Deployment',
      connectorType: 'right',
    },
    {
      id: '07',
      title: 'Support',
      connectorType: 'none',
    }
  ];

  return (
    <section id="how-we-work" className="process-section">
      <div className="ambient-glow-1"></div>
      <div className="container">
        
        {/* Global gradients for all SVGs within the section */}
        <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
          <defs>
            <linearGradient id="connector-gradient-right" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--secondary)" />
              <stop offset="100%" stopColor="var(--success)" />
            </linearGradient>
            <linearGradient id="connector-gradient-left" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="var(--success)" />
              <stop offset="100%" stopColor="var(--secondary)" />
            </linearGradient>
            <linearGradient id="mobile-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--secondary)" />
              <stop offset="100%" stopColor="var(--success)" />
            </linearGradient>
            <linearGradient id="down-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--success)" />
              <stop offset="100%" stopColor="var(--secondary)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="process-header reveal reveal-slide-up">
          <span className="process-tag">Our Process</span>
          <h2 className="process-title">
            How We <span className="underline-highlight">Work</span>
          </h2>
          <p className="process-subtitle">
            We follow a structured, transparent digital product workflow built to turn your vision into market-ready platforms.
          </p>
        </div>

        <div className="process-grid-container reveal-stagger">
          {steps.map((step, idx) => (
            <div key={step.id} className={`process-step step-${step.id} reveal-item`}>
              <div className="process-card">
                <div className="process-circle-wrapper">
                  <div className="process-circle-orbit"></div>
                  <div className="process-icon-circle filled-circle">
                    <span>{step.id}</span>
                  </div>
                </div>
                <h3>{step.title}</h3>
              </div>
              
              {/* Desktop horizontal connector */}
              {step.connectorType !== 'none' && (
                <div className="process-connector">
                  <svg width="100%" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="flow-path" d="M 0,10 L 98,10" stroke="url(#connector-gradient-right)" strokeWidth="2.5" strokeDasharray="6 6" />
                    <path d="M 90,5 L 98,10 L 90,15" stroke="url(#connector-gradient-right)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              
              {/* Mobile vertical connector */}
              {idx < steps.length - 1 && (
                <div className="mobile-connector">
                  <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="flow-path-vertical" d="M 12,0 L 12,38" stroke="url(#mobile-gradient)" strokeWidth="2.5" strokeDasharray="6 6" />
                    <path d="M 7,32 L 12,38 L 17,32" stroke="url(#mobile-gradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

