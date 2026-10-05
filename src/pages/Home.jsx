import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import TrustBrands from '../components/TrustBrands';
import AgencyShowcase from '../components/AgencyShowcase';
import ServicesIntro from '../components/ServicesIntro';
import Works from '../components/Works';
import HowWeWork from '../components/HowWeWork';
import TechStack from '../components/TechStack';
import LuxuryTestimonials from '../components/LuxuryTestimonials';
import Blog from '../components/Blog';
import ContactForm from '../components/ContactForm';
import FloatingSectionDots from '../components/FloatingSectionDots';

export default function Home() {
  const handleScrollToContact = () => {
    const contactElement = document.querySelector('#contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <SEO 
        title="Corelix Technology – Best Software Company in Karur"
        description="Corelix Technology — #1 IT company &amp; branding startup in Tamil Nadu. We specialize in custom websites, mobile apps, AI solutions, ERP, CRM &amp; IT consulting. Get a free quote today!"
        keywords="Corelix Technology, software development company Tamil Nadu, best IT company Coimbatore, web development Karur, mobile app development Tamil Nadu, AI solutions India, branding startup Tamil Nadu, custom software development, ERP CRM solutions"
      />

      {/* Side Section Scroll Navigation Dots */}
      <FloatingSectionDots />

      {/* 1. Hero Section */}
      <div id="home" className="home-scroll-section reveal">
        <Hero onStartCalculator={handleScrollToContact} />
      </div>

      {/* 2. Trusted Brands Section */}
      <div id="brands" className="home-scroll-section reveal">
        <TrustBrands />
      </div>

      {/* 3. Luxury Agency & Engineering Showcase */}
      <div id="showcase" className="home-scroll-section reveal">
        <AgencyShowcase />
      </div>

      {/* 4. Services Showcase Section */}
      <div id="services" className="home-scroll-section reveal">
        <ServicesIntro />
      </div>

      {/* 5. Works / Portfolio Showcase Section */}
      <div id="works" className="home-scroll-section reveal">
        <Works />
      </div>

      {/* 6. How We Work Section */}
      <div id="process" className="home-scroll-section reveal">
        <HowWeWork />
      </div>

      {/* 7. Technologies Section */}
      <div id="techstack" className="home-scroll-section reveal">
        <TechStack />
      </div>

      {/* 8. Executive Client Testimonials */}
      <div id="testimonials" className="home-scroll-section reveal">
        <LuxuryTestimonials />
      </div>

      {/* 9. Insights & Blog CMS Section */}
      <div id="blog" className="home-scroll-section reveal">
        <Blog />
      </div>

      {/* 10. Contact Form Section */}
      <div id="contact" className="home-scroll-section reveal">
        <ContactForm />
      </div>
    </div>
  );
}
