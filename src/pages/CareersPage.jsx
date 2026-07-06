import React from 'react';
import SEO from '../components/SEO';
import Careers from '../components/Careers';

export default function CareersPage() {
  return (
    <div style={{ paddingTop: '2.5rem' }}>
      <SEO 
        title="Careers & Join the Team"
        description="Join Corelix Technology. We are looking for talented developers, designers, and strategic digital thinkers to build top-tier digital products."
        keywords="careers, job openings, React developer jobs, UI/UX designer hiring, join Corelix"
      />
      <Careers />
    </div>
  );
}
