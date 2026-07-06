import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Heart, Mail } from 'lucide-react';
import { db } from '../utils/db';

export default function Footer() {
  const [settings, setSettings] = useState(() => db.getSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(db.getSettings());
    };
    window.addEventListener('wm_settings_updated', handleUpdate);
    return () => {
      window.removeEventListener('wm_settings_updated', handleUpdate);
    };
  }, []);

  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <h3>Core<span style={{ color: 'var(--primary)' }}>lix</span></h3>
            <p>
              An unconventional digital agency creating state-of-the-art web systems, branding packages, and high-impact designs that perform.
            </p>
            <div className="footer-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Agency</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/works">Client Work</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4>Contact Channels</h4>
            <ul className="footer-links">
              <li>
                <a href={settings.whatsappUrl || "https://wa.me/919360410038?text=I%20would%20like%20to%20discuss%20a%20new%20project!"} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MessageCircle size={16} style={{ color: '#10b981' }} /> WhatsApp Chat
                </a>
              </li>
              <li>
                <a href={`tel:${settings.phoneNumber || "9360410038"}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={16} style={{ color: 'var(--secondary)' }} /> Call {settings.phoneNumber || "9360410038"}
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.email || "corelixtechonology@gmail.com"}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={16} style={{ color: 'var(--primary)' }} /> {settings.email || "corelixtechonology@gmail.com"}
                </a>
              </li>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                📍 Head Office, Karur
              </li>
            </ul>
          </div>

          {/* Slogans */}
          <div className="footer-col">
            <h4>Hours of Work</h4>
            <ul className="footer-links" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <li>Mon - Fri: 9:00 AM - 6:00 PM EST</li>
              <li>Saturday: Closed</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        {/* Footnote */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Corelix Technology. Built with <Heart size={12} color="var(--accent)" style={{ display: 'inline', margin: '0 2px' }} /> and absolute dedication to quality.
          </p>
          <span className="footer-joke">
            Empowering brands with performance-driven code.
          </span>
        </div>
      </div>
    </footer>
  );
}
