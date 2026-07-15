import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../utils/db';

export default function SEO({ title, description, keywords, canonical, robots }) {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title 
      ? `${title} | Corelix Technology` 
      : 'Corelix Technology | Creative IT Solutions & Digital Agency';
    document.title = formattedTitle;

    // Helper to query and update/create meta tags
    const updateMetaTag = (attributeName, attributeValue, content) => {
      if (!content) {
        const tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
        if (tag) tag.remove();
        return;
      }
      let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attributeName, attributeValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Meta description, keywords & robots
    updateMetaTag('name', 'description', description || 'Corelix Technology is an elite digital agency engineering high-performance web systems, custom software, branding packages, and high-impact digital experiences that scale.');
    updateMetaTag('name', 'keywords', keywords || 'digital agency, web development, custom software, web design, branding, digital marketing, SEO, React developer, Corelix Technology');
    updateMetaTag('name', 'robots', robots || 'index, follow');

    const activeSettings = db.getSettings();
    const verificationCode = (activeSettings && activeSettings.googleSiteVerification) || import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
    updateMetaTag('name', 'google-site-verification', verificationCode);

    // 3. Canonical Link
    const finalCanonical = canonical || window.location.href;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', finalCanonical);

    // 4. Open Graph Metadata
    updateMetaTag('property', 'og:title', formattedTitle);
    updateMetaTag('property', 'og:description', description || 'Corelix Technology is an elite digital agency engineering high-performance web systems, custom software, branding packages, and high-impact digital experiences that scale.');
    updateMetaTag('property', 'og:url', window.location.href);
    updateMetaTag('property', 'og:image', `${window.location.origin}/og-image.png`);

    // 5. Twitter Card Metadata
    updateMetaTag('name', 'twitter:title', formattedTitle);
    updateMetaTag('name', 'twitter:description', description || 'Corelix Technology is an elite digital agency engineering high-performance web systems, custom software, branding packages, and high-impact digital experiences that scale.');
    updateMetaTag('name', 'twitter:image', `${window.location.origin}/og-image.png`);

  }, [title, description, keywords, canonical, robots, location.pathname]);

  return null;
}
