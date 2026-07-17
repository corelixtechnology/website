import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Palette, ShoppingCart, Image, ArrowRight, Search, TrendingUp, Megaphone, Smartphone, HelpCircle } from 'lucide-react';
import { db } from '../utils/db';
import BackgroundParticles from './BackgroundParticles';

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

const serviceImageMap = {
  'web-dev': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=80',
  'app-dev': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80',
  'branding': 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&auto=format&fit=crop&q=80',
  'ecommerce': 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&auto=format&fit=crop&q=80',
  'posters': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=80',
  'seo': 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=500&auto=format&fit=crop&q=80',
  'meta-ads': 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=500&auto=format&fit=crop&q=80',
  'digital-marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80'
};

const getServiceImage = (service) => {
  if (serviceImageMap[service.id]) {
    return serviceImageMap[service.id];
  }
  const title = (service.title || '').toLowerCase();
  if (title.includes('web') || title.includes('code') || title.includes('develop')) {
    return serviceImageMap['web-dev'];
  }
  if (title.includes('app') || title.includes('software') || title.includes('mobile')) {
    return serviceImageMap['app-dev'];
  }
  if (title.includes('brand') || title.includes('logo') || title.includes('design')) {
    return serviceImageMap['branding'];
  }
  if (title.includes('shop') || title.includes('commerce') || title.includes('sale') || title.includes('cart')) {
    return serviceImageMap['ecommerce'];
  }
  if (title.includes('seo') || title.includes('search') || title.includes('rank')) {
    return serviceImageMap['seo'];
  }
  if (title.includes('marketing') || title.includes('grow')) {
    return serviceImageMap['digital-marketing'];
  }
  if (title.includes('ad') || title.includes('facebook') || title.includes('meta')) {
    return serviceImageMap['meta-ads'];
  }
  return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80';
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
    <section id="services" className="services-intro-section has-animative-bg">
      <BackgroundParticles />
      <div className="container services-intro-container" style={{ position: 'relative', zIndex: 1 }}>

        <div className="services-intro-header reveal reveal-slide-up">
          <span className="services-intro-tag">Our Expertise</span>
          <h2 className="services-intro-title text-gradient">Services We Offer</h2>
          <p className="services-intro-subtitle">
            We build state-of-the-art digital products designed to scale, capture attention, and drive meaningful growth for your enterprise.
          </p>
        </div>

        <div className="services-intro-grid reveal-stagger">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-intro-card reveal-item ${index % 2 === 0 ? 'reveal-slide-right' : 'reveal-slide-left'} ${service.themeClass || 'theme-violet'}`}
              onClick={() => handleCardClick(service.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Service background image & gradient overlay wrapper */}
              <div className="service-intro-card-bg-wrapper">
                <img src={getServiceImage(service)} alt={service.title} className="service-intro-card-bg" />
                <div className="service-intro-card-overlay"></div>
              </div>

              {/* Radial Blur Glow Background */}
              <div className="service-intro-card-glow"></div>

              <div className="service-intro-card-top">
                <div className="service-intro-icon-box">
                  {iconMap[service.iconName] || <HelpCircle size={26} />}
                </div>
                <h3>{service.title}</h3>
              </div>

              <div className="service-intro-card-bottom">
                <button className="explore-btn" onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/services/${service.id}`);
                }}>
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="service-intro-cta-wrapper reveal reveal-fade-in" data-delay="0.2s">
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
