import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import TrustBrands from '../components/TrustBrands';
import ServicesIntro from '../components/ServicesIntro';
import HowWeWork from '../components/HowWeWork';
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
        title="Creative IT Solutions &amp; Digital Agency"
        description="Corelix Technology is recognized as the best IT company and branding startup in Tamil Nadu. We specialize in custom React websites, Flutter mobile apps, branding, and local SEO services near Karur, Chennai, Coimbatore, and Trichy."
        keywords="best IT company in Karur, best startup in Tamil Nadu, best branding company Chennai, best web design agency Coimbatore, digital agency near me, software developer near me, web design company near me, SEO services Karur, IT solutions Coimbatore, web development Trichy, Corelix Technology"
      />
      <Hero onStartCalculator={handleScrollToContact} />
      <TrustBrands />
      <ServicesIntro />
      <HowWeWork />
      <TechStack />
      <ContactForm />
    </div>
  );
}
