import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import TrustBrands from '../components/TrustBrands';
import ServicesIntro from '../components/ServicesIntro';
import HowWeWork from '../components/HowWeWork';
import TechStack from '../components/TechStack';
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
        description="Corelix Technology is a premium software development company in Coimbatore specializing in custom websites, mobile apps, AI solutions, ERP, CRM, branding, and IT consulting."
        keywords="software development company in coimbatore, best software company in coimbatore, web development coimbatore, mobile app development coimbatore, AI solutions, Corelix Technology, custom software development"
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

      {/* 3. Services Showcase Section */}
      <div id="services" className="home-scroll-section reveal">
        <ServicesIntro />
      </div>

      {/* 4. How We Work Section */}
      <div id="process" className="home-scroll-section reveal">
        <HowWeWork />
      </div>

      {/* 5. Technologies Section */}
      <div id="techstack" className="home-scroll-section reveal">
        <TechStack />
      </div>

      {/* 6. Contact Form Section */}
      <div id="contact" className="home-scroll-section reveal">
        <ContactForm />
      </div>
    </div>
  );
}
