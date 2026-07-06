import React from 'react';
import { useLocation } from 'react-router-dom';
import About from '../components/About';

export default function AboutPage() {
  const location = useLocation();
  const defaultTab = location.state?.tab || 'profile';

  return (
    <div style={{ paddingTop: '2.5rem' }}>
      <About defaultTab={defaultTab} />
    </div>
  );
}
