import React from 'react';
import { Star, Quote, CheckCircle, Sparkles } from 'lucide-react';

export default function LuxuryTestimonials() {
  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Director of Academic Operations",
      company: "EASA College of Engineering",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      quote: "Managing thousands of students and faculty online used to be a constant headache. The platform Corelix built made things so smooth and intuitive that our staff actually enjoys using it every day.",
      project: "College Portal & Syllabus Engine",
      rating: 5
    },
    {
      name: "Sanjay Patel",
      role: "Chief Operating Officer",
      company: "Lucknow Heritage Healthcare",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      quote: "Our patients love how easy it is to book appointments now. Corelix didn't just write code for us—they took the time to understand our clinic's chaotic daily flow and fixed our real problems.",
      project: "Hospital Portal & CMS",
      rating: 5
    },
    {
      name: "Meera Krishnan",
      role: "Founder & Creative Director",
      company: "Aura Luxury Skincare",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      quote: "As a luxury brand, design means everything to us. Keerthivasan’s team brought a rare artistic touch to our 3D packaging and online store. Our customers constantly tell us how gorgeous the website feels.",
      project: "Luxury Brand & Packaging",
      rating: 5
    },
    {
      name: "Vikram Malhotra",
      role: "Head of Product",
      company: "Nova Nest Global",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      quote: "Finding developers who build clean UI *and* care about backend reliability is rare. Working with Corelix felt like having an in-house team that was just as passionate about our app as we were.",
      project: "Mobile & Cloud Platform",
      rating: 5
    },
    {
      name: "Karthik Iyer",
      role: "Chief Technology Officer",
      company: "NovaPay",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
      quote: "Handling live payments leaves zero room for error. The Corelix engineers felt like true partners—always reachable, calm under pressure, and obsessed with making our payment flows rock solid.",
      project: "Fintech Payment Gateway",
      rating: 5
    },
    {
      name: "R. Ramanathan",
      role: "VP of Supply Chain",
      company: "Chettinadu Cement",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
      quote: "Heavy industry logistics gets messy fast. Corelix helped us digitize our fleet tracking without overwhelming our ground staff. It’s saved us countless hours of manual phone calls.",
      project: "Enterprise Logistics Engine",
      rating: 5
    },
    {
      name: "Dr. Ananya Sharma",
      role: "Head of Clinical Research",
      company: "Apex Lab",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80",
      quote: "Lab report accuracy is critical for our patients. Corelix delivered a system that keeps our data secure and cut down our lab technicians' paperwork load significantly.",
      project: "Diagnostic Lab Suite",
      rating: 5
    },
    {
      name: "Divya Sundaram",
      role: "Managing Director",
      company: "Sai Boutiques",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
      quote: "Translating the warmth of an offline boutique experience into an online storefront isn't easy. The team nailed the aesthetic, and our international sales shot up almost immediately.",
      project: "Luxury E-Commerce Store",
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
            <span>CLIENT STORIES</span>
          </div>
          <h2 className="luxury-main-heading">
            Stories from Leaders Who <span className="luxury-gradient-text">Trust Us</span>
          </h2>
          <p className="luxury-sub-heading">
            Here is what founders, directors, and team leads have to say about working alongside Corelix Technology.
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
