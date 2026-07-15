// LocalStorage Database helper for Corelix Technology CRM & CMS (Synced with Strapi)

const API_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';

const CACHE_KEYS = {
  SERVICES: 'wm_services',
  BLOGS: 'wm_blogs',
  WORKS: 'wm_works',
  INQUIRIES: 'wm_inquiries',
  SETTINGS: 'wm_settings'
};

const DEFAULT_SERVICES = [
  {
    id: 'web-dev',
    title: 'Web Design & Development',
    desc: 'We build fast, responsive, and secure websites. Our code is fully optimized for speed, accessibility, and high performance.',
    bullets: [
      'React & Modern Frameworks',
      'Mobile-Responsive Layouts',
      'SEO-Optimized Architectures',
      'Speed & Performance Tweaking'
    ],
    pills: ['React & Next.js', 'Mobile-First', 'SEO Ready', 'High Speed'],
    themeClass: 'theme-violet',
    iconName: 'Code',
    isActive: true
  },
  {
    id: 'app-dev',
    title: 'App & Software Development',
    desc: 'We construct premium cross-platform mobile apps and high-performance software systems optimized for scalability, speed, and modern workflows.',
    bullets: [
      'Cross-Platform Mobile Apps (Flutter)',
      'Robust Backend Software (Laravel)',
      'Rapid Prototyping & MVPs (FlutterFlow)',
      'API Design & Core Databases Integration'
    ],
    pills: ['Flutter', 'Laravel', 'FlutterFlow', 'MVPs'],
    themeClass: 'theme-blue',
    iconName: 'Smartphone',
    isActive: true
  },
  {
    id: 'branding',
    title: 'Branding & Visual Identity',
    desc: 'Establish a strong market presence. We design cohesive visual identities, logos, and style guidelines that resonate with your target audience.',
    bullets: [
      'Logo Design & Visual Identity',
      'Corporate Stationery & Guidelines',
      'Brand Voice & Style Manuals',
      'Mascot & Character Designs'
    ],
    pills: ['Logo Design', 'Guidelines', 'Mascots', 'Typography'],
    themeClass: 'theme-rose',
    iconName: 'Palette',
    isActive: true
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Solutions',
    desc: 'Turn clicks into cash. We build secure online storefronts with seamless checkouts, inventory integrations, and product pages that practically sell themselves.',
    bullets: [
      'Custom E-commerce Storefronts',
      'Secure Payment Gateways (Stripe/PayPal)',
      'Inventory & Order Dashboards',
      'One-Click Checkout Optimization'
    ],
    pills: ['Storefronts', 'Stripe Checkout', 'Dashboards', 'Optimized'],
    themeClass: 'theme-cyan',
    iconName: 'ShoppingCart',
    isActive: true
  },
  {
    id: 'posters',
    title: 'Poster & Graphic Designs',
    desc: 'High-impact digital and print posters. We design visuals that catch eyes, stop thumbs from scrolling, and look great on both billboard signs and social feeds.',
    bullets: [
      'Digital Social Media Creatives',
      'Print-Ready Event Posters',
      'Flyers, Banners & Brochures Layouts',
      'High-Impact Graphic Deliverables'
    ],
    pills: ['Social Creatives', 'Flyers & Banners', 'Print Ready', 'Illustrations'],
    themeClass: 'theme-emerald',
    iconName: 'Image',
    isActive: true
  },
  {
    id: 'seo',
    title: 'SEO & Search Optimization',
    desc: 'Climb to the top of Google. We perform code optimization, key terms research, site schema mapping, and speed adjustments so clients find you first.',
    bullets: [
      'In-Depth Technical SEO Audit',
      'High-Value Keyword Mapping',
      'On-Page Schema & Content Updates',
      'Quality Authority Link Building'
    ],
    pills: ['Technical SEO', 'Keyword Map', 'Backlinks', 'Rank Tracking'],
    themeClass: 'theme-amber',
    iconName: 'Search',
    isActive: true
  },
  {
    id: 'meta-ads',
    title: 'Meta Ads Management',
    desc: 'Convert social feeds into user funnels. We manage Instagram and Facebook ad spends, design creatives, write copy, and run testing models to scale ROAS.',
    bullets: [
      'Engaging Ad Creatives & Copy',
      'Advanced Target Demographics',
      'Rigorous A/B Testing Models',
      'ROAS Metric Scaling & Analysis'
    ],
    pills: ['Facebook Ads', 'Instagram Ads', 'A/B Testing', 'ROAS Scaling'],
    themeClass: 'theme-blue',
    iconName: 'TrendingUp',
    isActive: true
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    desc: 'A full-funnel approach to scaling your brand. We design automated email flows, construct ad strategies, and coordinate outreach pipelines.',
    bullets: [
      'Multi-Channel Growth Funnels',
      'Email Automations & Newsletters',
      'Influencer Coordination Plans',
      'Regular Analytics Optimization'
    ],
    pills: ['Email Marketing', 'Funnels Design', 'Outreach Plans', 'Growth Hacking'],
    themeClass: 'theme-purple',
    iconName: 'Megaphone',
    isActive: true
  }
];

