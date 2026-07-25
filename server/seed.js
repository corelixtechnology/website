import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';
import Blog from './models/Blog.js';
import Work from './models/Work.js';
import Inquiry from './models/Inquiry.js';
import Settings from './models/Settings.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/corelix';

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
    isActive: true,
    order: 1
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
    isActive: true,
    order: 2
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
    isActive: true,
    order: 3
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
    isActive: true,
    order: 4
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
    isActive: true,
    order: 5
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
    isActive: true,
    order: 6
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
    isActive: true,
    order: 7
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
    isActive: true,
    order: 8
  }
];

const DEFAULT_BLOGS = [
  {
    id: '1',
    title: 'Building Scalable Architecture: Best Practices for Startups',
    slug: 'building-scalable-architecture',
    category: 'Engineering',
    date: 'July 1, 2026',
    excerpt: 'Learn how to architect your digital platform for scalability and reliability. We discuss key design patterns to handle sudden traffic spikes and optimize cloud infrastructure costs.',
    content: 'Learn how to architect your digital platform for scalability and reliability. We discuss key design patterns to handle sudden traffic spikes and optimize cloud infrastructure costs.',
    author: 'Corelix Team',
    readTime: '4 min read',
    tags: ['Architecture', 'Startups', 'Scalability'],
    isActive: true
  },
  {
    id: '2',
    title: 'Modern UI/UX Designs: Optimizing for User Engagement',
    slug: 'modern-ui-ux-designs',
    category: 'Design Systems',
    date: 'June 24, 2026',
    excerpt: 'Discover how cohesive design systems, modern typography, and clean micro-interactions can improve user retention, build brand trust, and boost conversion rates.',
    content: 'Discover how cohesive design systems, modern typography, and clean micro-interactions can improve user retention, build brand trust, and boost conversion rates.',
    author: 'Corelix Team',
    readTime: '5 min read',
    tags: ['UI/UX', 'Design', 'Engagement'],
    isActive: true
  },
  {
    id: '3',
    title: 'E-Commerce Optimization: Improving Checkout Conversion',
    slug: 'e-commerce-optimization',
    category: 'Business',
    date: 'May 12, 2026',
    excerpt: 'Minor adjustments to checkout layouts and checkout paths can significantly reduce cart abandonment. Explore the UX methodologies that drive online sales.',
    content: 'Minor adjustments to checkout layouts and checkout paths can significantly reduce cart abandonment. Explore the UX methodologies that drive online sales.',
    author: 'Corelix Team',
    readTime: '3 min read',
    tags: ['E-Commerce', 'Conversion', 'Sales'],
    isActive: true
  }
];

const DEFAULT_WORKS = [
  {
    id: '1',
    title: 'Zenith Organic Brochure',
    category: 'brochures',
    client: 'Zenith Farm Co.',
    desc: 'An eco-friendly tri-fold brochure using earth-tone organic color schemes, custom layouts, and FSC-certified paper specifications.',
    pills: ['Print Design', 'Tri-fold', 'Green-Mktg'],
    mockupType: 'brochure',
    isActive: true
  },
  {
    id: '2',
    title: 'Aura Cosmetics Pack',
    category: 'brochures',
    client: 'Aura Skin Care',
    desc: 'Luxury packaging design for a premium skincare line, incorporating gold-foil embossing and clean typography.',
    pills: ['Packaging', '3D Die-cut', 'Cosmetics'],
    mockupType: 'package',
    isActive: true
  },
  {
    id: '3',
    title: 'CryptoSphere Dashboard',
    category: 'web-works',
    client: 'CryptoSphere Ltd.',
    desc: 'A decentralized finance crypto portal featuring real-time interactive charts, dark mode widgets, and user wallets connect flows.',
    pills: ['React', 'Web Dev', 'DeFi Portal'],
    mockupType: 'web-dashboard',
    isActive: true
  },
  {
    id: '4',
    title: 'EduTrack SaaS App',
    category: 'web-works',
    client: 'EduTrack Systems',
    desc: 'Interactive university student metrics management system dashboard. Features dark/light themes, calendar schedules, and course progress.',
    pills: ['Next.js', 'API Sync', 'EdTech'],
    mockupType: 'web-portal',
    isActive: true
  },
  {
    id: '5',
    title: 'Nebula Juice Branding',
    category: 'branding-ads',
    client: 'Nebula Beverages',
    desc: 'Complete brand redesign including an abstract glowing logo, stationery set, and high-energy social media ads.',
    pills: ['Branding', 'Ad Campaign', 'Social Creatives'],
    mockupType: 'branding',
    isActive: true
  },
  {
    id: '6',
    title: 'Apex Gym Ad Campaign',
    category: 'branding-ads',
    client: 'Apex Fitness Ltd.',
    desc: 'Bold, high-contrast digital advertising posters featuring custom overlays, energetic typography, and banner distributions.',
    pills: ['Advertisement', 'Poster Campaign', 'Ad Banner'],
    mockupType: 'ad',
    isActive: true
  }
];

const DEFAULT_SETTINGS = {
  companyName: 'Corelix Technology',
  contactEmail: 'corelixtechonology@gmail.com',
  contactPhone: '9360410038',
  officeAddress: 'Corelix Tech Park, Cyber City, Bangalore, KA, India',
  adminUsername: 'corelix',
  adminPassword: 'corelix@2026',
  primaryColor: '#6366f1'
};

async function seed() {
  try {
    console.log('Connecting to MongoDB:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Service.deleteMany({});
    await Service.insertMany(DEFAULT_SERVICES);
    console.log('Seeded Services');

    await Blog.deleteMany({});
    await Blog.insertMany(DEFAULT_BLOGS);
    console.log('Seeded Blogs');

    await Work.deleteMany({});
    await Work.insertMany(DEFAULT_WORKS);
    console.log('Seeded Works');

    await Settings.deleteMany({});
    await Settings.create(DEFAULT_SETTINGS);
    console.log('Seeded Settings');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seed();
