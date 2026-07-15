import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Code, Palette, ShoppingCart, Image, Search, TrendingUp, 
  Megaphone, Smartphone, HelpCircle, CheckCircle, ArrowLeft, 
  ArrowRight, Layers, Monitor, X 
} from 'lucide-react';
import { db } from '../utils/db';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';

const iconMap = {
  Code: <Code size={36} />,
  Palette: <Palette size={36} />,
  ShoppingCart: <ShoppingCart size={36} />,
  Image: <Image size={36} />,
  Search: <Search size={36} />,
  TrendingUp: <TrendingUp size={36} />,
  Megaphone: <Megaphone size={36} />,
  Smartphone: <Smartphone size={36} />
};

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState(() => db.getServices());
  const [projects, setProjects] = useState(() => db.getWorks().filter(w => w.isActive));
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const handleUpdate = () => {
      setServices(db.getServices());
      setProjects(db.getWorks().filter(w => w.isActive));
    };
    window.addEventListener('wm_services_updated', handleUpdate);
    window.addEventListener('wm_works_updated', handleUpdate);
    return () => {
      window.removeEventListener('wm_services_updated', handleUpdate);
      window.removeEventListener('wm_works_updated', handleUpdate);
    };
  }, []);

  const service = services.find(s => s.id === id && s.isActive);

  if (!service) {
    return (
      <div style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <SEO title="Service Not Found" description="The requested service could not be found." />
        <HelpCircle size={64} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }} />
        <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-title)', marginBottom: '1rem' }}>Service Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center', maxWidth: '400px' }}>
          The service you are looking for does not exist or has been disabled by the administrator.
        </p>
        <Link to="/services" className="contact-btn phone-btn" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} />
          <span>Back to All Services</span>
        </Link>
      </div>
    );
  }

  // Filter projects by category
  const categoryMap = {
    'web-dev': 'web-works',
    'app-dev': 'web-works',
    'ecommerce': 'web-works',
    'branding': 'branding-ads',
    'posters': 'brochures',
    'seo': 'web-works',
    'meta-ads': 'branding-ads',
    'digital-marketing': 'branding-ads',
  };
  const targetCategory = categoryMap[service.id] || 'web-works';
  const relatedProjects = projects.filter(p => p.category === targetCategory);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'brochures', label: 'Brochures & Packages' },
    { id: 'web-works', label: 'Web Design & Dev' },
    { id: 'branding-ads', label: 'Branding & Ads' },
  ];

  // SVG Mockup Renderer
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

  const handleInquireClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ paddingTop: '4.5rem' }}>
      <SEO 
        title={service.title}
        description={service.desc}
        keywords={`${service.title.toLowerCase()}, webmakers services, custom ${service.title.toLowerCase()}`}
      />

      {/* Service Hero Section */}
      <section className={`service-detail-hero section ${service.themeClass || 'theme-violet'}`} style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="ambient-glow-1" style={{ top: '20%', left: '10%' }}></div>
        <div className="ambient-glow-2" style={{ bottom: '10%', right: '10%' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Link to="/services" className="back-services-link">
            <ArrowLeft size={16} />
            <span>All Services</span>
          </Link>

          <div className="service-detail-hero-content">
            <div className="service-detail-icon-large">
              {iconMap[service.iconName] || <HelpCircle size={36} />}
            </div>
            
            <h1 className="service-detail-title text-gradient">{service.title}</h1>
            <p className="service-detail-desc">{service.desc}</p>
            
            <div className="service-detail-ctas">
              <button onClick={handleInquireClick} className="cta-btn-primary">
                <span>Start Your {service.title} Project</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Details & Bullets Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-darker)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div className="service-detail-features-text">
              <span className="services-intro-tag">Core Value Offerings</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>What We Bring to the Table</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>
                We don't do cookie-cutter solutions. Our methodology centers around bespoke engineering and high-end aesthetics crafted specifically to fit your brand identity and business metrics.
              </p>

              <div className="tech-pills-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                {service.pills && service.pills.map((pill, i) => (
                  <span key={i} className="service-intro-pill" style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem' }}>
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="service-features-grid glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRadius: '16px' }}>
              {service.bullets && service.bullets.map((bullet, idx) => (
                <div key={idx} className="service-detail-bullet-item" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div className={`service-bullet-icon-box ${service.themeClass || 'theme-violet'}`} style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.15rem' }}>
                    <CheckCircle size={22} className="bullet-check" style={{ color: 'inherit' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{bullet}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tailored execution using industry-standard modern frameworks and workflows.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Portfolio Section */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="services-intro-tag">Related Portfolio</span>
            <h2 className="section-title">Projects We've Built</h2>
            <p className="section-subtitle">
              Here is a curated showcase of work in the {service.title} domain. Each project represents top-tier engineering and design.
            </p>
          </div>

          {relatedProjects.length > 0 ? (
            <div className="portfolio-grid">
              {relatedProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="portfolio-card glass-panel"
                  onClick={() => setActiveModal(project)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="portfolio-img-container">
                    {renderMockup(project.svgType)}
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
          ) : (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem', borderRadius: '16px' }}>
              <HelpCircle size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-title)' }}>Our Next Success Story Could Be You!</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
                We haven't uploaded catalog cases for this specific service type to our dashboard yet, but we are fully equipped and ready to engineer your solution.
              </p>
              <button onClick={handleInquireClick} className="contact-btn phone-btn" style={{ padding: '0.75rem 1.5rem', margin: '0 auto' }}>
                <span>Launch Your Project</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Inquiry Form Preselected Section */}
      <div id="contact-wrapper">
        <ContactForm preselectedServiceId={service.id} />
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
                {renderMockup(activeModal.svgType)}
              </div>

              <div className="modal-details">
                <span className="tag" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                  {categories.find(c => c.id === activeModal.category)?.label || 'Bespoke Work'}
                </span>
                
                <h3>{activeModal.title}</h3>
                
                <div className="modal-meta-row" style={{ margin: '1rem 0', fontSize: '0.9rem' }}>
                  <p><strong>Client:</strong> {activeModal.client}</p>
                  <p><strong>Status:</strong> Live & Generating Profit</p>
                </div>
                
                <p className="modal-desc" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  {activeModal.desc}
                </p>

                <div className="portfolio-tags" style={{ marginBottom: '2rem' }}>
                  {activeModal.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    setActiveModal(null);
                    handleInquireClick();
                  }}
                  className="contact-btn phone-btn"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
                >
                  Inquire About Similar Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
