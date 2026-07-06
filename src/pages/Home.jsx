import React from 'react';
import Hero from '../components/Hero';
import TrustBrands from '../components/TrustBrands';
import ServicesIntro from '../components/ServicesIntro';
import TechStack from '../components/TechStack';
import CoffeeCalculator from '../components/CoffeeCalculator';
import ContactForm from '../components/ContactForm';

export default function Home() {
  const handleScrollToCalculator = () => {
    const calcElement = document.querySelector('.calculator-pane');
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: 'smooth' });
      // Shake effect
      calcElement.classList.add('calc-shake-effect');
      setTimeout(() => {
        calcElement.classList.remove('calc-shake-effect');
      }, 800);
    }
  };

  return (
    <div>
      <Hero onStartCalculator={handleScrollToCalculator} />
      <TrustBrands />
      <ServicesIntro />
      <TechStack />
      <div id="estimator">
        <CoffeeCalculator />
      </div>
      <ContactForm />
    </div>
  );
}
