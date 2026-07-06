import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import TrustBrands from '../components/TrustBrands';
import ServicesIntro from '../components/ServicesIntro';
import TechStack from '../components/TechStack';
import ContactForm from '../components/ContactForm';

export default function Home() {
  const handleScrollToContact = () => {
    const contactElement = document.querySelector('#contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <SEO 
        title="Creative IT Solutions & Digital Agency"
        description="Corelix Technology is an elite digital agency engineering high-performance web systems, custom software, branding packages, and high-impact digital experiences that scale."
        keywords="digital agency, software engineering, branding, web development, SEO, Corelix"
      />
      <Hero onStartCalculator={handleScrollToContact} />
      <TrustBrands />
      <ServicesIntro />
      <TechStack />
      <ContactForm />
    </div>
  );
}
