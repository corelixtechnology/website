import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// ── Eagerly loaded (needed on first paint) ─────────────────────────────────
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedBackgroundVideo from './components/AnimatedBackgroundVideo';
import PagePreloader from './components/PagePreloader';
import useScrollReveal from './utils/useScrollReveal';

// ── Lazily loaded pages (only downloaded when the user visits them) ─────────
const Home           = lazy(() => import('./pages/Home'));
const ServicesPage   = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const WorksPage      = lazy(() => import('./pages/WorksPage'));
const AboutPage      = lazy(() => import('./pages/AboutPage'));
const BlogPage       = lazy(() => import('./pages/BlogPage'));
const CareersPage    = lazy(() => import('./pages/CareersPage'));
const ContactPage    = lazy(() => import('./pages/ContactPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const SitemapPage    = lazy(() => import('./pages/SitemapPage'));

// ── Minimal suspense fallback (invisible spinner, won't block LCP) ──────────
function PageSuspense({ children }) {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div className="page-suspense-spinner" />
      </div>
    }>
      {children}
    </Suspense>
  );
}

export default function App() {
  const [mouseTrail, setMouseTrail] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  // Initialize Scroll-driven entrance animations
  useScrollReveal();

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    setScrollProgress(0); // Reset scroll progress bar
  }, [location.pathname]);

  // Track page scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100, isHovered: false });

  // Mouse cursor & trail handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos(prev => ({ ...prev, x: e.clientX, y: e.clientY }));

      const newDot = {
        id: Math.random().toString(36).substr(2, 9),
        x: e.clientX,
        y: e.clientY,
      };
      
      setMouseTrail((prev) => [...prev.slice(-12), newDot]);

      // Check hover target
      const target = e.target;
      const isInteractive = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('service-card') ||
        target.classList.contains('portfolio-card') ||
        target.classList.contains('services-showcase-card')
      );
      setCursorPos(prev => ({ ...prev, isHovered: !!isInteractive }));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Remove particles from trail after decay timer
  useEffect(() => {
    if (mouseTrail.length === 0) return;
    
    const interval = setInterval(() => {
      setMouseTrail((prev) => prev.slice(1));
    }, 100);

    return () => clearInterval(interval);
  }, [mouseTrail]);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Site Preloader Screen with Multi-Color Arc & Centered Brand Logo */}
      <PagePreloader />

      {/* Global Animated High-Tech Canvas Motion Background (video removed for performance) */}
      <AnimatedBackgroundVideo />

      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Interactive Custom Glowing Circular Cursor Ring */}
      <div 
        className={`circle-cursor-ring ${cursorPos.isHovered ? 'cursor-expanded' : ''}`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />
      <div 
        className="circle-cursor-dot"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />

      {/* Custom Particle Cursor Trail */}
      <div className="cursor-trail">
        {mouseTrail.map((dot) => (
          <div
            key={dot.id}
            className="trail-dot"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y}px`,
            }}
          />
        ))}
      </div>

      {/* Global Navbar */}
      <Navbar />

      {/* Routed Main Content — all pages are lazily loaded */}
      <main style={{ flexGrow: 1 }}>
        <PageSuspense>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/services"   element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/works"      element={<WorksPage />} />
            <Route path="/about"      element={<AboutPage />} />
            <Route path="/blog"       element={<BlogPage />} />
            <Route path="/careers"    element={<CareersPage />} />
            <Route path="/contact"    element={<ContactPage />} />
            <Route path="/admin"      element={<AdminDashboard />} />
            <Route path="/sitemap"    element={<SitemapPage />} />
          </Routes>
        </PageSuspense>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
