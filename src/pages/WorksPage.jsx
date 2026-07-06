import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import Works from '../components/Works';

export default function WorksPage() {
  const location = useLocation();
  const defaultFilter = location.state?.filter || 'all';

  return (
    <div style={{ paddingTop: '2.5rem' }}>
      <SEO 
        title="Our Works"
        description="Browse our portfolio of custom software systems, brochures, brand identity designs, marketing campaigns, and high-performance React web applications."
        keywords="portfolio, client work, web development portfolio, branding designs, custom apps showcase"
      />
      <Works defaultFilter={defaultFilter} />
    </div>
  );
}
