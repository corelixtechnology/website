import React from 'react';
import SEO from '../components/SEO';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '2.5rem' }}>
      <SEO 
        title="Contact Us"
        description="Connect with Corelix Technology. Reach out to our engineering, design, and marketing teams for custom software projects, branding requests, or business consultations."
        keywords="contact Corelix, software development inquiry, hire React developers, agency phone number, WhatsApp contact, Karur software company"
      />
      <Contact />
    </div>
  );
}
