import React, { useState } from 'react';
import { Briefcase, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Careers() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', position: 'General Application', essay: '', coffee: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error on type
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your contact number.';
    }
    if (!formData.essay.trim()) {
      newErrors.essay = 'Please write a brief summary of your experience.';
    }
    if (!formData.coffee.trim()) {
      newErrors.coffee = 'Please enter your portfolio or LinkedIn URL.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <section id="careers" className="section" style={{ backgroundColor: 'var(--bg-darker)' }}>
      <div className="ambient-glow-2"></div>
      <div className="container">
        <h2 className="section-title reveal reveal-slide-up">Join The Team</h2>
        <p className="section-subtitle reveal reveal-slide-up" data-delay="0.1s">
          There are currently no open positions available at our company. However, we are always eager to connect with extraordinary talent.
        </p>

        <div className="careers-pane">
          {/* No Openings Banner */}
          <div 
            className="glass-panel reveal reveal-slide-up" 
            style={{ 
              padding: '2.5rem 2rem', 
              textAlign: 'center', 
              borderRadius: '1.25rem', 
              border: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(15, 20, 35, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.25)', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '1.25rem' 
            }}>
              <Briefcase size={30} style={{ color: '#f87171' }} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem' }}>
              No Openings Available
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
              We currently do not have any open positions at our company. If you'd like to be considered for future job openings, you can leave your details and portfolio below.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.5rem 1.2rem', borderRadius: '50px', fontSize: '0.85rem', color: '#94a3b8' }}>
              <Clock size={15} style={{ color: '#60a5fa' }} /> Submissions will be kept on file for future opportunities
            </div>
          </div>

          {/* General Application Form */}
          <div id="apply-form-box" className="careers-apply-form glass-panel reveal reveal-scale-up" data-delay="0.2s">
            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit}>
                <h3 className="form-title text-gradient-purple-cyan">Future Opportunities Application</h3>
                <p className="form-subtitle">Submit your portfolio and profile. Our recruitment team will get in touch when a matching role opens up.</p>

                <div className="form-grid">
                  <div className="input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Jane Doe"
                      className={`input-field ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && (
                      <span className="form-validation-feedback error-text">
                        <ShieldAlert size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="input-group">
                    <label>Email Address</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. jane.doe@example.com"
                      className={`input-field ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && (
                      <span className="form-validation-feedback error-text">
                        <ShieldAlert size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-grid">
                  <div className="input-group">
                    <label>Contact Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +1 (555) 000-0000"
                      className={`input-field ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && (
                      <span className="form-validation-feedback error-text">
                        <ShieldAlert size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="input-group">
                    <label>Portfolio or LinkedIn URL</label>
                    <input
                      type="text"
                      name="coffee"
                      value={formData.coffee}
                      onChange={handleInputChange}
                      placeholder="e.g. github.com/username or linkedin.com/in/username"
                      className={`input-field ${errors.coffee ? 'error' : ''}`}
                    />
                    {errors.coffee ? (
                      <span className="form-validation-feedback error-text">
                        <ShieldAlert size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {errors.coffee}
                      </span>
                    ) : (
                      <span className="funny-helper-tip">Link your work so we can review your projects and history.</span>
                    )}
                  </div>
                </div>

                <div className="input-group">
                  <label>Applying Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    readOnly
                    className="input-field"
                    style={{ background: 'rgba(10, 12, 26, 0.8)', color: 'white', opacity: 0.85, cursor: 'not-allowed' }}
                  />
                </div>

                <div className="input-group">
                  <label>Tell us about your experience and domain of interest</label>
                  <textarea
                    name="essay"
                    rows="4"
                    value={formData.essay}
                    onChange={handleInputChange}
                    placeholder="Describe your background, key achievements, and what kind of roles you are interested in..."
                    className={`input-field ${errors.essay ? 'error' : ''}`}
                    style={{ resize: 'vertical' }}
                  ></textarea>
                  {errors.essay && (
                    <span className="form-validation-feedback error-text">
                      <ShieldAlert size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {errors.essay}
                    </span>
                  )}
                </div>

                <div className="submit-btn-container">
                  <button type="submit" className="btn btn-primary">
                    Submit General Application
                  </button>
                </div>
              </form>
            ) : (
              <div className="form-success-box reveal reveal-scale-up" data-delay="0.1s">
                <CheckCircle2 className="success-icon-bounce" size={64} />
                <h3>Application Received!</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. We have saved your application for future job openings.
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  We have successfully logged your contact number (<strong>{formData.phone}</strong>) and portfolio link (<strong>{formData.coffee}</strong>). We will reach out to you if a matching position becomes available.
                </p>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', position: 'General Application', essay: '', coffee: '' });
                  }} 
                  className="btn btn-secondary"
                  style={{ marginTop: '1.5rem' }}
                >
                  Submit Another Application
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
