import React, { useState, useEffect } from 'react';
import { ExternalLink, Layers, Monitor, Heart, Info, X } from 'lucide-react';
import { db } from '../utils/db';
import SectionVideoBackground from './SectionVideoBackground';

export default function Works({ defaultFilter }) {
  const [filter, setFilter] = useState(defaultFilter || 'all');
  const [activeModal, setActiveModal] = useState(null);
  const [projects, setProjects] = useState(() => db.getWorks().filter(w => w.isActive));

  useEffect(() => {
    if (defaultFilter) {
      setFilter(defaultFilter);
    }
  }, [defaultFilter]);

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(db.getWorks().filter(w => w.isActive));
    };
    window.addEventListener('wm_works_updated', handleUpdate);
    return () => window.removeEventListener('wm_works_updated', handleUpdate);
  }, []);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'brochures', label: 'Brochures & Packages' },
    { id: 'web-works', label: 'Web Design & Dev' },
    { id: 'branding-ads', label: 'Branding & Ads' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // SVG Mockup Renderers based on type
  const renderMockup = (type) => {
    switch (type) {
      case 'brochure':
        return (
          <div className="portfolio-svg-placeholder">
            <Layers size={40} style={{ marginBottom: '1rem', color: 'var(--primary)' }} />
            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="10" width="22" height="40" rx="2" fill="rgba(139, 92, 246, 0.15)" stroke="var(--primary)" strokeWidth="2"/>
              <rect x="29" y="10" width="22" height="40" rx="2" fill="rgba(139, 92, 246, 0.25)" stroke="var(--primary)" strokeWidth="2"/>
              <rect x="53" y="10" width="22" height="40" rx="2" fill="rgba(139, 92, 246, 0.15)" stroke="var(--primary)" strokeWidth="2"/>
              <line x1="9" y1="18" x2="23" y2="18" stroke="var(--text-muted)" strokeWidth="2"/>
              <line x1="33" y1="18" x2="47" y2="18" stroke="var(--secondary)" strokeWidth="2"/>
              <line x1="57" y1="18" x2="71" y2="18" stroke="var(--text-muted)" strokeWidth="2"/>
              <circle cx="16" cy="35" r="3" fill="var(--primary)"/>
              <circle cx="40" cy="35" r="3" fill="var(--secondary)"/>
              <circle cx="64" cy="35" r="3" fill="var(--accent)"/>
            </svg>
            <span style={{ fontSize: '0.75rem', marginTop: '1rem', display: 'block' }}>Tri-Fold Print Spec</span>
          </div>
        );
      case 'package':
        return (
          <div className="portfolio-svg-placeholder">
            <Layers size={40} style={{ marginBottom: '1rem', color: 'var(--secondary)' }} />
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35 5L60 17V45L35 60L10 45V17L35 5Z" stroke="var(--secondary)" strokeWidth="2" fill="rgba(6, 182, 212, 0.1)"/>
              <path d="M10 17L35 30L60 17" stroke="var(--secondary)" strokeWidth="2"/>
              <path d="M35 30V60" stroke="var(--secondary)" strokeWidth="2"/>
              <circle cx="35" cy="18" r="4" fill="var(--accent)"/>
            </svg>
            <span style={{ fontSize: '0.75rem', marginTop: '1rem', display: 'block' }}>3D Die-Cut Package</span>
          </div>
        );
      case 'web-dashboard':
        return (
          <div className="portfolio-svg-placeholder">
            <Monitor size={40} style={{ marginBottom: '1rem', color: 'var(--primary)' }} />
            <svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="70" height="40" rx="3" fill="rgba(8, 10, 22, 0.8)" stroke="var(--primary)" strokeWidth="2"/>
              <line x1="5" y1="15" x2="75" y2="15" stroke="var(--primary)" strokeWidth="1"/>
              <rect x="10" y="20" width="15" height="20" rx="1" fill="rgba(139, 92, 246, 0.3)" stroke="var(--primary)"/>
              <circle cx="45" cy="27" r="6" stroke="var(--secondary)" strokeWidth="2" fill="rgba(6, 182, 212, 0.1)"/>
              <rect x="60" y="20" width="10" height="15" rx="1" fill="rgba(244, 63, 94, 0.2)" stroke="var(--accent)"/>
            </svg>
            <span style={{ fontSize: '0.75rem', marginTop: '1rem', display: 'block' }}>Web App Dashboard</span>
          </div>
        );
      case 'web-portal':
        return (
          <div className="portfolio-svg-placeholder">
            <Monitor size={40} style={{ marginBottom: '1rem', color: 'var(--secondary)' }} />
            <svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="70" height="40" rx="3" fill="rgba(8, 10, 22, 0.8)" stroke="var(--secondary)" strokeWidth="2"/>
              <rect x="10" y="12" width="25" height="12" rx="1" fill="rgba(6, 182, 212, 0.1)" stroke="var(--secondary)" strokeWidth="1"/>
              <rect x="40" y="12" width="30" height="12" rx="1" fill="rgba(139, 92, 246, 0.1)" stroke="var(--primary)" strokeWidth="1"/>
              <line x1="10" y1="32" x2="70" y2="32" stroke="var(--text-muted)" strokeWidth="2"/>
              <line x1="10" y1="37" x2="50" y2="37" stroke="var(--text-muted)" strokeWidth="2"/>
            </svg>
            <span style={{ fontSize: '0.75rem', marginTop: '1rem', display: 'block' }}>Portal Client Portal</span>
          </div>
        );
      case 'branding':
        return (
          <div className="portfolio-svg-placeholder">
            <Layers size={40} style={{ marginBottom: '1rem', color: 'var(--accent)' }} />
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="35" cy="35" r="25" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" fill="rgba(244, 63, 94, 0.05)"/>
              <circle cx="35" cy="35" r="12" fill="var(--primary)" stroke="var(--accent)" strokeWidth="2"/>
              <line x1="10" y1="35" x2="60" y2="35" stroke="var(--accent)" strokeWidth="1"/>
              <line x1="35" y1="10" x2="35" y2="60" stroke="var(--accent)" strokeWidth="1"/>
            </svg>
            <span style={{ fontSize: '0.75rem', marginTop: '1rem', display: 'block' }}>Vector Identity Spec</span>
          </div>
        );
      case 'ad':
      default:
        return (
          <div className="portfolio-svg-placeholder">
            <Monitor size={40} style={{ marginBottom: '1rem', color: 'var(--accent)' }} />
            <svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="70" height="40" rx="3" fill="var(--bg-darker)" stroke="var(--accent)" strokeWidth="2"/>
              <path d="M5 25L30 15L55 35L75 20" stroke="var(--secondary)" strokeWidth="2"/>
              <circle cx="55" cy="35" r="3" fill="var(--accent)"/>
              <circle cx="30" cy="15" r="3" fill="var(--primary)"/>
            </svg>
            <span style={{ fontSize: '0.75rem', marginTop: '1rem', display: 'block' }}>Marketing Campaign Banner</span>
          </div>
        );
    }
  };

  return (
    <section id="works" className="section" style={{ backgroundColor: 'var(--bg-darker)', position: 'relative', overflow: 'hidden' }}>
      <SectionVideoBackground 
        videoUrl="https://cdn.coverr.co/videos/coverr-abstract-blue-lines-4554/1080p.mp4" 
        posterUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1920&q=80"
        opacity={0.32}
        overlayGradient="radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.72) 0%, rgba(5, 7, 15, 0.94) 100%)"
      />
      <div className="ambient-glow-2"></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h2 className="section-title reveal reveal-slide-up">Our Works</h2>
        <p className="section-subtitle reveal reveal-slide-up" data-delay="0.1s">
          Take a look at the code and designs we have pushed. Each project is crafted with pixel perfection and a pinch of humor.
        </p>

        {/* Filter Buttons */}
        <div className="portfolio-filters reveal reveal-fade-in" data-delay="0.2s">
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-filter={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="portfolio-grid reveal-stagger">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`portfolio-card glass-panel reveal-item ${index % 2 === 0 ? 'reveal-slide-right' : 'reveal-slide-left'}`}
              onClick={() => setActiveModal(project)}
            >
              <div className="portfolio-img-container">
                {project.image ? (
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  renderMockup(project.svgType)
                )}
              </div>

              <div className="portfolio-card-overlay">
                <h4>{project.title}</h4>
                <p>{project.client}</p>
                <div className="portfolio-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {activeModal && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>
              <X size={20} />
            </button>

            <div className="modal-grid grid-2">
              <div className="modal-mockup">
                {activeModal.image ? (
                  <img src={activeModal.image} alt={activeModal.title} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }} />
                ) : (
                  renderMockup(activeModal.svgType)
                )}
              </div>

              <div className="modal-details">
                <span className="tag" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                  {categories.find(c => c.id === activeModal.category)?.label}
                </span>
                
                <h3>{activeModal.title}</h3>
                
                <div className="modal-meta-row" style={{ margin: '1rem 0', fontSize: '0.9rem' }}>
                  <p><strong>Client:</strong> {activeModal.client}</p>
                  <p><strong>Status:</strong> Live & Generating Profit</p>
                </div>
                
                <p className="modal-desc" style={{ marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  {activeModal.desc}
                </p>

                <div className="modal-testimonial glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <Heart size={16} color="var(--accent)" />
                    <strong style={{ fontSize: '0.85rem' }}>Client Review:</strong>
                  </div>
                  <p style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>{activeModal.rating}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal CSS overrides/appends inline */}
      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(4, 5, 11, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 2rem;
        }
        .modal-content {
          width: 100%;
          max-width: 800px;
          position: relative;
          padding: 2.5rem;
          background: var(--bg-card);
          border-radius: 20px;
          box-shadow: 0 0 50px rgba(0, 0, 0, 0.8);
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .modal-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s;
        }
        .modal-close:hover {
          color: white;
        }
        .modal-mockup {
          background: rgba(10, 12, 26, 0.5);
          border-radius: 12px;
          border: 1px solid var(--border-glass);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 4 / 3;
        }
        .modal-mockup .portfolio-svg-placeholder {
          background: transparent;
        }
        @media (max-width: 768px) {
          .modal-content {
            padding: 1.5rem;
            max-height: 90vh;
            overflow-y: auto;
          }
          .modal-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
        @keyframes modalFadeIn {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
