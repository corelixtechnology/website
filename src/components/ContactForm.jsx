import React, { useState, useEffect } from 'react';
import { User, Mail, MessageSquare, Send, CheckCircle2, IndianRupee, Cpu } from 'lucide-react';
import { db } from '../utils/db';

export default function ContactForm({ preselectedServiceId }) {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: preselectedServiceId || 'web-dev',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load active services for dropdown
    const activeServices = db.getServices().filter(s => s.isActive);
    setServices(activeServices);
    
    if (preselectedServiceId) {
      setFormData(prev => ({ ...prev, projectType: preselectedServiceId }));
    } else if (activeServices.length > 0) {
      setFormData(prev => ({ ...prev, projectType: activeServices[0].id }));
    }

    // Check for pre-filled estimates from CoffeeCalculator
    const checkPendingEstimate = () => {
      const pendingStr = localStorage.getItem('wm_pending_estimate');
      if (pendingStr) {
        try {
          const pending = JSON.parse(pendingStr);
          setFormData(prev => ({
            ...prev,
            projectType: pending.serviceType || 'web-dev',
            budget: pending.cost || '',
            message: `Hi Corelix Technology team! I just ran your Project Scope Estimator for a "${pending.scopeName}" (${pending.packageName}). The estimation calculated around ${pending.hours} hours across ${pending.phases} development phases with a budget of $${pending.cost.toLocaleString()}.\n\nI would love to get a formal quote and discuss this project further!`
          }));
          // Clean up to prevent re-populating on refresh if they click away
          localStorage.removeItem('wm_pending_estimate');
        } catch (e) {
          console.error(e);
        }
      }
    };

    // Run once on mount and also listen to localstorage changes/custom event
    checkPendingEstimate();
    window.addEventListener('wm_estimate_applied', checkPendingEstimate);
    return () => window.removeEventListener('wm_estimate_applied', checkPendingEstimate);
  }, [preselectedServiceId]);

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
    if (!formData.message.trim()) newErrors.message = 'Please write a brief description of your project.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save submission to database (localStorage)
    db.addInquiry({
      name: formData.name,
      email: formData.email,
      projectType: formData.projectType,
      budget: formData.budget ? parseInt(formData.budget) : 0,
      message: formData.message
    });

    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="section contact-section" style={{ position: 'relative' }}>
      <div className="ambient-glow-1" style={{ top: '30%', right: '10%', opacity: 0.15 }}></div>
      <div className="container">
        <div className="contact-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="services-intro-tag">Start Your Project</span>
          <h2 className="section-title">Let's Create Something Great</h2>
          <p className="section-subtitle">
            Ready to scale your digital presence? Send us your requirements and we will return with a detailed project breakdown within 24 hours.
          </p>
        </div>

        <div className="contact-pane-wrapper">
          {!isSubmitted ? (
            <div className="contact-form-box glass-panel">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-grid">
                  <div className="input-group">
                    <label className="form-label">Your Name</label>
                    <div className="input-with-icon">
                      <User size={16} className="input-icon" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Alex Rivera"
                        className={`input-field ${errors.name ? 'error' : ''}`}
                        style={{ paddingLeft: '2.8rem' }}
                      />
                    </div>
                    {errors.name && <span className="validation-error">{errors.name}</span>}
                  </div>

                  <div className="input-group">
                    <label className="form-label">Email Address</label>
                    <div className="input-with-icon">
                      <Mail size={16} className="input-icon" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. alex@company.com"
                        className={`input-field ${errors.email ? 'error' : ''}`}
                        style={{ paddingLeft: '2.8rem' }}
                      />
                    </div>
                    {errors.email && <span className="validation-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-grid">
                  <div className="input-group">
                    <label className="form-label">Interested Service</label>
                    <div className="input-with-icon">
                      <Cpu size={16} className="input-icon" />
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="input-field select-field"
                        style={{ color: 'white', background: 'rgba(10, 12, 26, 0.95)', paddingLeft: '2.8rem' }}
                      >
                        {services.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="form-label">Project Budget (INR)</label>
                    <div className="input-with-icon">
                      <IndianRupee size={16} className="input-icon" />
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder="e.g. 5000 (Optional)"
                        className="input-field"
                        style={{ paddingLeft: '2.8rem' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label className="form-label">Project Details & Requirements</label>
                  <div className="input-with-icon" style={{ alignItems: 'flex-start' }}>
                    <MessageSquare size={16} className="input-icon" style={{ top: '1.1rem', transform: 'none' }} />
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your goals, desired features, timeline constraints, etc..."
                      className={`input-field textarea-field ${errors.message ? 'error' : ''}`}
                      style={{ resize: 'vertical', paddingLeft: '2.8rem' }}
                    ></textarea>
                  </div>
                  {errors.message && <span className="validation-error">{errors.message}</span>}
                </div>

                <div className="submit-container" style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                  <button type="submit" className="btn btn-primary submit-btn">
                    <span>Send Message</span>
                    <Send size={14} style={{ marginLeft: '6px' }} />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="contact-success-box glass-panel text-center" style={{ padding: '4rem 2rem' }}>
              <div className="success-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>
                <CheckCircle2 className="success-icon-bounce" size={64} style={{ color: 'var(--secondary)' }} />
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }} className="text-gradient">Message Dispatched!</h3>
              <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
                Thank you for contacting Corelix Technology, <strong>{formData.name}</strong>. We have logged your request under the <strong>{services.find(s => s.id === formData.projectType)?.title || 'Custom Project'}</strong> category.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                Our engineering and design partners have been notified, and we will follow up with a formal proposal draft at <strong>{formData.email}</strong>.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', projectType: services[0]?.id || 'web-dev', budget: '', message: '' });
                }}
                className="btn btn-secondary"
              >
                Submit Another Request
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
