import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Palette, ShoppingCart, Image, ArrowRight, Search, TrendingUp, Megaphone, Smartphone, HelpCircle, CheckCircle, Sparkles, Monitor, Layout } from 'lucide-react';
import { db } from '../utils/db';
import BackgroundParticles from './BackgroundParticles';

const iconMap = {
  Code: <Code size={24} />,
  Palette: <Palette size={24} />,
  ShoppingCart: <ShoppingCart size={24} />,
  Image: <Image size={24} />,
  Search: <Search size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  Megaphone: <Megaphone size={24} />,
  Smartphone: <Smartphone size={24} />
};

const serviceImageMap = {
  'web-dev': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
  'app-dev': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80',
  'branding': 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80',
  'ecommerce': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80',
  'posters': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
  'seo': 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=800&auto=format&fit=crop&q=80',
  'meta-ads': 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&auto=format&fit=crop&q=80',
  'digital-marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
};

const getServiceImage = (service) => {
  if (service && service.image) {
    return service.image;
  }
  if (service && service.id && serviceImageMap[service.id]) {
    return serviceImageMap[service.id];
  }
  const title = ((service && service.title) || '').toLowerCase();
  if (title.includes('shop') || title.includes('commerce') || title.includes('e-commerce') || title.includes('cart')) {
    return 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80';
  }
  if (title.includes('web') || title.includes('code') || title.includes('develop')) {
    return serviceImageMap['web-dev'];
  }
  if (title.includes('app') || title.includes('software') || title.includes('mobile')) {
    return serviceImageMap['app-dev'];
  }
  if (title.includes('brand') || title.includes('logo') || title.includes('design')) {
    return serviceImageMap['branding'];
  }
  return 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80';
};