const DEFAULT_BLOGS = [
  {
    id: 1,
    title: 'Building Scalable Architecture: Best Practices for Startups',
    category: 'Engineering',
    date: 'July 1, 2026',
    desc: 'Learn how to architect your digital platform for scalability and reliability. We discuss key design patterns to handle sudden traffic spikes and optimize cloud infrastructure costs.',
    iconName: 'Code',
    readTime: '4 min read',
    isActive: true
  },
  {
    id: 2,
    title: 'Modern UI/UX Designs: Optimizing for User Engagement',
    category: 'Design Systems',
    date: 'June 24, 2026',
    desc: 'Discover how cohesive design systems, modern typography, and clean micro-interactions can improve user retention, build brand trust, and boost conversion rates.',
    iconName: 'Flame',
    readTime: '5 min read',
    isActive: true
  },
  {
    id: 3,
    title: 'E-Commerce Optimization: Improving Checkout Conversion',
    category: 'Business',
    date: 'May 12, 2026',
    desc: 'Minor adjustments to checkout layouts and checkout paths can significantly reduce cart abandonment. Explore the UX methodologies that drive online sales.',
    iconName: 'Moon',
    readTime: '3 min read',
    isActive: true
  }
];

const DEFAULT_WORKS = [
  {
    id: 1,
    title: 'Zenith Organic Brochure',
    category: 'brochures',
    client: 'Zenith Farm Co.',
    desc: 'An eco-friendly tri-fold brochure using earth-tone organic color schemes, custom layouts, and FSC-certified paper specifications.',
    tags: ['Print Design', 'Tri-fold', 'Green-Mktg'],
    rating: '⭐⭐⭐⭐⭐ ("Smells like fresh soil!")',
    svgType: 'brochure',
    isActive: true
  },
  {
    id: 2,
    title: 'Aura Cosmetics Pack',
    category: 'brochures',
    client: 'Aura Skin Care',
    desc: 'Luxury packaging design for a premium skincare line, incorporating gold-foil embossing and clean typography.',
    tags: ['Packaging', '3D Die-cut', 'Cosmetics'],
    rating: '⭐⭐⭐⭐⭐ ("Pure luxury on the shelves.")',
    svgType: 'package',
    isActive: true
  },
  {
    id: 3,
    title: 'CryptoSphere Dashboard',
    category: 'web-works',
    client: 'CryptoSphere Ltd.',
    desc: 'A decentralized finance crypto portal featuring real-time interactive charts, dark mode widgets, and user wallets connect flows.',
    tags: ['React', 'Web Dev', 'DeFi Portal'],
    rating: '⭐⭐⭐⭐⭐ ("No bugs. Only gains.")',
    svgType: 'web-dashboard',
    isActive: true
  },
  {
    id: 4,
    title: 'EduTrack SaaS App',
    category: 'web-works',
    client: 'EduTrack Systems',
    desc: 'Interactive university student metrics management system dashboard. Features dark/light themes, calendar schedules, and course progress.',
    tags: ['Next.js', 'API Sync', 'EdTech'],
    rating: '⭐⭐⭐⭐⭐ ("A+ grade dashboard design.")',
    svgType: 'web-portal',
    isActive: true
  },
  {
    id: 5,
    title: 'Nebula Juice Branding',
    category: 'branding-ads',
    client: 'Nebula Beverages',
    desc: 'Complete brand redesign including an abstract glowing logo, stationery set, and high-energy social media ads.',
    tags: ['Branding', 'Ad Campaign', 'Social Creatives'],
    rating: '⭐⭐⭐⭐⭐ ("The juice looks space-age!")',
    svgType: 'branding',
    isActive: true
  },
  {
    id: 6,
    title: 'Apex Gym Ad Campaign',
    category: 'branding-ads',
    client: 'Apex Fitness Ltd.',
    desc: 'Bold, high-contrast digital advertising posters featuring custom overlays, energetic typography, and banner distributions.',
    tags: ['Advertisement', 'Poster Campaign', 'Ad Banner'],
    rating: '⭐⭐⭐⭐⭐ ("Increased gym signups by 200%.")',
    svgType: 'ad',
    isActive: true
  }
];

