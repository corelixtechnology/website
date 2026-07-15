import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Palette, ShoppingCart, Image, ArrowRight, Search, TrendingUp, Megaphone, Smartphone, HelpCircle } from 'lucide-react';
import { db } from '../utils/db';

const iconMap = {
  Code: <Code size={26} />,
  Palette: <Palette size={26} />,
  ShoppingCart: <ShoppingCart size={26} />,
  Image: <Image size={26} />,
  Search: <Search size={26} />,
  TrendingUp: <TrendingUp size={26} />,
  Megaphone: <Megaphone size={26} />,
  Smartphone: <Smartphone size={26} />
};

export default function ServicesIntro() {
  const [services, setServices] = useState(() => db.getServices().filter(s => s.isActive));
  const navigate = useNavigate();

  useEffect(() => {
    const handleUpdate = () => {
      setServices(db.getServices().filter(s => s.isActive));
    };
    window.addEventListener('wm_services_updated', handleUpdate);
    return () => window.removeEventListener('wm_services_updated', handleUpdate);
  }, []);

  const handleCardClick = (id) => {
    navigate(`/services/${id}`);
  };

  return (
    <section id="services" className="services-intro-section">
      <div className="container services-intro-container">
        
        <div className="services-intro-header">
          <span className="services-intro-tag">Our Expertise</span>
          <h2 className="services-intro-title text-gradient">Services We Offer</h2>
          <p className="services-intro-subtitle">
            We build state-of-the-art digital products designed to scale, capture attention, and drive meaningful growth for your enterprise.
          </p>
        </div>

        <div className="services-intro-grid">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`service-intro-card ${service.themeClass || 'theme-violet'}`}
              onClick={() => handleCardClick(service.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Radial Blur Glow Background */}
              <div className="service-intro-card-glow"></div>
              
              <div className="service-intro-card-top">
                <div className="service-intro-icon-box">
                  {iconMap[service.iconName] || <HelpCircle size={26} />}
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>

              <div className="service-intro-card-bottom">
                <div className="service-intro-pills">
                  {service.pills && service.pills.map((pill, i) => (
                    <span key={i} className="service-intro-pill">
                      {pill}
                    </span>
                  ))}
                </div>
                
                <div className="service-intro-action-link">
                  <span>Explore Details</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="service-intro-cta-wrapper">
          <button 
            onClick={() => navigate('/services')}
            className="service-intro-cta-btn"
          >
            <span>View Detailed Services Overview</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
