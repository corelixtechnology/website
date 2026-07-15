import React from 'react';

const brands = [
  {
    name: 'EASA College of Eng. & Tech.',
    icon: (
      <svg className="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
      </svg>
    )
  },
  {
    name: 'Chettinad Cement',
    icon: (
      <svg className="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
      </svg>
    )
  },
  {
    name: 'Sai Boutiques',
    icon: (
      <svg className="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3z"/>
        <path d="M2 17l10-9 10 9M2 17h20M12 8v9M12 17v4"/>
      </svg>
    )
  },
  {
    name: 'Evoke Mens Wear',
    icon: (
      <svg className="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 4H4v2l8 8 8-8V4z"/>
        <path d="M12 14l-3 6h6l-3-6z"/>
        <circle cx="12" cy="7" r="1"/>
      </svg>
    )
  },
  {
    name: 'Apex Labs',
    icon: (
      <svg className="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 3h12M10 3v6l-4 9a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3l-4-9V3"/>
        <path d="M8.5 15h7"/>
      </svg>
    )
  },
  {
    name: 'Nova Pay',
    icon: (
      <svg className="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20M13 13l-2 3M11 13l2-3"/>
      </svg>
    )
  },
  {
    name: 'EduFlow',
    icon: (
      <svg className="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="4" cy="12" r="3"/>
        <circle cx="12" cy="6" r="3"/>
        <circle cx="20" cy="12" r="3"/>
        <path d="M6.5 10.5l3-3M14.5 7.5l3 3"/>
      </svg>
    )
  },
  {
    name: 'Zentry AI',
    icon: (
      <svg className="brand-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  }
];

export default function TrustBrands() {
  const marqueeItems = [...brands, ...brands];

  return (
    <section className="trust-brands-section">
      <div className="container">
        <h2 className="trust-brands-title reveal reveal-slide-up">Trusted by Leading Brands & Startups</h2>
        
        <div className="marquee-fade-container reveal reveal-fade-in" data-delay="0.2s">
          <div className="marquee-track-horizontal">
            {marqueeItems.map((brand, idx) => (
              <div key={idx} className="brand-logo-item">
                <div className="brand-logo-icon-wrapper">
                  {brand.icon}
                </div>
                <span className="brand-logo-name">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
