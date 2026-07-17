import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MessageCircle, MapPin, Send, CheckCircle2, User, MessageSquare
} from 'lucide-react';
import { db } from '../utils/db';
import BackgroundParticles from './BackgroundParticles';

export default function Contact() {
  const [settings, setSettings] = useState(() => db.getSettings());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(db.getSettings());
    };

    window.addEventListener('wm_settings_updated', handleUpdate);

    return () => {
      window.removeEventListener('wm_settings_updated', handleUpdate);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!/^[+]?[0-9\s-]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.message.trim()) newErrors.message = 'Please write your message.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save submission to database (localStorage and Strapi CMS)
    await db.addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    });

    setIsSubmitted(true);
  };

  const formatPhoneNumber = (num) => {
    if (!num) return '93604 10038';
    if (num.length === 10) {
      return `+91 ${num.slice(0, 5)} ${num.slice(5)}`;
    }
    return num;
  };

  return (
    <section className="contact-page-section has-animative-bg" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative ambient elements */}
      <div className="ambient-glow-1" style={{ top: '15%', left: '-5%', opacity: 0.15 }}></div>
      <div className="ambient-glow-2" style={{ bottom: '25%', right: '-5%', opacity: 0.15 }}></div>
      <BackgroundParticles />

      <div className="container">
        {/* Header */}
        <div className="contact-page-header text-center reveal reveal-slide-up">
          <span className="services-intro-tag">Get in Touch</span>
          <h1 className="section-title text-gradient">Let's Connect & Build</h1>
          <p className="section-subtitle">
            Have a project in mind, a career inquiry, or just want to say hello? Our team is ready to collaborate and bring your ideas to life.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="contact-page-grid">
          {/* Left Column: Contact Channels */}
          <div className="contact-info-column reveal reveal-slide-left">
            <h2 className="column-title">Contact Information</h2>
            <p className="column-desc">
              Reach out to us directly through any of our channels. We are always available for consultation and support.
            </p>

            <div className="contact-channels-list">
              {/* Phone Card */}
              <a 
                href={`tel:${settings.phoneNumber || "9360410038"}`} 
                className="contact-channel-card glass-panel"
                title="Call our office"
              >
                <div className="channel-icon-box phone-theme">
                  <Phone size={22} />
                </div>
                <div className="channel-details">
                  <h3>Call Our Office</h3>
                  <p className="channel-value">{formatPhoneNumber(settings.phoneNumber)}</p>
                  <p className="channel-subtext">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a 
                href={settings.whatsappUrl || "https://wa.me/919360410038?text=I%20would%20like%20to%20discuss%20a%20new%20project!"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-channel-card glass-panel"
                title="Chat on WhatsApp"
              >
                <div className="channel-icon-box whatsapp-theme">
                  <MessageCircle size={22} />
                </div>
                <div className="channel-details">
                  <h3>WhatsApp Messenger</h3>
                  <p className="channel-value">Chat Live With Us</p>
                  <p className="channel-subtext">Instant responses during work hours</p>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href={`mailto:${settings.email || "corelixtechonology@gmail.com"}`} 
                className="contact-channel-card glass-panel"
                title="Send us an email"
              >
                <div className="channel-icon-box email-theme">
                  <Mail size={22} />
                </div>
                <div className="channel-details">
                  <h3>Drop an Email</h3>
                  <p className="channel-value">{settings.email || "corelixtechonology@gmail.com"}</p>
                  <p className="channel-subtext">Send us your RFP or official documents</p>
                </div>
              </a>

              {/* Location Card */}
              <div className="contact-channel-card glass-panel location-card-layout">
                <div className="location-info-row">
                  <div className="channel-icon-box location-theme">
                    <MapPin size={22} />
                  </div>
                  <div className="channel-details">
                    <h3>Visit Our Head Office</h3>
                    <p className="channel-value">Corelix technology
15, Thainganagar, Sri Poonkuyil Nagar, Vengamedu, Karur, Tamil Nadu 639006</p>
                    <p className="channel-subtext">📍 Serving Chennai, Coimbatore, Karur, Trichy, and all regions near you across Tamil Nadu.</p>
                  </div>
                </div>
                
                {/* Embed Map MapBox Mockup */}
                <div className="map-embed-wrapper">
                   <iframe
                    title="Corelix Technology Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7882554739663!2d78.0668583700455!3d10.979349131535121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2f059d687bef%3A0xf0fade9bdb76b0f8!2sCorelix%20technology!5e0!3m2!1sen!2sin!4v1784094136429!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="contact-socials-box glass-panel text-center">
              <h3>Connect on Social Networks</h3>
              <p>Follow our social handles for insights, tips, and company announcements.</p>
              <div className="contact-socials-row">
                <a href="https://x.com/Corelixtech" target="_blank" rel="noopener noreferrer" className="social-circle-btn" title="Twitter / X">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/corelix-technology/" target="_blank" rel="noopener noreferrer" className="social-circle-btn" title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="https://www.youtube.com/@Corelixtechnology" target="_blank" rel="noopener noreferrer" className="social-circle-btn" title="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 8v8l6-4-6-4z" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/corelixtechnology" target="_blank" rel="noopener noreferrer" className="social-circle-btn" title="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="contact-form-column reveal reveal-slide-right" data-delay="0.15s">
            <h2 className="column-title">Send a Message</h2>
            <p className="column-desc">
              Have any questions or inquiry? Fill out the form below and we will get back to you as soon as possible.
            </p>

            <div className="contact-form-card glass-panel">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="contact-form">
                  {/* Name field */}
                  <div className="input-group">
                    <label className="form-label">Full Name</label>
                    <div className="input-with-icon">
                      <User size={16} className="input-icon" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe"
                        className={`input-field ${errors.name ? 'error' : ''}`}
                      />
                    </div>
                    {errors.name && <span className="validation-error">{errors.name}</span>}
                  </div>

                  {/* Email field */}
                  <div className="input-group">
                    <label className="form-label">Email Address</label>
                    <div className="input-with-icon">
                      <Mail size={16} className="input-icon" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. john@domain.com"
                        className={`input-field ${errors.email ? 'error' : ''}`}
                      />
                    </div>
                    {errors.email && <span className="validation-error">{errors.email}</span>}
                  </div>

                  {/* Phone number field */}
                  <div className="input-group">
                    <label className="form-label">Phone Number</label>
                    <div className="input-with-icon">
                      <Phone size={16} className="input-icon" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210"
                        className={`input-field ${errors.phone ? 'error' : ''}`}
                      />
                    </div>
                    {errors.phone && <span className="validation-error">{errors.phone}</span>}
                  </div>

                  {/* Message field */}
                  <div className="input-group">
                    <label className="form-label">Message</label>
                    <div className="input-with-icon" style={{ alignItems: 'flex-start' }}>
                      <MessageSquare size={16} className="input-icon" style={{ top: '1.1rem', transform: 'none' }} />
                      <textarea
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your message details..."
                        className={`input-field textarea-field ${errors.message ? 'error' : ''}`}
                      ></textarea>
                    </div>
                    {errors.message && <span className="validation-error">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary submit-btn">
                      <span>Send Message</span>
                      <Send size={14} style={{ marginLeft: '6px' }} />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="contact-success-box text-center" style={{ padding: '3rem 1.5rem' }}>
                  <div className="success-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>
                    <CheckCircle2 size={64} style={{ color: 'var(--secondary)' }} className="success-icon-bounce" />
                  </div>
                  <h3 className="text-gradient" style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: '800' }}>
                    Message Dispatched!
                  </h3>
                  <p style={{ color: 'var(--text-main)', fontSize: '1rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                    Thank you <strong>{formData.name}</strong>, your message has been successfully sent and saved in our database.
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                    We have logged your phone number <strong>{formData.phone}</strong> and will contact you at <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ 
                        name: '', 
                        email: '', 
                        phone: '', 
                        message: '' 
                      });
                    }}
                    className="btn btn-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
