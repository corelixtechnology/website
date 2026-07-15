import type { Core } from '@strapi/strapi';

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
  adminPassword: 'corelix@2026'
};



export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // 1. Seed Services
    try {
      const serviceService = strapi.documents('api::service.service');
      const existingServices = await serviceService.findMany({ limit: 1 });
      if (existingServices.length === 0) {
        for (const service of DEFAULT_SERVICES) {
          await serviceService.create({
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
          });
        }
        console.log('Seeded services successfully.');
      }
    } catch (err) {
      console.error('Failed to seed services:', err);
    }

    // 2. Seed Blogs
    try {
      const blogService = strapi.documents('api::blog.blog');
      const existingBlogs = await blogService.findMany({ limit: 1 });
      if (existingBlogs.length === 0) {
        for (const blog of DEFAULT_BLOGS) {
          await blogService.create({
            data: {
              blogId: String(blog.id),
              title: blog.title,
              excerpt: blog.desc,
              content: blog.desc,
              category: blog.category,
              readTime: blog.readTime,
              date: blog.date,
              imageType: blog.iconName,
              views: 120,
              likes: 12,
              commentsCount: 2,
              isActive: blog.isActive
            }
          });
        }
        console.log('Seeded blogs successfully.');
      }
    } catch (err) {
      console.error('Failed to seed blogs:', err);
    }

    // 3. Seed Works
    try {
      const workService = strapi.documents('api::work.work');
      const existingWorks = await workService.findMany({ limit: 1 });
      if (existingWorks.length === 0) {
        for (const work of DEFAULT_WORKS) {
          await workService.create({
            data: {
              workId: work.id,
              title: work.title,
              category: work.category,
              client: work.client,
              desc: work.desc,
              tags: work.tags,
              rating: work.rating,
              svgType: work.svgType,
              isActive: work.isActive
            }
          });
        }
        console.log('Seeded works successfully.');
      }
    } catch (err) {
      console.error('Failed to seed works:', err);
    }

    // 4. Seed Settings
    try {
      const settingService = strapi.documents('api::setting.setting');
      const existingSetting = await settingService.findMany({ limit: 1 });
      if (existingSetting.length === 0) {
        await settingService.create({
          data: DEFAULT_SETTINGS
        });
        console.log('Seeded settings successfully.');
      }
    } catch (err) {
      console.error('Failed to seed settings:', err);
    }

    // 5. Seed Inquiries (Disabled to prevent re-seeding default mock inquiries)

    // 6. Bootstrap Public API Permissions
    try {
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });
      if (publicRole) {
        const publicPermissions = [
          'api::service.service.find',
          'api::service.service.findOne',
          'api::service.service.create',
          'api::service.service.update',
          'api::service.service.destroy',
          'api::blog.blog.find',
          'api::blog.blog.findOne',
          'api::blog.blog.create',
          'api::blog.blog.update',
          'api::blog.blog.destroy',
          'api::work.work.find',
          'api::work.work.findOne',
          'api::work.work.create',
          'api::work.work.update',
          'api::work.work.destroy',
          'api::setting.setting.find',
          'api::inquiry.inquiry.create',
          'api::inquiry.inquiry.find',
          'api::inquiry.inquiry.findOne',
          'api::inquiry.inquiry.destroy',
          'api::inquiry.inquiry.update',
        ];
        
        for (const action of publicPermissions) {
          const exists = await strapi.query('plugin::users-permissions.permission').findOne({
            where: { action, role: publicRole.id }
          });
          if (!exists) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: { action, role: publicRole.id }
            });
          }
        }
        console.log('Public permissions verified successfully.');
      }
    } catch (err) {
      console.error('Failed to configure public permissions:', err);
    }
  }
};
