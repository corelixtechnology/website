import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Heart, Mail } from 'lucide-react';
import { db } from '../utils/db';
import footerLogo from '../assets/Corelix Technology - Logo 1.png';

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
            <Link to="/">
              <img src={footerLogo} alt="Corelix Technology Logo" className="footer-logo-img" />
            </Link>
            <p>
              Recognized as the premier <strong>Best Software Company in Tamil Nadu</strong> & <strong>Best Branding Company in Tamil Nadu</strong>. We engineer high-performance web applications, mobile apps, corporate brand design, and high-conversion SEO growth.
            </p>
            <div className="footer-socials">
              <a href={settings.whatsappUrl || "https://wa.me/919360410038?text=I%20would%20like%20to%20discuss%20a%20new%20project!"} target="_blank" rel="noopener noreferrer" className="social-icon-btn social-whatsapp" title="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.887-9.885 9.887m0-18.067c-5.83 0-10.57 4.74-10.573 10.57a10.52 10.52 0 001.597 5.56l-1.697 6.2 6.34-1.662a10.5 10.5 0 005.328 1.455h.005c5.829 0 10.57-4.74 10.573-10.57a10.505 10.505 0 00-3.097-7.469c-1.972-1.972-4.595-3.058-7.472-3.058" />
                </svg>
              </a>
              <a href="https://x.com/Corelixtech" target="_blank" rel="noopener noreferrer" className="social-icon-btn social-twitter" title="Twitter / X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/corelix-technology/" target="_blank" rel="noopener noreferrer" className="social-icon-btn social-linkedin" title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@Corelixtechnology" target="_blank" rel="noopener noreferrer" className="social-icon-btn social-youtube" title="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 8v8l6-4-6-4z" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </a>
              <a href='https://www.instagram.com/corelixtechnology' target="_blank" rel="noopener noreferrer" className="social-icon-btn social-instagram" title="Instagram">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
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
              <li><Link to="/sitemap">Sitemap</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4>Contact Channels</h4>
            <ul className="footer-links">
              <li>
                <a href={settings.whatsappUrl || "https://wa.me/919360410038?text=I%20would%20like%20to%20discuss%20a%20new%20project!"} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#25d366', fontWeight: 600 }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.887-9.885 9.887m0-18.067c-5.83 0-10.57 4.74-10.573 10.57a10.52 10.52 0 001.597 5.56l-1.697 6.2 6.34-1.662a10.5 10.5 0 005.328 1.455h.005c5.829 0 10.57-4.74 10.573-10.57a10.505 10.505 0 00-3.097-7.469c-1.972-1.972-4.595-3.058-7.472-3.058" />
                  </svg> 
                  WhatsApp Chat
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
            </ul>
          </div>

          {/* Hours of Work */}
          <div className="footer-col">
            <h4>Hours of Work</h4>
            <ul className="footer-links" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <li>Mon - Fri: 9:00 AM - 6:00 PM IST</li>
              <li>Saturday: Closed</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>

          {/* Location Map */}
          <div className="footer-col footer-map-col">
            <h4>Head Office Map</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.6rem', lineHeight: '1.4' }}>
              📍 15, Thainganagar, Sri Poonkuyil Nagar, Vengamedu, Karur, Tamil Nadu 639006
            </p>
            <div className="footer-map-container">
              <iframe
                title="Corelix Technology Footer Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7882554739663!2d78.0668583700455!3d10.979349131535121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2f059d687bef%3A0xf0fade9bdb76b0f8!2sCorelix%20technology!5e0!3m2!1sen!2sin!4v1784094136429!5m2!1sen!2sin"
                width="100%"
                height="120"
                style={{ border: 0, borderRadius: '12px', overflow: 'hidden' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>
        </div>

        {/* High-Reach SEO Keypoints & Recognition Pills */}
        <div className="footer-seo-keypoints">
          <div className="seo-keypoint-pill">
            <span className="pill-star">🏆</span>
            <span>Best Software Company in Tamil Nadu</span>
          </div>
          <div className="seo-keypoint-pill">
            <span className="pill-star">🎨</span>
            <span>Best Branding Company in Tamil Nadu</span>
          </div>
          <div className="seo-keypoint-pill">
            <span className="pill-star">⚡</span>
            <span>Top Web Development & Mobile App Agency</span>
          </div>
          <div className="seo-keypoint-pill">
            <span className="pill-star">📍</span>
            <span>Karur • Chennai • Coimbatore • Trichy</span>
          </div>
        </div>

        {/* Footnote */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Corelix Technology. Recognized as the Best Software & Branding Agency in Tamil Nadu.
          </p>
          <span className="footer-joke">
            Empowering brands with performance-driven code.
          </span>
        </div>
      </div>
    </footer>
  );
}
