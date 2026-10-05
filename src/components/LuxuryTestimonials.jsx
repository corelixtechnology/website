import React from 'react';
import { Star, Quote, CheckCircle, Sparkles } from 'lucide-react';

export default function LuxuryTestimonials() {
  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Director of Academic Operations",
      company: "EASA College of Engineering",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      quote: "Corelix Technology engineered our comprehensive college web portal and syllabus management platform flawlessly. Their attention to detail, sub-second speed, and reliable support have elevated our entire academic ecosystem.",
      project: "College Portal & Syllabus Engine",
      rating: 5
    },
    {
      name: "Sanjay Patel",
      role: "Chief Operating Officer",
      company: "Lucknow Heritage Healthcare",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      quote: "The healthcare portal and CMS developed by Corelix transformed our patient booking and doctor scheduling. Our digital patient engagement surged by over 140% within the first two months.",
      project: "Hospital Portal & CMS",
      rating: 5
    },
    {
      name: "Meera Krishnan",
      role: "Founder & Creative Director",
      company: "Aura Luxury Skincare",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      quote: "The bespoke branding, 3D packaging renders, and luxury e-commerce experience crafted by Keerthivasan's team gave our brand an unmistakable presence. Truly luxury craftsmanship.",
      project: "Luxury Brand & Packaging",
      rating: 5
    },
    {
      name: "Vikram Malhotra",
      role: "Head of Product",
      company: "Nova Nest Global",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      quote: "Building our cross-platform mobile application and real-time cloud platform with Corelix was the best decision. The UI is fluid, animations are seamless, and the code quality is exceptional.",
      project: "Mobile & Cloud Platform",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="luxury-testimonials-section">
      <div className="luxury-testi-ambient-glow"></div>

      <div className="container">
        
        {/* Section Header */}
        <div className="luxury-section-header reveal reveal-slide-up">
          <div className="luxury-badge-pill">
            <span className="badge-sparkle">✦</span>
            <span>EXECUTIVE TESTIMONIALS</span>
          </div>
          <h2 className="luxury-main-heading">
            Trusted by Leaders Who Demand <span className="luxury-gradient-text">Excellence</span>
          </h2>
          <p className="luxury-sub-heading">
            Hear directly from the founders, directors, and executives who rely on Corelix Technology to build their mission-critical platforms.
          </p>
        </div>

        {/* 2x2 Testimonials Grid */}
        <div className="luxury-testimonials-grid reveal-stagger">
          {testimonials.map((item, idx) => (
            <div 
              key={idx} 
              className={`luxury-testimonial-card glass-panel reveal-item ${idx % 2 === 0 ? 'reveal-slide-right' : 'reveal-slide-left'}`}
            >
              {/* Top Row: Stars & Quote Icon */}
              <div className="testi-card-header">
                <div className="testi-stars-row">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={17} className="star-filled" fill="currentColor" />
                  ))}
                </div>
                <div className="testi-quote-icon-box">
                  <Quote size={20} className="quote-icon" />
                </div>
              </div>

              {/* Quote Text */}
              <p className="testi-quote-body">
                "{item.quote}"
              </p>

              {/* Project Badge */}
              <div className="testi-project-pill">
                <Sparkles size={13} className="sparkle-icon" />
                <span>{item.project}</span>
              </div>

              {/* Author Row with Executive Photo */}
              <div className="testi-author-row">
                <div className="testi-avatar-wrap">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="testi-avatar-photo"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="testi-verified-dot" title="Verified Client">
                    <CheckCircle size={14} className="verified-check" />
                  </span>
                </div>
                <div className="testi-author-info">
                  <h4 className="testi-author-name">{item.name}</h4>
                  <span className="testi-author-role">{item.role}</span>
                  <span className="testi-author-company">{item.company}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
