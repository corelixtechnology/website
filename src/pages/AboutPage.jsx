import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import About from '../components/About';

export default function AboutPage() {
  const location = useLocation();
  const defaultTab = location.state?.tab || 'profile';

  return (
    <div style={{ paddingTop: '2.5rem' }}>
      <SEO 
        title="About Us"
        description="Learn more about Corelix Technology, our mission to build digital futures, our core company values, and our visionary leadership."
        keywords="about Corelix, Keerthivasan, digital agency team, software company profile, mission statement"
      />
      <About defaultTab={defaultTab} />
    </div>
  );
}