const DEFAULT_SETTINGS = {
  heroTitle: 'Creative IT Solutions & Digital Agency',
  heroSubtitle: 'We craft high-performance websites, premium brand identities, and target-focused search campaigns that grow businesses.',
  activePromoText: '🔥 Corelix Technology Special Offer: 20% New Client Discount Applied to all custom web packages built this month!',
  promoEnabled: true,
  whatsappUrl: 'https://wa.me/919360410038?text=I%20would%20like%20to%20discuss%20a%20new%20project!',
  phoneNumber: '9360410038',
  email: 'corelixtechonology@gmail.com',
  seasonalDiscount: 20,
  adminUsername: 'corelix',
  adminPassword: 'corelix@2026',
  googleSiteVerification: ''
};

const DEFAULT_INQUIRIES = [];

// Helper to load cache safely
const getCached = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

// Helper to save cache safely
const saveCached = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to write local cache:', e);
  }
};

// Main state cache
let cache = {
  services: getCached(CACHE_KEYS.SERVICES, DEFAULT_SERVICES),
  blogs: getCached(CACHE_KEYS.BLOGS, DEFAULT_BLOGS),
  works: getCached(CACHE_KEYS.WORKS, DEFAULT_WORKS),
  settings: getCached(CACHE_KEYS.SETTINGS, DEFAULT_SETTINGS),
  inquiries: getCached(CACHE_KEYS.INQUIRIES, DEFAULT_INQUIRIES)
};

