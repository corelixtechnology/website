// Node.js + MongoDB API & LocalStorage Database helper for Corelix Technology

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    return data !== null ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

// Helper to save cache safely
const saveCached = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to write local storage cache:', e);
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

// Sync with Node.js + MongoDB API
const syncWithBackend = async () => {
  try {
    const [servicesRes, blogsRes, worksRes, inquiriesRes, settingsRes] = await Promise.allSettled([
      fetch(`${API_BASE_URL}/services`),
      fetch(`${API_BASE_URL}/blogs`),
      fetch(`${API_BASE_URL}/works`),
      fetch(`${API_BASE_URL}/inquiries`),
      fetch(`${API_BASE_URL}/settings`)
    ]);

    if (servicesRes.status === 'fulfilled' && servicesRes.value.ok) {
      const data = await servicesRes.value.json();
      if (data && data.length) {
        cache.services = data;
        saveCached(CACHE_KEYS.SERVICES, data);
        window.dispatchEvent(new Event('wm_services_updated'));
      }
    }

    if (blogsRes.status === 'fulfilled' && blogsRes.value.ok) {
      const data = await blogsRes.value.json();
      if (data && data.length) {
        cache.blogs = data;
        saveCached(CACHE_KEYS.BLOGS, data);
        window.dispatchEvent(new Event('wm_blogs_updated'));
      }
    }

    if (worksRes.status === 'fulfilled' && worksRes.value.ok) {
      const data = await worksRes.value.json();
      if (data && data.length) {
        cache.works = data;
        saveCached(CACHE_KEYS.WORKS, data);
        window.dispatchEvent(new Event('wm_works_updated'));
      }
    }

    if (inquiriesRes.status === 'fulfilled' && inquiriesRes.value.ok) {
      const data = await inquiriesRes.value.json();
      if (data) {
        cache.inquiries = data;
        saveCached(CACHE_KEYS.INQUIRIES, data);
        window.dispatchEvent(new Event('wm_inquiries_updated'));
      }
    }

    if (settingsRes.status === 'fulfilled' && settingsRes.value.ok) {
      const data = await settingsRes.value.json();
      if (data) {
        cache.settings = { ...cache.settings, ...data };
        saveCached(CACHE_KEYS.SETTINGS, cache.settings);
        window.dispatchEvent(new Event('wm_settings_updated'));
      }
    }
  } catch (err) {
    console.warn('Backend sync warning (offline mode active):', err);
  }
};

// Trigger initial async sync
syncWithBackend();

