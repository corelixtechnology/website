import React from 'react';

const techData = [
  {
    name: 'HTML5',
    category: 'Core Web',
    glowClass: 'glow-html',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.5 2h-17l1.5 17 7 3 7-3 1.5-17z"/>
        <path d="M12 5.5v11.5l4-1.5.5-5.5H12"/>
        <path d="M12 5.5H8.5l.5 3h3"/>
      </svg>
    )
  },
  {
    name: 'CSS3',
    category: 'Core Web',
    glowClass: 'glow-css',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.5 2h-17l1.5 17 7 3 7-3 1.5-17z"/>
        <path d="M12 5.5v11.5l4-1.5.5-5.5H12"/>
        <path d="M8 8.5h4v3H8"/>
      </svg>
    )
  },
  {
    name: 'JavaScript',
    category: 'Core Web',
    glowClass: 'glow-js',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M12 15h2.5c.8 0 1.5-.7 1.5-1.5V12c0-.8-.7-1.5-1.5-1.5H12M8.5 11h2c.8 0 1.5.7 1.5 1.5v1c0 .8-.7 1.5-1.5 1.5h-2"/>
      </svg>
    )
  },
  {
    name: 'React JS',
    category: 'Frameworks',
    glowClass: 'glow-react',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"/>
        <circle cx="12" cy="12" r="1.5"/>
      </svg>
    )
  },
  {
    name: 'Node JS',
    category: 'Frameworks',
    glowClass: 'glow-node',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
        <path d="M12 6.5l6 3.5v4l-6 3.5-6-3.5v-4z"/>
      </svg>
    )
  },
  {
    name: 'PHP',
    category: 'Core Web',
    glowClass: 'glow-php',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="6"/>
        <path d="M7 15V9h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 3H7zm8 0V9h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 3h-2z"/>
      </svg>
    )
  },
  {
    name: 'Angular',
    category: 'Frameworks',
    glowClass: 'glow-angular',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 5.5l1.5 12.5 8.5 4 8.5-4 1.5-12.5L12 2z"/>
        <path d="M12 6l4.5 9h-9L12 6z"/>
      </svg>
    )
  },
  {
    name: 'MongoDB',
    category: 'Databases',
    glowClass: 'glow-mongo',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C8 6 8 13 12 22c4-9 4-16 0-20z"/>
        <path d="M9.5 12c1 2 2.5 3 2.5 3s1.5-1 2.5-3"/>
      </svg>
    )
  },
  {
    name: 'Git',
    category: 'Tools',
    glowClass: 'glow-git',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="18" r="3"/>
        <circle cx="6" cy="6" r="3"/>
        <circle cx="6" cy="18" r="3"/>
        <path d="M6 9v6M6 12c3 0 6 3 6 3l3 3"/>
      </svg>
    )
  },
  {
    name: 'Figma',
    category: 'Tools',
    glowClass: 'glow-figma',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
        <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
        <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-7 0z"/>
        <path d="M12 2h3.5a3.5 3.5 0 0 1 0 7H12V2z"/>
        <path d="M12 9h3.5a3.5 3.5 0 0 1 3.5 3.5v0a3.5 3.5 0 0 1-3.5 3.5H12V9z"/>
      </svg>
    )
  },
  {
    name: 'Wix',
    category: 'Tools',
    glowClass: 'glow-wix',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 7l3 10 3-10h2l-4 12H3L1 7zM10 7h2v10h-2zM15 7l2 4 2-4h2l-3 5 3 5h-2l-2-4-2 4h-2l3-5-3-5z"/>
      </svg>
    )
  },
  {
    name: 'GitHub',
    category: 'Tools',
    glowClass: 'glow-github',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    )
  },
  {
    name: 'AWS',
    category: 'Cloud',
    glowClass: 'glow-aws',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 13a9 9 0 0 0 18 0M6 9h1M11 9h1M16 9h1"/>
        <path d="M3 15s4 4 9 4 9-4 9-4"/>
      </svg>
    )
  },
  {
    name: 'MySQL',
    category: 'Databases',
    glowClass: 'glow-mysql',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12c0-5 4-9 10-9s10 4 10 9-4 9-10 9S2 17 2 12z"/>
        <path d="M12 7c-2 1-3 3-3 5s1 4 3 5 3-3 3-5-1-4-3-5z"/>
      </svg>
    )
  },
  {
    name: 'Azure',
    category: 'Cloud',
    glowClass: 'glow-azure',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 19h14L10 9zM6 19l6-14 10 14H18z"/>
      </svg>
    )
  },
  {
    name: 'Google Cloud',
    category: 'Cloud',
    glowClass: 'glow-gcp',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    )
  },
  {
    name: 'Flutter',
    category: 'Mobile & Apps',
    glowClass: 'glow-flutter',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 2L10 11l9 9M13 2l-9 9 9 9" />
      </svg>
    )
  },
  {
    name: 'FlutterFlow',
    category: 'Mobile & Apps',
    glowClass: 'glow-flutterflow',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <path d="M12 18h.01"/>
        <path d="M8 6h8M8 10h8M8 14h5"/>
      </svg>
    )
  },
  {
    name: 'Laravel',
    category: 'Frameworks',
    glowClass: 'glow-laravel',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
        <path d="M12 22V12m10-5l-10 5M2 7l10 5"/>
        <path d="M7 9.5v5l5 2.5"/>
      </svg>
    )
  },
  {
    name: 'MVPs & Prototyping',
    category: 'Process & Launch',
    glowClass: 'glow-mvp',
    icon: (
      <svg className="tech-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 5.5h6c0-2-1-4-2.5-5.5z"/>
        <path d="M12 2C7 6 6 12 6 16c4 0 10-1 14-6-4-1-8-3-12-8z"/>
        <path d="M9 15l3-3"/>
      </svg>
    )
  }
];

export default function TechStack() {
  return (
    <section className="tech-stack-section">
      <div className="container">
        <h2 className="tech-stack-title text-gradient">Technologies We Leverage</h2>
        <p className="tech-stack-subtitle">
          We use state-of-the-art technologies, robust languages, and leading cloud networks to build high-performance products.
        </p>

        <div className="tech-grid">
          {techData.map((tech, index) => (
            <div key={index} className={`tech-card ${tech.glowClass}`}>
              <div className="tech-icon-box">
                {tech.icon}
              </div>
              <div className="tech-info-box">
                <span className="tech-name-label">{tech.name}</span>
                <span className="tech-category-label">{tech.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