// Async background fetchers
const fetchServices = async () => {
  try {
    const res = await fetch(`${API_URL}/api/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    const { data } = await res.json();
    if (data) {
      cache.services = data.map(item => ({
        id: item.serviceId,
        title: item.title,
        desc: item.desc,
        bullets: item.bullets || [],
        pills: item.pills || [],
        themeClass: item.themeClass,
        iconName: item.iconName,
        isActive: item.isActive ?? true,
        documentId: item.documentId
      }));
      saveCached(CACHE_KEYS.SERVICES, cache.services);
      window.dispatchEvent(new Event('wm_services_updated'));
    }
  } catch (err) {
    console.error('Strapi offline. Using cached services.', err);
  }
};

const fetchBlogs = async () => {
  try {
    const res = await fetch(`${API_URL}/api/blogs`);
    if (!res.ok) throw new Error('Failed to fetch blogs');
    const { data } = await res.json();
    if (data) {
      cache.blogs = data.map(item => ({
        id: Number(item.blogId),
        title: item.title,
        category: item.category,
        date: item.date,
        desc: item.excerpt,
        content: item.content,
        iconName: item.imageType,
        readTime: item.readTime,
        isActive: item.isActive ?? true,
        documentId: item.documentId
      }));
      saveCached(CACHE_KEYS.BLOGS, cache.blogs);
      window.dispatchEvent(new Event('wm_blogs_updated'));
    }
  } catch (err) {
    console.error('Strapi offline. Using cached blogs.', err);
  }
};

const fetchWorks = async () => {
  try {
    const res = await fetch(`${API_URL}/api/works`);
    if (!res.ok) throw new Error('Failed to fetch works');
    const { data } = await res.json();
    if (data) {
      cache.works = data.map(item => ({
        id: item.workId,
        title: item.title,
        category: item.category,
        client: item.client,
        desc: item.desc,
        tags: item.tags || [],
        rating: item.rating,
        svgType: item.svgType,
        isActive: item.isActive ?? true,
        documentId: item.documentId
      }));
      saveCached(CACHE_KEYS.WORKS, cache.works);
      window.dispatchEvent(new Event('wm_works_updated'));
    }
  } catch (err) {
    console.error('Strapi offline. Using cached works.', err);
  }
};

const fetchSettings = async () => {
  try {
    const res = await fetch(`${API_URL}/api/setting`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    const { data } = await res.json();
    if (data) {
      cache.settings = {
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        activePromoText: data.activePromoText,
        promoEnabled: data.promoEnabled,
        whatsappUrl: data.whatsappUrl,
        phoneNumber: data.phoneNumber,
        email: data.email,
        seasonalDiscount: data.seasonalDiscount,
        adminUsername: data.adminUsername,
        adminPassword: data.adminPassword,
        googleSiteVerification: data.googleSiteVerification || '',
        documentId: data.documentId
      };
      saveCached(CACHE_KEYS.SETTINGS, cache.settings);
      window.dispatchEvent(new Event('wm_settings_updated'));
    }
  } catch (err) {
    console.error('Strapi offline. Using cached settings.', err);
  }
};

const fetchInquiries = async () => {
  try {
    const res = await fetch(`${API_URL}/api/inquiries?sort=date:desc`);
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    const { data } = await res.json();
    if (data) {
      cache.inquiries = data.map(item => ({
        id: item.documentId,
        name: item.name,
        email: item.email,
        phone: item.phone || '',
        projectType: item.projectType,
        budget: item.budget,
        message: item.message,
        date: item.date,
        isRead: item.isRead ?? false,
        documentId: item.documentId
      }));
      saveCached(CACHE_KEYS.INQUIRIES, cache.inquiries);
      window.dispatchEvent(new Event('wm_inquiries_updated'));
    }
  } catch (err) {
    console.error('Strapi offline. Using cached inquiries.', err);
  }
};

// Trigger background updates immediately
fetchServices();
fetchBlogs();
fetchWorks();
fetchSettings();
fetchInquiries();

// Diff & Sync engine functions
const syncServices = async (updated) => {
  try {
    const res = await fetch(`${API_URL}/api/services`);
    if (!res.ok) throw new Error('Failed to fetch current services');
    const { data: dbServices } = await res.json();

    for (const service of updated) {
      const dbMatch = dbServices.find(item => item.serviceId === service.id);
      const payload = {
        data: {
          serviceId: service.id,
          title: service.title,
          desc: service.desc,
          bullets: service.bullets,
          pills: service.pills,
          themeClass: service.themeClass,
          iconName: service.iconName,
          isActive: service.isActive
        }
      };

      if (dbMatch) {
        await fetch(`${API_URL}/api/services/${dbMatch.documentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(`${API_URL}/api/services`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    }

    for (const dbService of dbServices) {
      const stillExists = updated.some(item => item.id === dbService.serviceId);
      if (!stillExists) {
        await fetch(`${API_URL}/api/services/${dbService.documentId}`, {
          method: 'DELETE'
        });
      }
    }
    await fetchServices();
  } catch (err) {
    console.error('Sync services error:', err);
  }
};

const syncBlogs = async (updated) => {
  try {
    const res = await fetch(`${API_URL}/api/blogs`);
    if (!res.ok) throw new Error('Failed to fetch current blogs');
    const { data: dbBlogs } = await res.json();

    for (const blog of updated) {
      const dbMatch = dbBlogs.find(item => Number(item.blogId) === Number(blog.id));
      const payload = {
        data: {
          blogId: String(blog.id),
          title: blog.title,
          excerpt: blog.desc,
          content: blog.desc,
          category: blog.category,
          readTime: blog.readTime,
          date: blog.date,
          imageType: blog.iconName,
          isActive: blog.isActive
        }
      };

      if (dbMatch) {
        await fetch(`${API_URL}/api/blogs/${dbMatch.documentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(`${API_URL}/api/blogs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    }

    for (const dbBlog of dbBlogs) {
      const stillExists = updated.some(item => Number(item.id) === Number(dbBlog.blogId));
      if (!stillExists) {
        await fetch(`${API_URL}/api/blogs/${dbBlog.documentId}`, {
          method: 'DELETE'
        });
      }
    }
    await fetchBlogs();
  } catch (err) {
    console.error('Sync blogs error:', err);
  }
};

const syncWorks = async (updated) => {
  try {
    const res = await fetch(`${API_URL}/api/works`);
    if (!res.ok) throw new Error('Failed to fetch current works');
    const { data: dbWorks } = await res.json();

    for (const work of updated) {
      const dbMatch = dbWorks.find(item => Number(item.workId) === Number(work.id));
      const payload = {
        data: {
          workId: Number(work.id),
          title: work.title,
          category: work.category,
          client: work.client,
          desc: work.desc,
          tags: work.tags,
          rating: work.rating,
          svgType: work.svgType,
          isActive: work.isActive
        }
      };

      if (dbMatch) {
        await fetch(`${API_URL}/api/works/${dbMatch.documentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(`${API_URL}/api/works`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    }

    for (const dbWork of dbWorks) {
      const stillExists = updated.some(item => Number(item.id) === Number(dbWork.workId));
      if (!stillExists) {
        await fetch(`${API_URL}/api/works/${dbWork.documentId}`, {
          method: 'DELETE'
        });
      }
    }
    await fetchWorks();
  } catch (err) {
    console.error('Sync works error:', err);
  }
};

const syncInquiries = async (updated) => {
  try {
    const res = await fetch(`${API_URL}/api/inquiries`);
    if (!res.ok) throw new Error('Failed to fetch current inquiries');
    const { data: dbInquiries } = await res.json();

    for (const inq of updated) {
      const dbMatch = dbInquiries.find(item => item.documentId === inq.id);
      if (dbMatch) {
        const payload = {
          data: {
            name: inq.name,
            email: inq.email,
            phone: inq.phone || '',
            projectType: inq.projectType,
            budget: inq.budget,
            message: inq.message,
            date: inq.date,
            isRead: inq.isRead
          }
        };
        await fetch(`${API_URL}/api/inquiries/${dbMatch.documentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    }

    for (const dbInq of dbInquiries) {
      const stillExists = updated.some(item => item.id === dbInq.documentId);
      if (!stillExists) {
        await fetch(`${API_URL}/api/inquiries/${dbInq.documentId}`, {
          method: 'DELETE'
        });
      }
    }
    await fetchInquiries();
  } catch (err) {
    console.error('Sync inquiries error:', err);
  }
};

export const db = {
  // Services
  getServices: () => {
    return cache.services;
  },
  saveServices: (services) => {
    cache.services = services;
    saveCached(CACHE_KEYS.SERVICES, services);
    window.dispatchEvent(new Event('wm_services_updated'));
    syncServices(services);
  },

  // Blogs
  getBlogs: () => {
    return cache.blogs;
  },
  saveBlogs: (blogs) => {
    cache.blogs = blogs;
    saveCached(CACHE_KEYS.BLOGS, blogs);
    window.dispatchEvent(new Event('wm_blogs_updated'));
    syncBlogs(blogs);
  },

  // Works/Projects
  getWorks: () => {
    return cache.works;
  },
  saveWorks: (works) => {
    cache.works = works;
    saveCached(CACHE_KEYS.WORKS, works);
    window.dispatchEvent(new Event('wm_works_updated'));
    syncWorks(works);
  },

  // Inquiries
  getInquiries: () => {
    return cache.inquiries;
  },
  saveInquiries: (inquiries) => {
    cache.inquiries = inquiries;
    saveCached(CACHE_KEYS.INQUIRIES, inquiries);
    window.dispatchEvent(new Event('wm_inquiries_updated'));
    syncInquiries(inquiries);
  },
  addInquiry: async (inquiry) => {
    const tempId = 'inq_temp_' + Date.now();
    const newInq = {
      id: tempId,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone || '',
      projectType: inquiry.projectType || '',
      budget: inquiry.budget ? parseInt(inquiry.budget) : 0,
      message: inquiry.message,
      date: new Date().toISOString(),
      isRead: false
    };

    cache.inquiries.unshift(newInq);
    saveCached(CACHE_KEYS.INQUIRIES, cache.inquiries);
    window.dispatchEvent(new Event('wm_inquiries_updated'));

    try {
      const payload = {
        data: {
          name: newInq.name,
          email: newInq.email,
          phone: newInq.phone || '',
          projectType: newInq.projectType || '',
          budget: newInq.budget,
          message: newInq.message,
          date: newInq.date,
          isRead: false
        }
      };
      const res = await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchInquiries();
      }
    } catch (err) {
      console.error('Failed to post inquiry to Strapi:', err);
    }

    return newInq;
  },

  // Settings
  getSettings: () => {
    return cache.settings;
  },
  saveSettings: (settings) => {
    cache.settings = settings;
    saveCached(CACHE_KEYS.SETTINGS, settings);
    window.dispatchEvent(new Event('wm_settings_updated'));

    (async () => {
      try {
        await fetch(`${API_URL}/api/setting`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: settings })
        });
        await fetchSettings();
      } catch (err) {
        console.error('Failed to save settings to Strapi:', err);
      }
    })();
  }
};
