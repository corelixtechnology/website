
import React, { useState, useEffect } from 'react';
import { Target, Eye, ShieldAlert, Award, Coffee, UserCheck, Terminal, Compass } from 'lucide-react';
import founderImg from '../assets/founder.png';

export default function About({ defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab || 'profile');

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const founders = [
    {
      name: 'Keerthivasan V',
      role: 'Founder & Chief Executive Officer',
      bio: 'Keerthivasan V leads Corelix Technology with a vision to build robust, high-performance, and scalable digital ecosystems. By combining cutting-edge engineering with user-centric product strategy, he is committed to driving client success and technical excellence.',
      avatar: founderImg,
      stats: [
        { name: 'Strategic Vision & Growth', value: 98 },
        { name: 'Product Engineering', value: 95 },
        { name: 'Technical Leadership', value: 97 },
        { name: 'Client Success & Delivery', value: 99 }
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
            Founder Profile
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

            <div className="grid-3 values-grid" style={{ marginBottom: '2.5rem' }}>
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

            {/* Stats Grid */}
            <div className="about-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '3rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2.5rem' }}>
              <div className="about-stat-card" style={{ textAlign: 'center' }}>
                <span className="text-gradient-purple-cyan" style={{ fontSize: '2.5rem', fontWeight: '800', display: 'block' }}>1</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>Visionary Founder</span>
              </div>
              <div className="about-stat-card" style={{ textAlign: 'center' }}>
                <span className="text-gradient-purple-cyan" style={{ fontSize: '2.5rem', fontWeight: '800', display: 'block' }}>10+</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>Dedicated Employees</span>
              </div>
              <div className="about-stat-card" style={{ textAlign: 'center' }}>
                <span className="text-gradient-purple-cyan" style={{ fontSize: '2.5rem', fontWeight: '800', display: 'block' }}>100%</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>Client Satisfaction</span>
              </div>
            </div>
          </div>
        )}

        {/* Founders Profile Pane */}
        {activeTab === 'founders' && (
          <div className="founders-pane">
            <div className="founders-grid" style={{ gridTemplateColumns: '1fr', justifyItems: 'center' }}>
              {founders.map((founder, idx) => (
                <div key={idx} className="founder-card glass-panel" style={{ maxWidth: '600px', width: '100%' }}>
                  <div className="founder-avatar-container">
                    <div className="founder-avatar-inner" style={{ padding: 0, overflow: 'hidden' }}>
                      <img 
                        src={founder.avatar} 
                        alt={founder.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
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
                              background: 'linear-gradient(90deg, var(--primary), var(--secondary))'
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
