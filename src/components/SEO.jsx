import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../utils/db';

export default function SEO({ title, description, keywords, canonical, robots }) {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Title
    // 1. Update Title
    const formattedTitle = title 
      ? `${title} | #1 Best Software Development Company in Karur` 
      : 'Corelix Technology | #1 Best Company for Software Development in Karur & Tamil Nadu';
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

    // 2. Meta description, keywords, geo-location & robots
    updateMetaTag('name', 'description', description || 'Corelix Technology is recognized as the #1 Best Company for Software Development in Karur & Premier Branding Agency in Tamil Nadu. We specialize in custom web design (React, Next.js), mobile apps (Flutter), corporate branding, and local SEO services near Karur, Chennai, Coimbatore, and Trichy.');
    updateMetaTag('name', 'keywords', keywords || 'company for software development in karur, best company for software development in karur, best software company in karur, top software development company karur, best software company in Tamil Nadu, best branding company in Tamil Nadu, best IT company in Karur, software developer near me, web design company near me, Corelix Technology');
    updateMetaTag('name', 'robots', robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('name', 'geo.region', 'IN-TN');
    updateMetaTag('name', 'geo.placename', 'Karur, Tamil Nadu, India');
    updateMetaTag('name', 'geo.position', '10.979349;78.066858');
    updateMetaTag('name', 'ICBM', '10.979349, 78.066858');

    const activeSettings = db.getSettings();
    const verificationCode = (activeSettings && activeSettings.googleSiteVerification) || import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
    updateMetaTag('name', 'google-site-verification', verificationCode);

    // 3. Canonical Link
    const finalCanonical = canonical || `https://corelixtechnology.in.net${location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', finalCanonical);

    // 4. Open Graph Metadata
    updateMetaTag('property', 'og:title', formattedTitle);
    updateMetaTag('property', 'og:description', description || 'Corelix Technology is recognized as the #1 Best Software Company in Tamil Nadu & Best Branding Company in Tamil Nadu.');
    updateMetaTag('property', 'og:url', `https://corelixtechnology.in.net${location.pathname}`);
    updateMetaTag('property', 'og:image', 'https://corelixtechnology.in.net/og-image.png');

    // 5. Twitter Card Metadata
    updateMetaTag('name', 'twitter:title', formattedTitle);
    updateMetaTag('name', 'twitter:description', description || 'Corelix Technology is recognized as the #1 Best Software Company in Tamil Nadu & Best Branding Company in Tamil Nadu.');
    updateMetaTag('name', 'twitter:image', 'https://corelixtechnology.in.net/og-image.png');

    // 6. Schema.org JSON-LD Structured Data
    let schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["SoftwareCompany", "LocalBusiness", "ProfessionalService"],
          "name": "Corelix Technology",
          "alternateName": "Corelix Technology - Best Software Development Company in Karur",
          "description": "Corelix Technology is recognized as the #1 Best Software Development Company in Karur & Best Branding Agency in Tamil Nadu.",
          "image": "https://corelixtechnology.in.net/logo.png",
          "@id": "https://corelixtechnology.in.net/#organization",
          "url": "https://corelixtechnology.in.net",
          "telephone": "+919360410038",
          "hasMap": "https://maps.google.com/?q=10.979349,78.066858",
          "priceRange": "$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "bestRating": "5.0",
            "worstRating": "1.0",
            "ratingCount": "128",
            "reviewCount": "128"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "15, Thainganagar, Sri Poonkuyil Nagar, Vengamedu",
            "addressLocality": "Karur",
            "addressRegion": "Tamil Nadu",
            "postalCode": "639006",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 10.979349,
            "longitude": 78.066858
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
          },
          "sameAs": [
            "https://x.com/Corelixtech",
            "https://www.linkedin.com/in/corelix-technology/",
            "https://www.instagram.com/corelixtechnology",
            "https://www.youtube.com/@Corelixtechnology"
          ],
          "areaServed": [
            {
              "@type": "State",
              "name": "Tamil Nadu",
              "sameAs": "https://en.wikipedia.org/wiki/Tamil_Nadu"
            },
            {
              "@type": "City",
              "name": "Chennai",
              "sameAs": "https://en.wikipedia.org/wiki/Chennai"
            },
            {
              "@type": "City",
              "name": "Coimbatore",
              "sameAs": "https://en.wikipedia.org/wiki/Coimbatore"
            },
            {
              "@type": "City",
              "name": "Karur",
              "sameAs": "https://en.wikipedia.org/wiki/Karur"
            },
            {
              "@type": "City",
              "name": "Trichy",
              "sameAs": "https://en.wikipedia.org/wiki/Tiruchirappalli"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Corelix Technology Services",
            "itemListElement": [
              {
                "@type": "OfferCatalog",
                "name": "Software Engineering & IT Development Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Web Design & Development",
                      "description": "Custom, responsive, and secure React and Next.js web applications optimized for speed, performance, and SEO."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "App & Software Development",
                      "description": "Cross-platform mobile apps built with Flutter and robust database backends built with Laravel."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "E-commerce Solutions",
                      "description": "Bespoke online storefronts integrated with secure payment gateways like Stripe and PayPal."
                    }
                  }
                ]
              },
              {
                "@type": "OfferCatalog",
                "name": "Branding & Creative Design Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Branding & Visual Identity",
                      "description": "Cohesive brand guidelines, logos, corporate stationery, and custom style manuals."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Poster & Graphic Designs",
                      "description": "High-impact social media creatives, print-ready posters, banners, and digital marketing graphics."
                    }
                  }
                ]
              },
              {
                "@type": "OfferCatalog",
                "name": "Digital Marketing & Growth Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "SEO & Search Optimization",
                      "description": "Keyword research, site audits, speed adjustments, and backlinks campaigns to rank #1 on search engines."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Meta Ads Management",
                      "description": "End-to-end Facebook and Instagram advertising campaign management, A/B testing, and ROI/ROAS scaling."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Digital Marketing & Growth",
                      "description": "Multi-channel funnel optimization, automated email flows, and lead-generation outreach strategies."
                    }
                  }
                ]
              }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://corelixtechnology.in.net/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What services does Corelix Technology provide?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Corelix Technology is a premium digital agency specializing in custom web design & development (React, Next.js), cross-platform mobile application development (Flutter), branding & corporate visual identity design, e-commerce storefronts, and performance-driven search engine optimization (SEO) and marketing campaigns."
              }
            },
            {
              "@type": "Question",
              "name": "Where is Corelix Technology located and what areas do you serve?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Corelix Technology is headquartered in Karur, Tamil Nadu, India. We serve clients across all parts of Tamil Nadu—including Chennai, Coimbatore, Karur, and Trichy—as well as international markets with our remote-ready digital engineering services."
              }
            },
            {
              "@type": "Question",
              "name": "How does Corelix Technology optimize websites for performance and speed?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We design highly optimized web systems from scratch using modern frontend architectures like React and Vite. Our engineering process guarantees low asset payloads, semantic HTML structures, dynamic image optimization, and technical SEO compliance to achieve maximum scores on Google PageSpeed Insights."
              }
            },
            {
              "@type": "Question",
              "name": "How can I get a quote for my web or app development project?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can get a project quotation by using the interactive cost calculator on our website, sending a detailed inquiry through our Contact Page form, calling our support line at +91 9360410038, or messaging us directly on WhatsApp for instant consultation."
              }
            },
            {
              "@type": "Question",
              "name": "Why is Corelix Technology considered the best IT company and branding startup in Tamil Nadu?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Corelix Technology is recognized as the best IT company, premium software startup, and elite branding agency in Tamil Nadu. We deliver custom software development, high-performance React web applications, and local SEO services that help businesses scale securely and achieve top search result rankings."
              }
            }
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://corelixtechnology.in.net/#website",
          "url": "https://corelixtechnology.in.net",
          "name": "Corelix Technology",
          "description": "Best Software Company in Tamil Nadu and Best Branding Agency",
          "publisher": {
            "@id": "https://corelixtechnology.in.net/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://corelixtechnology.in.net/services?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://corelixtechnology.in.net/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://corelixtechnology.in.net/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": "https://corelixtechnology.in.net/services"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Works",
              "item": "https://corelixtechnology.in.net/works"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Contact",
              "item": "https://corelixtechnology.in.net/contact"
            }
          ]
        }
      ]
    };
    schemaScript.textContent = JSON.stringify(schemaData, null, 2);
  }, [title, description, keywords, canonical, robots, location.pathname]);

  return null;
}