export const db = {
  // Sync Helper
  sync: syncWithBackend,

  // Services
  getServices: () => cache.services,
  saveServices: (services) => {
    cache.services = services;
    saveCached(CACHE_KEYS.SERVICES, services);
    window.dispatchEvent(new Event('wm_services_updated'));
    fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(services)
    }).catch(err => console.warn('Failed to sync services to backend:', err));
  },

  // Blogs
  getBlogs: () => cache.blogs,
  saveBlogs: (blogs) => {
    cache.blogs = blogs;
    saveCached(CACHE_KEYS.BLOGS, blogs);
    window.dispatchEvent(new Event('wm_blogs_updated'));
    fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogs)
    }).catch(err => console.warn('Failed to sync blogs to backend:', err));
  },

  // Works/Projects
  getWorks: () => cache.works,
  saveWorks: (works) => {
    cache.works = works;
    saveCached(CACHE_KEYS.WORKS, works);
    window.dispatchEvent(new Event('wm_works_updated'));
    fetch(`${API_BASE_URL}/works`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(works)
    }).catch(err => console.warn('Failed to sync works to backend:', err));
  },

  // Inquiries
  getInquiries: () => cache.inquiries,
  saveInquiries: (inquiries) => {
    cache.inquiries = inquiries;
    saveCached(CACHE_KEYS.INQUIRIES, inquiries);
    window.dispatchEvent(new Event('wm_inquiries_updated'));
    fetch(`${API_BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiries)
    }).catch(err => console.warn('Failed to sync inquiries to backend:', err));
  },
  addInquiry: (inquiry) => {
    const newInq = {
      id: 'inq_' + Date.now(),
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
    fetch(`${API_BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInq)
    }).catch(err => console.warn('Failed to send inquiry to backend:', err));
    return newInq;
  },

  // Settings
  getSettings: () => cache.settings,
  saveSettings: (settings) => {
    cache.settings = settings;
    saveCached(CACHE_KEYS.SETTINGS, settings);
    window.dispatchEvent(new Event('wm_settings_updated'));
    fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    }).catch(err => console.warn('Failed to save settings to backend:', err));
  },

  // Auth helper with Node backend API
  loginAdmin: async (username, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn('Backend login fallback to local credentials:', err);
      const activeSettings = cache.settings;
      const targetUser = activeSettings.adminUsername || 'corelix';
      const targetPass = activeSettings.adminPassword || 'corelix@2026';
      if (username === targetUser && password === targetPass) {
        return { success: true };
      }
      return { success: false, error: 'Invalid username or password' };
    }
  },

  // Safety & Data Backup Methods
  exportData: () => {
    return JSON.stringify({
      version: '1.0',
      timestamp: new Date().toISOString(),
      services: cache.services,
      blogs: cache.blogs,
      works: cache.works,
      settings: cache.settings,
      inquiries: cache.inquiries
    }, null, 2);
  },
  importData: (importedObj) => {
    if (!importedObj || typeof importedObj !== 'object') throw new Error('Invalid backup file format');
    if (importedObj.services) { cache.services = importedObj.services; saveCached(CACHE_KEYS.SERVICES, cache.services); }
    if (importedObj.blogs) { cache.blogs = importedObj.blogs; saveCached(CACHE_KEYS.BLOGS, cache.blogs); }
    if (importedObj.works) { cache.works = importedObj.works; saveCached(CACHE_KEYS.WORKS, cache.works); }
    if (importedObj.settings) { cache.settings = importedObj.settings; saveCached(CACHE_KEYS.SETTINGS, cache.settings); }
    if (importedObj.inquiries) { cache.inquiries = importedObj.inquiries; saveCached(CACHE_KEYS.INQUIRIES, cache.inquiries); }
    window.dispatchEvent(new Event('wm_services_updated'));
    window.dispatchEvent(new Event('wm_blogs_updated'));
    window.dispatchEvent(new Event('wm_works_updated'));
    window.dispatchEvent(new Event('wm_settings_updated'));
    window.dispatchEvent(new Event('wm_inquiries_updated'));
    syncWithBackend();
  },
  resetToDefaults: () => {
    cache.services = DEFAULT_SERVICES;
    cache.blogs = DEFAULT_BLOGS;
    cache.works = DEFAULT_WORKS;
    cache.settings = DEFAULT_SETTINGS;
    cache.inquiries = DEFAULT_INQUIRIES;
    saveCached(CACHE_KEYS.SERVICES, DEFAULT_SERVICES);
    saveCached(CACHE_KEYS.BLOGS, DEFAULT_BLOGS);
    saveCached(CACHE_KEYS.WORKS, DEFAULT_WORKS);
    saveCached(CACHE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    saveCached(CACHE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
    window.dispatchEvent(new Event('wm_services_updated'));
    window.dispatchEvent(new Event('wm_blogs_updated'));
    window.dispatchEvent(new Event('wm_works_updated'));
    window.dispatchEvent(new Event('wm_settings_updated'));
    window.dispatchEvent(new Event('wm_inquiries_updated'));
    fetch(`${API_BASE_URL}/services`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(DEFAULT_SERVICES) });
    fetch(`${API_BASE_URL}/blogs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(DEFAULT_BLOGS) });
    fetch(`${API_BASE_URL}/works`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(DEFAULT_WORKS) });
    fetch(`${API_BASE_URL}/settings`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(DEFAULT_SETTINGS) });
  }
};
