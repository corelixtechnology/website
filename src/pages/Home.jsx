import React from 'react';
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
      <Hero onStartCalculator={handleScrollToContact} />
      <TrustBrands />
      <ServicesIntro />
      <TechStack />
      <ContactForm />
    </div>
  );
}
