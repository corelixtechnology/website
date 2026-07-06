import React, { useState } from 'react';
import { ChevronDown, Briefcase, MapPin, Clock, CheckCircle2, User, Mail, ShieldAlert } from 'lucide-react';

export default function Careers() {
  const [openJob, setOpenJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', position: 'designer', essay: '', coffee: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleJob = (index) => {
    if (openJob === index) {
      setOpenJob(null);
    } else {
      setOpenJob(index);
    }
  };

  const jobOpenings = [
    {
      title: 'Senior UI/UX Designer',
      shortKey: 'pixel',
      dept: 'Design Team',
      type: 'Full-time / Remote',
      desc: 'We are seeking a creative UI/UX Designer who is passionate about crafting user-centric, high-converting digital products. You will lead our visual designs from concept to developer hand-off, creating cohesive design systems.',
      requirements: [
        '3+ years of professional interface design experience (Web/Mobile)',
        'Mastery of Figma, Adobe Creative Suite, and high-fidelity wireframing',
        'Strong communication skills to articulate design decisions to stakeholders',
        'Deep understanding of color theory, typography, and responsive layouts'
      ]
    },
    {
      title: 'Frontend React Developer',
      shortKey: 'code',
      dept: 'Engineering',
      type: 'Full-time / Hybrid',
      desc: 'We are looking for a Frontend React Developer to build high-performance, responsive web interfaces. You will translate static Figma mockups into interactive, optimized, and scalable React systems.',
      requirements: [
        'Deep knowledge of React, JavaScript, TypeScript, and modern responsive CSS layouts',
        'Proven debugging, code optimization, and web performance profiling skills',
        'Familiarity with Git version control, CI/CD pipelines, and modern build tools',
        'Experience with state management tools (Redux, Context API) and RESTful API integration'
      ]
    },
    {
      title: 'Backend Node.js Developer',
      shortKey: 'firefighter',
      dept: 'Database & API',
      type: 'Full-time / Office',
      desc: 'We are looking for a Backend Node.js Developer to build robust, scalable server architectures, manage database integrity, and ensure smooth data communication pipelines.',
      requirements: [
        'Strong backend experience with Node.js, Express, and RESTful API architecture',
        'Proficiency in relational (SQL) and non-relational (MongoDB) databases',
        'Understanding of containerization (Docker), cloud deployment, and system security practices',
        'Experience in database schema design, indexing, and query optimization'
      ]
    }
  ];

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
        <h2 className="section-title">Join The Team</h2>
        <p className="section-subtitle">
          We are always looking for smart minds to join us. Check out our job openings and apply below to start your journey.
        </p>

        <div className="careers-pane">
          {/* Accordion Jobs */}
          <div className="job-accordion">
            {jobOpenings.map((job, idx) => (
              <div 
                key={idx} 
                className={`job-item glass-panel ${openJob === idx ? 'open' : ''}`}
              >
                <div className="job-header" onClick={() => toggleJob(idx)}>
                  <div className="job-header-info">
                    <h4>{job.title}</h4>
                    <div className="job-subtitle-row">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <Briefcase size={12} /> {job.dept}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <MapPin size={12} /> {job.type}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="job-arrow" />
                </div>

                {openJob === idx && (
                  <div className="job-details">
                    <p>{job.desc}</p>
                    <h5 className="job-specs-title">Qualifications:</h5>
                    <ul className="job-specs-list">
                      {job.requirements.map((req, rIdx) => (
                        <li key={rIdx}>
                          <span className="job-bullet-dot"></span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => {
                        setFormData({ ...formData, position: job.shortKey });
                        document.querySelector('#apply-form-box').scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn btn-outline-cyan"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                    >
                      Apply for this Role
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Form Box */}
          <div id="apply-form-box" className="careers-apply-form glass-panel">
            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit}>
                <h3 className="form-title text-gradient-purple-cyan">Join Our Creative Team</h3>
                <p className="form-subtitle">Fill in the form below. Our recruiting team will review your application within 2-3 business days.</p>

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
                    <label>Applying Position</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="input-field"
                      style={{ background: 'rgba(10, 12, 26, 0.8)', color: 'white' }}
                    >
                      <option value="pixel">Senior UI/UX Designer</option>
                      <option value="code">Frontend React Developer</option>
                      <option value="firefighter">Backend Node.js Developer</option>
                    </select>
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
                  <label>Tell us about your experience and why you are a fit for this role</label>
                  <textarea
                    name="essay"
                    rows="4"
                    value={formData.essay}
                    onChange={handleInputChange}
                    placeholder="Describe your background, key achievements, and relevant project experience..."
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
                    Submit Job Application
                  </button>
                </div>
              </form>
            ) : (
              <div className="form-success-box">
                <CheckCircle2 className="success-icon-bounce" size={64} />
                <h3>Application Received!</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Our recruiting team will review your application and portfolio shortly.
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  We have successfully logged your portfolio link: <strong>{formData.coffee}</strong>. We will reach out to you via email.
                </p>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', position: 'pixel', essay: '', coffee: '' });
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
