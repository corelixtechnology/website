import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Code, Folder, Info, BookOpen, Briefcase, Mail, Settings,
  Globe, Phone, MessageCircle, ArrowRight, Compass, ExternalLink,
  ShieldCheck, Heart, UserCheck, Smartphone, Palette, ShoppingCart,
  Image as ImageIcon, Search, TrendingUp, Megaphone, HelpCircle, Lock
} from 'lucide-react';
import SEO from '../components/SEO';
import { db } from '../utils/db';

const serviceIconMap = {
  Code: <Code size={20} />,
  Smartphone: <Smartphone size={20} />,
  Palette: <Palette size={20} />,
  ShoppingCart: <ShoppingCart size={20} />,
  Image: <ImageIcon size={20} />,
  Search: <Search size={20} />,
  TrendingUp: <TrendingUp size={20} />,
  Megaphone: <Megaphone size={20} />,
  HelpCircle: <HelpCircle size={20} />
};

export default function SitemapPage() {
  const [services, setServices] = useState(() => db.getServices().filter(s => s.isActive));
  const [settings, setSettings] = useState(() => db.getSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setServices(db.getServices().filter(s => s.isActive));
      setSettings(db.getSettings());
    };
    window.addEventListener('wm_services_updated', handleUpdate);
    window.addEventListener('wm_settings_updated', handleUpdate);
    return () => {
      window.removeEventListener('wm_services_updated', handleUpdate);
      window.removeEventListener('wm_settings_updated', handleUpdate);
    };
  }, []);

  const coreLinks = [
    { label: 'Home Page', href: '/', desc: 'Our corporate landing page, agency intro, and credentials overview.', icon: <Home size={18} /> },
    { label: 'Our Services', href: '/services', desc: 'Browse the full stack of high-performance digital services we render.', icon: <Code size={18} /> },
    { label: 'Client Work Portfolio', href: '/works', desc: 'Case studies, visual designs, brochures, and live application showcases.', icon: <Folder size={18} /> },
    { label: 'About Us', href: '/about', desc: 'Our team profile, values, agency history, and founding vision.', icon: <Info size={18} /> },
    { label: 'Agency Blog', href: '/blog', desc: 'Latest articles on web development, software design, and digital strategies.', icon: <BookOpen size={18} /> },
    { label: 'Careers', href: '/careers', desc: 'Join Corelix. Explore current job postings and software engineering roles.', icon: <Briefcase size={18} /> },
    { label: 'Contact Us', href: '/contact', desc: 'Get in touch for custom requests, price quotes, or project inquiries.', icon: <Mail size={18} /> }
  ];

  const workFilters = [
    { label: 'Brochures & Packages', href: '/works', state: { filter: 'brochures' }, desc: 'Eco-friendly layouts, product mockups, and corporate tri-folds.' },
    { label: 'Web Design & Dev', href: '/works', state: { filter: 'web-works' }, desc: 'React dashboards, SaaS architectures, and optimized web portals.' },
    { label: 'Branding & Ads', href: '/works', state: { filter: 'branding-ads' }, desc: 'Cohesive branding schemes, mascot styling, and targeted graphic campaigns.' }
  ];

  const contactLinks = [
    { 
      label: 'WhatsApp Chat', 
      href: settings.whatsappUrl || "https://wa.me/919360410038?text=I%20would%20like%20to%20discuss%20a%20new%20project!",
      isExternal: true, 
      desc: 'Instant message dialogue directly with our project coordinators.',
      color: '#10b981',
      icon: <MessageCircle size={18} /> 
    },
    { 
      label: `Call support: +91 ${settings.phoneNumber || "9360410038"}`, 
      href: `tel:${settings.phoneNumber || "9360410038"}`,
      isExternal: true, 
      desc: 'Call our head office line for direct inquiries (Mon-Fri).',
      color: 'var(--secondary)',
      icon: <Phone size={18} /> 
    },
    { 
      label: settings.email || "corelixtechonology@gmail.com", 
      href: `mailto:${settings.email || "corelixtechonology@gmail.com"}`,
      isExternal: true, 
      desc: 'Send pitch documents, design specifications, or formal proposals.',
      color: 'var(--primary)',
      icon: <Mail size={18} /> 
    }
  ];

  return (
    <div className="sitemap-page-wrapper" style={{ paddingTop: '8.5rem', paddingBottom: '6rem', position: 'relative' }}>
      <SEO 
        title="Website Sitemap"
        description="Navigate all sections of Corelix Technology. Access our services list, portfolio, engineering blogs, career choices, and corporate contact details."
        keywords="sitemap, site index, website navigation, page list, services directory, portfolio sections"
      />
      
      {/* Background Decorative Glow Elements */}
      <div className="ambient-glow-1" style={{ top: '10%', left: '5%', opacity: 0.8 }}></div>
      <div className="ambient-glow-2" style={{ bottom: '20%', right: '5%', opacity: 0.7 }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Page Header */}
        <header style={{ textAlign: 'center', marginBottom: '4.5rem' }} className="reveal reveal-slide-up">
          <div className="sitemap-badge" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '99px',
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            color: 'var(--accent)',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <Compass size={14} className="spin-slow" /> Website Index
          </div>
          <h1 className="section-title text-gradient" style={{ fontSize: '3rem', margin: '0.5rem 0' }}>
            Corelix Site Directory
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto' }}>
            A structured visual map of our pages, digital software divisions, work categories, and direct contact gateways.
          </p>
        </header>

        {/* Sitemap Grid */}
        <div className="grid-2 reveal-stagger" style={{ gap: '2.5rem' }}>
          {/* Column 1: Core Navigation */}
          <div className="sitemap-card glass-panel reveal-item reveal-slide-up" style={{ padding: '2.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.75rem' }}>
              <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}><Compass size={22} /></span>
              Main Pages
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {coreLinks.map((link) => (
                <Link 
                  key={link.label} 
                  to={link.href} 
                  className="sitemap-link-item"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    textDecoration: 'none',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    border: '1px solid transparent'
                  }}
                >
                  <div className="sitemap-link-icon-wrapper" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'var(--accent)',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    {link.icon}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="sitemap-link-title">
                      {link.label} <ArrowRight size={14} className="sitemap-link-arrow" style={{ opacity: 0, transform: 'translateX(-5px)', transition: 'all 0.3s ease', color: 'var(--secondary)' }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div className="sitemap-card glass-panel reveal-item reveal-slide-up" style={{ padding: '2.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.75rem' }}>
              <span style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center' }}><Code size={22} /></span>
              Services Directory
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {services.map((svc) => (
                <Link 
                  key={svc.id} 
                  to={`/services/${svc.id}`} 
                  className="sitemap-link-item"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    textDecoration: 'none',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    border: '1px solid transparent'
                  }}
                >
                  <div className="sitemap-link-icon-wrapper" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'var(--secondary)',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    {serviceIconMap[svc.iconName] || <HelpCircle size={20} />}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="sitemap-link-title">
                      {svc.title} <ArrowRight size={14} className="sitemap-link-arrow" style={{ opacity: 0, transform: 'translateX(-5px)', transition: 'all 0.3s ease', color: 'var(--primary)' }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>{svc.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Work Categories */}
          <div className="sitemap-card glass-panel reveal-item reveal-slide-up" style={{ padding: '2.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.75rem' }}>
              <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center' }}><Folder size={22} /></span>
              Works & Projects
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {workFilters.map((wf) => (
                <Link 
                  key={wf.label} 
                  to={wf.href} 
                  state={wf.state}
                  className="sitemap-link-item"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    textDecoration: 'none',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    border: '1px solid transparent'
                  }}
                >
                  <div className="sitemap-link-icon-wrapper" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'var(--success)',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    <Folder size={18} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="sitemap-link-title">
                      {wf.label} <ArrowRight size={14} className="sitemap-link-arrow" style={{ opacity: 0, transform: 'translateX(-5px)', transition: 'all 0.3s ease', color: 'var(--success)' }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>{wf.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Quick Connections */}
          <div className="sitemap-card glass-panel reveal-item reveal-slide-up" style={{ padding: '2.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.75rem' }}>
              <span style={{ color: 'var(--warning)', display: 'flex', alignItems: 'center' }}><Globe size={22} /></span>
              Contact & Social Channels
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {contactLinks.map((cl) => (
                <a 
                  key={cl.label} 
                  href={cl.href} 
                  target={cl.isExternal ? "_blank" : undefined}
                  rel={cl.isExternal ? "noopener noreferrer" : undefined}
                  className="sitemap-link-item"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    textDecoration: 'none',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    border: '1px solid transparent'
                  }}
                >
                  <div className="sitemap-link-icon-wrapper" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    color: cl.color || 'var(--warning)',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    {cl.icon}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="sitemap-link-title">
                      {cl.label} {cl.isExternal && <ExternalLink size={12} style={{ color: 'var(--text-muted)' }} />}
                      <ArrowRight size={14} className="sitemap-link-arrow" style={{ opacity: 0, transform: 'translateX(-5px)', transition: 'all 0.3s ease', color: 'var(--warning)' }} />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>{cl.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Global styling overrides injection for hover micro-animations */}
        <style dangerouslySetInnerHTML={{__html: `
          .sitemap-link-item:hover {
            background: var(--bg-glass-hover) !important;
            border-color: var(--border-glass-hover) !important;
            transform: translateY(-2px);
          }
          .sitemap-link-item:hover .sitemap-link-icon-wrapper {
            background: rgba(139, 92, 246, 0.15) !important;
            transform: scale(1.08);
          }
          .sitemap-link-item:hover .sitemap-link-arrow {
            opacity: 1 !important;
            transform: translateX(0) !important;
          }
          .spin-slow {
            animation: spin 8s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @media (max-width: 768px) {
            .sitemap-card {
              padding: 1.5rem !important;
            }
          }
        `}} />

        {/* Secure Admin Portal Link */}
        <footer style={{ marginTop: '5rem', textAlign: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '2.5rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={16} style={{ color: 'var(--success)' }} />
            Corelix Technology official site index.
          </p>
          <div style={{ marginTop: '1.25rem' }}>
            <Link 
              to="/admin" 
              className="admin-link-sitemap"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.25)',
                textDecoration: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: '1px solid transparent',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-main)';
                e.currentTarget.style.borderColor = 'var(--border-glass)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Lock size={12} /> Management Portal
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
