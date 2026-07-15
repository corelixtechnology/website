import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Palette, ShoppingCart, Image, CheckCircle, Search, TrendingUp, Megaphone, Smartphone, HelpCircle } from 'lucide-react';
import { db } from '../utils/db';

const iconMap = {
  Code: <Code size={28} />,
  Palette: <Palette size={28} />,
  ShoppingCart: <ShoppingCart size={28} />,
  Image: <Image size={28} />,
  Search: <Search size={28} />,
  TrendingUp: <TrendingUp size={28} />,
  Megaphone: <Megaphone size={28} />,
  Smartphone: <Smartphone size={28} />
};

export default function Services() {
  const [services, setServices] = useState(() => db.getServices().filter(s => s.isActive));
  const navigate = useNavigate();

  useEffect(() => {
    const handleUpdate = () => {
      setServices(db.getServices().filter(s => s.isActive));
    };
    window.addEventListener('wm_services_updated', handleUpdate);
    return () => window.removeEventListener('wm_services_updated', handleUpdate);
  }, []);

  return (
    <section id="services" className="section">
      <div className="ambient-glow-1"></div>
      <div className="container">
        <h2 className="section-title">What We Do</h2>
        <p className="section-subtitle">
          We offer top-tier digital services to scale your business and maximize your returns. We partner with startups and enterprises to deliver exceptional results.
        </p>

        <div className="grid-2 services-grid">
          {services.map((service) => (
            <div 
              key={service.id} 
              id={service.id}
              className={`service-card glass-panel ${service.themeClass || 'theme-violet'}`}
              onClick={() => navigate(`/services/${service.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="service-icon-box">
                {iconMap[service.iconName] || <HelpCircle size={28} />}
              </div>
              
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              
              <ul className="service-bullets">
                {service.bullets && service.bullets.map((bullet, idx) => (
                  <li key={idx}>
                    <CheckCircle className="bullet-check" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