const enrichedServiceDetails = {
  'web-dev': {
    headline: 'Build High-Performance Web Applications That Convert',
    highlightedDesc: 'Transform your web presence into an automated growth engine. We engineer <strong>custom React & Next.js applications</strong> optimized for <strong>lightning speed</strong>, mobile responsiveness, and <strong>top Google search rankings</strong>. Deliver ultra-fast user experiences while converting visitors into <strong>loyal paying clients</strong>.',
    perks: ['React 19 & Next.js Frameworks', 'Core Web Vitals 95+ Score', 'Built-in Technical SEO & Schema', 'Custom Interactive UI/UX Design'],
    phoneText: 'REACT & NEXT.JS HIGH SPEED SYSTEMS',
    phoneBadge: '99.9% UPTIME',
    accentColor: '#8b5cf6',
    deviceType: 'laptop'
  },
  'app-dev': {
    headline: 'Scalable Cross-Platform Mobile Apps & Cloud Engines',
    highlightedDesc: 'Launch native-grade iOS & Android applications powered by <strong>Flutter cross-platform codebases</strong> and <strong>robust Laravel cloud backends</strong>. Achieve rapid deployment, seamless API integrations, and <strong>scalable database architectures</strong> engineered to handle high traffic effortlessly.',
    perks: ['iOS & Android Cross-Platform', 'Laravel & Node.js API Engines', 'Real-time Push Notifications', 'Secure Offline Storage Sync'],
    phoneText: 'FLUTTER NATIVE & CLOUD BACKENDS',
    phoneBadge: 'FLUTTER ENGINE',
    accentColor: '#06b6d4',
    deviceType: 'phone'
  },
  'branding': {
    headline: 'Unforgettable Brand Identities & Style Guidelines',
    highlightedDesc: 'Establish an unmistakable market presence with <strong>cohesive visual identity packages</strong>. We craft bespoke vector logos, <strong>corporate color palettes</strong>, brand style manuals, and high-impact graphic design assets to <strong>captivate your audience</strong>.',
    perks: ['Bespoke Vector Logo Design', 'Brand Book & Typography Specs', 'Corporate Stationery & ID Cards', 'Social Media Branding Kit'],
    phoneText: 'PREMIUM BRANDING & VISUAL IDENTITY',
    phoneBadge: '4K VECTOR ART',
    accentColor: '#f43f5e',
    deviceType: 'branding-kit'
  },
  'ecommerce': {
    headline: 'High-Converting E-Commerce Storefronts & Gateways',
    highlightedDesc: 'Empower your online store with <strong>custom web storefronts</strong> and seamless checkout funnels. Integrated with <strong>Razorpay, Stripe & UPI payment gateways</strong>, real-time inventory sync, and <strong>automated order management</strong> to maximize sales output.',
    perks: ['Multi-Currency Gateway Support', 'Instant UPI & Card Checkout', 'Inventory & Stock Sync', 'Abandoned Cart Recovery'],
    phoneText: 'E-COMMERCE & PAYMENT GATEWAYS',
    phoneBadge: 'SECURE CHECKOUT',
    accentColor: '#10b981',
    deviceType: 'laptop'
  },
  'posters': {
    headline: 'High-Impact Social Media & Marketing Creatives',
    highlightedDesc: 'Engage your target audience with <strong>eye-catching graphic designs</strong>, promotional banners, and print-ready poster layouts. Tailored for <strong>Facebook, Instagram, LinkedIn campaigns</strong>, and corporate marketing materials that demand attention.',
    perks: ['Social Media Ad Creatives', 'Print-Ready Billboard & Posters', 'Custom Infographics & Flyers', 'Rapid 24-Hour Turnaround'],
    phoneText: 'GRAPHIC CREATIVES & AD POSTERS',
    phoneBadge: 'HIGH ENGAGEMENT',
    accentColor: '#f59e0b',
    deviceType: 'branding-kit'
  },
  'seo': {
    headline: 'Dominate Google Search Rankings & Local Business Maps',
    highlightedDesc: 'Outrank your competitors and drive predictable organic lead flows. We execute <strong>deep technical site audits</strong>, keyword strategies, site speed fixes, and <strong>Google Business Profile optimization</strong> near Karur, Chennai, Coimbatore, & Trichy.',
    perks: ['Rank #1 Keyword Strategy', 'Google Maps & Local SEO', 'Speed & Schema Optimization', 'Weekly Ranking Reports'],
    phoneText: 'RANK #1 ON GOOGLE SEARCH & MAPS',
    phoneBadge: '#1 GOOGLE RANK',
    accentColor: '#8b5cf6',
    deviceType: 'analytics'
  },
  'meta-ads': {
    headline: 'High-ROAS Facebook & Instagram Advertising Campaigns',
    highlightedDesc: 'Turn advertising spend into measurable business profit. Our team builds <strong>laser-targeted Meta advertising funnels</strong>, custom retargeting audiences, and <strong>A/B split-tested creatives</strong> that consistently scale your Return On Ad Spend.',
    perks: ['Custom Audience Targeting', 'High-Converting Ad Copy', 'Pixel & CAPI Event Tracking', 'Daily ROAS Optimization'],
    phoneText: 'HIGH-ROAS META ADS & FUNNELS',
    phoneBadge: '5.2X AVG ROAS',
    accentColor: '#06b6d4',
    deviceType: 'analytics'
  },
  'digital-marketing': {
    headline: 'Omnichannel Digital Growth & Automated Lead Funnels',
    highlightedDesc: 'Accelerate business expansion with <strong>end-to-end digital growth strategies</strong>. We combine automated lead funnels, <strong>email marketing workflows</strong>, social media scaling, and <strong>conversion rate optimization (CRO)</strong> to scale your enterprise.',
    perks: ['Automated Lead Generation', 'Email & WhatsApp Workflows', 'Conversion Rate Optimization', 'Comprehensive Analytics'],
    phoneText: 'OMNICHANNEL GROWTH & LEAD FUNNELS',
    phoneBadge: 'SCALABLE GROWTH',
    accentColor: '#f43f5e',
    deviceType: 'analytics'
  }
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

  return (
    <section id="services" className="services-showcase-section has-animative-bg">
      <BackgroundParticles />
      <div className="container services-showcase-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section Header */}
        <div className="services-showcase-header text-center reveal reveal-slide-up" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <span className="services-intro-tag">Our Core Expertise</span>
          <h2 className="services-intro-title text-gradient">Services Engineered to Scale</h2>
          <p className="services-intro-subtitle">
            Explore our comprehensive suite of digital solutions designed to capture attention, maximize conversion, and accelerate your enterprise.
          </p>
        </div>

        {/* All Services Rendered Vertically with Alternating Left/Right Layout */}
        <div className="services-showcase-list">
          {services.map((service, index) => {
            const isReversed = index % 2 === 1;
            const enriched = enrichedServiceDetails[service.id] || {
              headline: service.title || 'Digital Engineering & Growth',
              highlightedDesc: service.desc || 'Scale your enterprise with custom web, software, and marketing solutions built for performance.',
              perks: service.bullets || ['Custom Solution Design', 'High Speed Performance', 'Dedicated Technical Support', 'SEO Optimized'],
              phoneText: service.title || 'CORELIX TECHNOLOGY',
              phoneBadge: 'PREMIUM SERVICE',
              accentColor: '#8b5cf6',
              deviceType: 'laptop'
            };

            return (
              <div 
                key={service.id} 
                id={service.id}
                className={`services-showcase-card reveal reveal-slide-up ${isReversed ? 'row-reversed' : ''}`}
              >
                
                {/* Text Content Column */}
                <div className="showcase-content-left">
                  <div className="showcase-badge-tag">
                    <Sparkles size={16} />
                    <span>{service.pills ? service.pills[0] : 'Corelix Featured'}</span>
                  </div>

                  <h3 className="showcase-main-title">{enriched.headline}</h3>

                  <div 
                    className="showcase-main-desc"
                    dangerouslySetInnerHTML={{ __html: enriched.highlightedDesc }}
                  />

                  <div className="showcase-perks-grid">
                    {enriched.perks.map((perk, i) => (
                      <div key={i} className="perk-box">
                        <CheckCircle className="perk-check" size={18} />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>

                  <div className="showcase-actions">
                    <button 
                      className="btn-primary showcase-explore-btn"
                      onClick={() => navigate(`/services/${service.id}`)}
                    >
                      <span>Explore {service.title}</span>
                      <ArrowRight size={18} />
                    </button>
                    <button 
                      className="btn-secondary showcase-quote-btn"
                      onClick={() => {
                        const contactEl = document.querySelector('#contact');
                        if (contactEl) {
                          contactEl.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          navigate('/#contact');
                        }
                      }}
                    >
                      Get Instant Quote
                    </button>
                  </div>
                </div>

                {/* Device Visual Column (Laptop, Mobile Phone, Brand Board, or Analytics) */}
                <div className="showcase-visual-right">
                  <div className="device-mockup-wrapper">
                    {/* Glowing Ambient Background Orb */}
                    <div 
                      className="device-ambient-glow" 
                      style={{ background: `radial-gradient(circle, ${enriched.accentColor} 0%, rgba(0,0,0,0) 70%)` }}
                    ></div>

                    {/* 1. LAPTOP FRAME (For Web Design & E-Commerce) */}
                    {enriched.deviceType === 'laptop' && (
                      <div 
                        className="laptop-device-chassis"
                        style={{ transform: isReversed ? 'perspective(1000px) rotateY(6deg) rotateX(3deg)' : 'perspective(1000px) rotateY(-6deg) rotateX(3deg)' }}
                      >
                        <div className="laptop-screen-frame">
                          <div className="laptop-webcam"></div>
                          <div className="laptop-browser-bar">
                            <div className="browser-dots">
                              <span className="dot dot-red"></span>
                              <span className="dot dot-yellow"></span>
                              <span className="dot dot-green"></span>
                            </div>
                            <div className="browser-url-pill">https://corelixtechnology.in.net</div>
                          </div>
                          <div className="laptop-display-content">
                            <img src={getServiceImage(service)} alt={service.title} className="laptop-screen-img" />
                            <div className="laptop-screen-overlay-badge" style={{ borderColor: enriched.accentColor }}>
                              <span>{enriched.phoneBadge}</span>
                            </div>
                          </div>
                        </div>
                        <div className="laptop-base-chassis">
                          <div className="laptop-notch-lip"></div>
                          <div className="laptop-trackpad"></div>
                        </div>
                      </div>
                    )}

                    {/* 2. SMARTPHONE FRAME (For Mobile App Development) */}
                    {enriched.deviceType === 'phone' && (
                      <div 
                        className="phone-device-chassis"
                        style={{ transform: isReversed ? 'perspective(1000px) rotateY(6deg) rotateX(3deg)' : 'perspective(1000px) rotateY(-6deg) rotateX(3deg)' }}
                      >
                        <div className="phone-top-notch"></div>
                        <div className="phone-side-btn btn-power"></div>
                        <div className="phone-side-btn btn-vol-up"></div>
                        <div className="phone-side-btn btn-vol-down"></div>

                        <div className="phone-glass-overlay"></div>

                        {/* Phone Screen Display */}
                        <div className="phone-display-screen">
                          <div className="phone-screen-header">
                            <span className="phone-clock">09:41</span>
                            <div className="phone-top-indicators">
                              <span className="dot"></span>
                              <span className="dot"></span>
                              <span className="bar"></span>
                            </div>
                          </div>

                          <div className="phone-screen-body">
                            <div className="phone-floating-badge" style={{ borderColor: enriched.accentColor }}>
                              <span>{enriched.phoneBadge}</span>
                            </div>

                            <div className="phone-center-icon-glow" style={{ boxShadow: `0 0 35px ${enriched.accentColor}` }}>
                              {iconMap[service.iconName] || <Sparkles size={28} />}
                            </div>

                            <h4 className="phone-screen-banner-title">{enriched.phoneText}</h4>

                            <div className="phone-screen-img-frame">
                              <img src={getServiceImage(service)} alt={service.title} className="phone-screen-img" />
                            </div>

                            <div className="phone-screen-footer-badge">
                              <span className="footer-status-dot"></span>
                              <span>CORELIX FLUTTER MOBILE</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. BRANDING IDENTITY BOARD FRAME (For Branding & Graphic Designs) */}
                    {(enriched.deviceType === 'branding-kit' || (!['laptop', 'phone', 'analytics'].includes(enriched.deviceType))) && (
                      <div 
                        className="branding-board-chassis"
                        style={{ transform: isReversed ? 'perspective(1000px) rotateY(6deg) rotateX(3deg)' : 'perspective(1000px) rotateY(-6deg) rotateX(3deg)' }}
                      >
                        <div className="branding-glass-board">
                          <div className="branding-header-accent" style={{ background: `linear-gradient(90deg, ${enriched.accentColor}, #06b6d4)` }}></div>
                          <div className="branding-img-container">
                            <img src={getServiceImage(service)} alt={service.title} className="branding-main-img" />
                          </div>
                          <div className="branding-meta-bar">
                            <div className="branding-icon-circle" style={{ background: enriched.accentColor }}>
                              {iconMap[service.iconName] || <Palette size={22} />}
                            </div>
                            <div className="branding-info">
                              <h4>CORELIX BRAND SYSTEM</h4>
                              <p>Vector Identity & Guidelines</p>
                            </div>
                          </div>
                        </div>
                        <div className="stationery-card-floating card-top-right">
                          <div className="swatch-pills">
                            <span style={{ background: '#8b5cf6' }}></span>
                            <span style={{ background: '#06b6d4' }}></span>
                            <span style={{ background: '#f43f5e' }}></span>
                          </div>
                          <span>BRAND PALETTE</span>
                        </div>
                        <div className="stationery-card-floating card-bottom-left">
                          <span>VECTOR LOGO & SPECS</span>
                        </div>
                      </div>
                    )}

                    {/* 4. ANALYTICS MONITOR FRAME (For SEO, Meta Ads & Digital Marketing) */}
                    {enriched.deviceType === 'analytics' && (
                      <div 
                        className="analytics-board-chassis"
                        style={{ transform: isReversed ? 'perspective(1000px) rotateY(6deg) rotateX(3deg)' : 'perspective(1000px) rotateY(-6deg) rotateX(3deg)' }}
                      >
                        <div className="analytics-display-card">
                          <div className="analytics-top-bar">
                            <div className="analytics-live-tag">
                              <span className="live-dot"></span>
                              <span>LIVE GROWTH METRICS</span>
                            </div>
                            <span className="rank-top-badge" style={{ background: enriched.accentColor }}>#1 RANK</span>
                          </div>
                          <div className="analytics-img-frame">
                            <img src={getServiceImage(service)} alt={service.title} className="analytics-img" />
                          </div>
                          <div className="analytics-stats-row">
                            <div className="stat-pill">
                              <span className="stat-num">+380%</span>
                              <span className="stat-lbl">Search Reach</span>
                            </div>
                            <div className="stat-pill">
                              <span className="stat-num">5.4x</span>
                              <span className="stat-lbl">ROAS Scaled</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* View Detailed Directory CTA */}
        <div className="services-bottom-cta text-center reveal reveal-fade-in">
          <button
            onClick={() => navigate('/services')}
            className="service-intro-cta-btn"
          >
            <span>Browse Full Service Catalog & Pricing</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}



