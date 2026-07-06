import React from 'react';
import SEO from '../components/SEO';
import Blog from '../components/Blog';

export default function BlogPage() {
  return (
    <div style={{ paddingTop: '2.5rem' }}>
      <SEO 
        title="Our Blog"
        description="Stay updated with our latest industry insights, tech tutorials, web engineering trends, and software architecture articles."
        keywords="technology blog, software engineering blog, web design articles, tech insights"
      />
      <Blog />
    </div>
  );
}
