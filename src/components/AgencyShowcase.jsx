import React from 'react';
import { ShieldCheck, Zap, Layers, Sparkles, CheckCircle2, TrendingUp, Award, Clock } from 'lucide-react';
import founderImg from '../assets/founder.webp';

export default function AgencyShowcase() {
  const pillars = [
    {
      icon: <Zap size={24} className="pillar-icon text-cyan" />,
      title: "Sub-Second Performance",
      desc: "Built on high-speed React 19 & Next.js architectures scoring 95+ on Google Core Web Vitals for instant page loads."
    },
    {
      icon: <Sparkles size={24} className="pillar-icon text-purple" />,
      title: "Bespoke Luxury UI/UX",
      desc: "Tailored pixel-by-pixel with custom design systems, modern typography, and smooth micro-interactions. Zero generic templates."
    },
    {
      icon: <ShieldCheck size={24} className="pillar-icon text-emerald" />,
      title: "Enterprise-Grade Reliability",
      desc: "Architected with rigorous security standards, automated testing pipelines, and 99.9% high-availability cloud backends."
    },
    {
      icon: <TrendingUp size={24} className="pillar-icon text-rose" />,
      title: "Conversion-Focused Growth",
      desc: "Every flow, checkout funnel, and user journey is engineered to maximize conversion rates and scale business revenue."
    }
  ];

  const metrics = [
    { value: "50+", label: "Enterprise Projects", sub: "Delivered Globally" },
    { value: "99.9%", label: "Cloud Uptime", sub: "Production SLA" },
    { value: "4.9/5", label: "Client Satisfaction", sub: "Verified Reviews" },
    { value: "24/7", label: "Executive Support", sub: "Direct Engineering" }
  ];

  return (
    <section id="agency-showcase" className="luxury-agency-section">
      <div className="luxury-agency-glow"></div>

      <div className="container">
        
        {/* Section Header */}
        <div className="luxury-section-header reveal reveal-slide-up">
          <div className="luxury-badge-pill">
            <span className="badge-sparkle">✦</span>
            <span>THE CORELIX LUXURY STANDARD</span>
          </div>
          <h2 className="luxury-main-heading">
            Architecting Digital Platforms for <span className="luxury-gradient-text">World-Class Brands</span>
          </h2>
          <p className="luxury-sub-heading">
            We bridge deep software engineering expertise with bespoke luxury aesthetics, creating digital experiences that inspire trust and drive exponential business growth.
          </p>
        </div>

        {/* 2-Column Split Showcase */}
        <div className="luxury-showcase-grid">
          
          {/* Left: Interactive Visual Collage */}
          <div className="luxury-visuals-col reveal reveal-slide-right" data-delay="0.2s">
            <div className="luxury-media-composition">
              
              {/* Main Workspace / Engineering Photo */}
              <div className="luxury-main-photo-card glass-panel">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80" 
                  alt="Corelix Technology Engineering Team Collaborating" 
                  className="luxury-workspace-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="luxury-photo-gradient-overlay"></div>
                <div className="luxury-photo-caption">
                  <span className="caption-badge">✦ Engineering Studio</span>
                  <p>State-of-the-art digital infrastructure & modern product development.</p>
                </div>
              </div>

              {/* Founder Spotlight Floating Card */}
              <div className="luxury-founder-float-card glass-panel reveal reveal-scale-up" data-delay="0.4s">
                <div className="founder-float-avatar-wrap">
                  <img 
                    src={founderImg} 
                    alt="Keerthivasan V - Founder & CEO" 
                    className="founder-float-avatar"
                  />
                  <span className="founder-online-pulse"></span>
                </div>
                <div className="founder-float-info">
                  <strong>Keerthivasan V</strong>
                  <span>Founder &amp; CEO, Corelix Technology</span>
                  <p className="founder-quote-snippet">
                    “We don’t just build code; we craft digital assets that redefine brand authority.”
                  </p>
                </div>
              </div>

              {/* Live Metric Floating Card */}
              <div className="luxury-stat-float-card glass-panel reveal reveal-scale-up" data-delay="0.5s">
                <div className="stat-float-icon">
                  <Award size={22} className="text-purple" />
                </div>
                <div>
                  <span className="stat-float-num">100%</span>
                  <span className="stat-float-txt">On-Time Delivery</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right: The 4 Luxury Engineering Pillars */}
          <div className="luxury-pillars-col reveal reveal-slide-left" data-delay="0.2s">
            <div className="pillars-grid">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="luxury-pillar-card glass-panel reveal-item">
                  <div className="pillar-icon-box">
                    {pillar.icon}
                  </div>
                  <div className="pillar-text-group">
                    <h3 className="pillar-card-title">{pillar.title}</h3>
                    <p className="pillar-card-desc">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Feature Checklist */}
            <div className="luxury-checklist-row">
              <div className="check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>Dedicated Technical Lead</span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>Source Code Ownership</span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>24/7 Monitoring &amp; SLAs</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="luxury-metrics-strip glass-panel reveal reveal-fade-in" data-delay="0.3s">
          {metrics.map((item, idx) => (
            <div key={idx} className="luxury-metric-box">
              <span className="metric-val">{item.value}</span>
              <span className="metric-name">{item.label}</span>
              <span className="metric-sub">{item.sub}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
