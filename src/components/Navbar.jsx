import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, Phone, MessageCircle, Settings,
  Code, Palette, ShoppingCart, Image as ImageIcon, Search, TrendingUp, Megaphone, Smartphone, HelpCircle
} from 'lucide-react';
import { db } from '../utils/db';
import logo from '../assets/Corelix Technology - Logo.png';

const serviceIconMap = {
  Code: <Code size={18} />,
  Palette: <Palette size={18} />,
  ShoppingCart: <ShoppingCart size={18} />,
  Image: <ImageIcon size={18} />,
  Search: <Search size={18} />,
  TrendingUp: <TrendingUp size={18} />,
  Megaphone: <Megaphone size={18} />,
  Smartphone: <Smartphone size={18} />,
  HelpCircle: <HelpCircle size={18} />
};

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
        label: s.title,
        desc: s.desc,
        iconName: s.iconName,
        href: `/services/${s.id}`
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
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' }
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
            <img src={logo} alt="Corelix Technology Logo" className="navbar-logo-img" />
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
                    <div className={`dropdown-menu glass-panel ${activeDropdown === item.name ? 'show' : ''} ${item.name === 'Services' ? 'dropdown-menu-rich' : ''}`}>
                      {item.dropdown.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => handleSubItemClick(sub.href, sub.state)}
                          className={`dropdown-item ${item.name === 'Services' ? 'dropdown-item-rich' : ''}`}
                          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          {item.name === 'Services' && sub.iconName && (
                            <div className={`dropdown-icon-box ${activeServices.find(s => s.title === sub.label)?.themeClass || 'theme-violet'}`}>
                              {serviceIconMap[sub.iconName] || <HelpCircle size={18} />}
                            </div>
                          )}
                          <div className="dropdown-item-text">
                            <span className="dropdown-item-title">{sub.label}</span>
                            {item.name === 'Services' && sub.desc && (
                              <span className="dropdown-item-desc">
                                {sub.desc.length > 55 ? sub.desc.substring(0, 52) + '...' : sub.desc}
                              </span>
                            )}
                          </div>
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
              <svg className="contact-icon whatsapp-svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.887-9.885 9.887m0-18.067c-5.83 0-10.57 4.74-10.573 10.57a10.52 10.52 0 001.597 5.56l-1.697 6.2 6.34-1.662a10.5 10.5 0 005.328 1.455h.005c5.829 0 10.57-4.74 10.573-10.57a10.505 10.505 0 00-3.097-7.469c-1.972-1.972-4.595-3.058-7.472-3.058" />
              </svg>
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
                          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                        >
                          {item.name === 'Services' && sub.iconName && (
                            <span className="mobile-dropdown-icon" style={{ opacity: 0.8, display: 'flex', alignItems: 'center' }}>
                              {serviceIconMap[sub.iconName] || <HelpCircle size={16} />}
                            </span>
                          )}
                          <span>{sub.label}</span>
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
                <svg className="contact-icon whatsapp-svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.887-9.885 9.887m0-18.067c-5.83 0-10.57 4.74-10.573 10.57a10.52 10.52 0 001.597 5.56l-1.697 6.2 6.34-1.662a10.5 10.5 0 005.328 1.455h.005c5.829 0 10.57-4.74 10.573-10.57a10.505 10.505 0 00-3.097-7.469c-1.972-1.972-4.595-3.058-7.472-3.058" />
                </svg>
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
