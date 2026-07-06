import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Services from '../components/Services';

export default function ServicesPage() {
  const location = useLocation();

  useEffect(() => {
    const section = location.state?.section;
    if (section) {
      const timer = setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          element.classList.add('calc-shake-effect');
          setTimeout(() => element.classList.remove('calc-shake-effect'), 800);
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div style={{ paddingTop: '2.5rem' }}>
      <Services />
    </div>
  );
}
