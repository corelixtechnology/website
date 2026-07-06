import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, MessageCircle, Cpu, Settings } from 'lucide-react';
import { db } from '../utils/db';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [settings, setSettings] = useState(() => db.getSettings());
  const [activeServices, setActiveServices] = useState(() => db.getServices().filter(s => s.isActive));
  const navigate = useNavigate();

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(db.getSettings());
      setActiveServices(db.getServices().filter(s => s.isActive));
    };
    window.addEventListener('wm_settings_updated', handleUpdate);
    window.addEventListener('wm_services_updated', handleUpdate);
    return () => {
      window.removeEventListener('wm_settings_updated', handleUpdate);
      window.removeEventListener('wm_services_updated', handleUpdate);
    };
  }, []);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const navItems = [
    { name: 'Home', href: '/' },
    {
      name: 'Services',
      href: '/services',
      dropdown: activeServices.map(s => ({
        label: s.title.length > 20 ? s.title.substring(0, 18) + '...' : s.title,
        href: '/services',
        state: { section: s.id }
      })),
    },
    {
      name: 'Our Works',
      href: '/works',
      dropdown: [
        { label: 'Brochures & Packages', href: '/works', state: { filter: 'brochures' } },
        { label: 'Web Design & Dev', href: '/works', state: { filter: 'web-works' } },
        { label: 'Branding & Ads', href: '/works', state: { filter: 'branding-ads' } },
      ],
    },
    {
      name: 'About Us',
      href: '/about',
      dropdown: [
        { label: 'Company Profile', href: '/about', state: { tab: 'profile' } },
        { label: 'Founder Profile', href: '/about', state: { tab: 'founders' } },
      ],
    },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' }
  ];

  const handleSubItemClick = (href, state) => {
    setIsOpen(false);
    setActiveDropdown(null);
    navigate(href, { state });
  };

  return (
    <div style={{ width: '100%', position: 'fixed', top: 0, zIndex: 1000 }}>
      {/* Dynamic Settings Promo Banner */}
      {settings.promoEnabled && settings.activePromoText && (
        <div className="promo-banner-announcement">
          <div className="container promo-banner-inner">
            <span>{settings.activePromoText}</span>
          </div>
        </div>
      )}

      <nav className="navbar-container" style={{ position: 'relative', top: 'auto' }}>
        <div className="navbar-inner glass-panel">
          {/* Logo */}
          <Link 
            to="/" 
            className="navbar-logo" 
            onClick={() => setIsOpen(false)}
            onDoubleClick={(e) => {
              e.preventDefault();
              navigate('/admin');
            }}
            title="Corelix Technology"
          >
            <Cpu className="logo-icon" />
            <span className="logo-text">Core<span className="logo-highlight">lix</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-menu-desktop">
            {navItems.map((item) => {
              if (item.dropdown && item.dropdown.length > 0) {
                return (
                  <div 
                    key={item.name} 
                    className="nav-dropdown-wrapper"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <NavLink 
                      to={item.href} 
                      className={({ isActive }) => `nav-link dropdown-trigger ${isActive ? 'active' : ''}`}
                    >
                      {item.name} <ChevronDown className="dropdown-arrow" />
                    </NavLink>
                    <div className={`dropdown-menu glass-panel ${activeDropdown === item.name ? 'show' : ''}`}>
                      {item.dropdown.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => handleSubItemClick(sub.href, sub.state)}
                          className="dropdown-item"
                          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''} ${item.isSpecial ? 'nav-link-special' : ''}`}
                >
                  {item.isSpecial && <Settings size={13} style={{ marginRight: '4px', display: 'inline' }} />}
                  {item.name}
                </NavLink>
              );
            })}
          </div>

          {/* Contacts */}
          <div className="navbar-contacts">
            <a
              href={settings.whatsappUrl || "https://wa.me/919360410038?text=I%20would%20like%20to%20discuss%20a%20new%20project!"}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn whatsapp-btn"
              title="Chat with us on WhatsApp"
            >
              <MessageCircle className="contact-icon" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${settings.phoneNumber || "9360410038"}`}
              className="contact-btn phone-btn"
              title="Call our office"
            >
              <Phone className="contact-icon" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button className="navbar-burger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar-menu-mobile glass-panel ${isOpen ? 'open' : ''}`}>
          <div className="mobile-menu-items">
            {navItems.map((item) => {
              if (item.dropdown && item.dropdown.length > 0) {
                return (
                  <div key={item.name} className="mobile-dropdown-wrapper">
                    <button 
                      onClick={() => toggleDropdown(item.name)} 
                      className="mobile-nav-link mobile-dropdown-trigger"
                    >
                      {item.name} <ChevronDown className={`dropdown-arrow ${activeDropdown === item.name ? 'rotate' : ''}`} />
                    </button>
                    <div className={`mobile-dropdown-sub ${activeDropdown === item.name ? 'show' : ''}`}>
                      {item.dropdown.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => handleSubItemClick(sub.href, sub.state)}
                          className="mobile-dropdown-item"
                          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', display: 'block', cursor: 'pointer' }}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''} ${item.isSpecial ? 'mobile-nav-special' : ''}`}
                  style={{ display: 'block' }}
                >
                  {item.name}
                </NavLink>
              );
            })}

            <div className="mobile-contacts-row">
              <a
                href={settings.whatsappUrl || "https://wa.me/919360410038?text=I%20would%20like%20to%20discuss%20a%20new%20project!"}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-contact-btn whatsapp-btn"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${settings.phoneNumber || "9360410038"}`}
                className="mobile-contact-btn phone-btn"
              >
                <Phone size={18} />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
