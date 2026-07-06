import React, { useState, useEffect } from 'react';
import { Target, Eye, ShieldAlert, Award, Coffee, UserCheck, Terminal, Compass } from 'lucide-react';

export default function About({ defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab || 'profile');

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const founders = [
    {
      name: 'Alex Mercer',
      role: 'Co-Founder & Chief Technology Officer',
      bio: 'Alex directs our technical architecture, ensuring every system is scalable, secure, and built on robust modern foundations with high performance.',
      avatar: <Terminal size={56} style={{ color: 'var(--secondary)' }} />,
      stats: [
        { name: 'Systems Architecture', value: 98 },
        { name: 'Project Delivery Rate', value: 95 },
        { name: 'API Integration Speed', value: 92 },
        { name: 'Code Quality Assurance', value: 99 },
      ]
    },
    {
      name: 'Elena Vance',
      role: 'Co-Founder & Chief Design Officer',
      bio: 'Elena leads our creative and UI/UX design division, focusing on conversion-driven layouts, sleek branding assets, and premium user experiences.',
      avatar: <Compass size={56} style={{ color: 'var(--primary)' }} />,
      stats: [
        { name: 'User Interface Design', value: 99 },
        { name: 'Conversion Rate Optimization', value: 95 },
        { name: 'Brand Strategy', value: 92 },
        { name: 'User Experience Testing', value: 94 },
      ]
    }
  ];

  return (
    <section id="about" className="section">
      <div className="ambient-glow-1"></div>
      <div className="container">
        <h2 className="section-title">About Us</h2>
        <p className="section-subtitle">
          Meet the minds behind Corelix Technology. We are a dedicated team of engineers and designers building high-performance digital products for modern brands.
        </p>

        {/* Tab Selection */}
        <div className="about-profile-toggle">
          <button 
            data-tab="profile"
            onClick={() => setActiveTab('profile')}
            className={`about-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          >
            Company Profile
          </button>
          <button 
            data-tab="founders"
            onClick={() => setActiveTab('founders')}
            className={`about-tab-btn ${activeTab === 'founders' ? 'active' : ''}`}
          >
            Founders Profile
          </button>
        </div>

        {/* Company Profile Pane */}
        {activeTab === 'profile' && (
          <div className="company-profile-pane glass-panel">
            <div className="profile-intro" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h3 className="text-gradient-purple-cyan" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
                We Build the Digital Future
              </h3>
              <p style={{ maxWidth: '750px', margin: '0 auto' }}>
                Founded in 2022, Corelix Technology was established with a clear mission: to elevate the digital presence of modern brands. We achieve this by blending enterprise-grade engineering, conversions-focused design, and seamless user experiences.
              </p>
            </div>

            <div className="grid-3 values-grid">
              <div className="value-card">
                <Target className="bullet-check" style={{ width: '28px', height: '28px', marginBottom: '0.75rem', color: 'var(--secondary)' }} />
                <h4>Our Mission</h4>
                <p>To deliver highly optimized web architectures, intuitive user interfaces, and seamless transaction flows.</p>
              </div>
              <div className="value-card">
                <Eye className="bullet-check" style={{ width: '28px', height: '28px', marginBottom: '0.75rem', color: 'var(--primary)' }} />
                <h4>Our Vision</h4>
                <p>To create clean, premium, and conversion-driven digital platforms that empower startups and enterprises globally.</p>
              </div>
              <div className="value-card">
                <Award className="bullet-check" style={{ width: '28px', height: '28px', marginBottom: '0.75rem', color: 'var(--accent)' }} />
                <h4>Our Quality</h4>
                <p>We architect custom-engineered systems tailored to business objectives. No bloated templates, just clean, high-performance builds.</p>
              </div>
            </div>
          </div>
        )}

        {/* Founders Profile Pane */}
        {activeTab === 'founders' && (
          <div className="founders-pane">
            <div className="founders-grid">
              {founders.map((founder, idx) => (
                <div key={idx} className="founder-card glass-panel">
                  <div className="founder-avatar-container">
                    <div className="founder-avatar-inner">
                      {founder.avatar}
                    </div>
                  </div>

                  <h3>{founder.name}</h3>
                  <div className="founder-role">{founder.role}</div>
                  <p className="founder-bio">{founder.bio}</p>

                  {/* RPG Stats */}
                  <div className="founder-rpg-stats">
                    <h4 className="stats-title">Key Competencies</h4>
                    {founder.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="rpg-stat-row">
                        <div className="stat-info">
                          <span className="stat-name">{stat.name}</span>
                          <span className="stat-percent">{stat.value}%</span>
                        </div>
                        <div className="stat-bar-outer">
                          <div 
                            className="stat-bar-inner" 
                            style={{ 
                              width: `${stat.value}%`,
                              background: idx === 1 ? 'linear-gradient(90deg, var(--accent), var(--primary))' : 'linear-gradient(90deg, var(--primary), var(--secondary))'
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
