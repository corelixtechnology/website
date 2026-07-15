import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import WorksPage from './pages/WorksPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import SitemapPage from './pages/SitemapPage';
import Footer from './components/Footer';


export default function App() {
  const [mouseTrail, setMouseTrail] = useState([]);
  const location = useLocation();

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Mouse trail particles emitter
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newDot = {
        id: Math.random().toString(36).substr(2, 9),
        x: e.clientX,
        y: e.clientY,
      };
      
      setMouseTrail((prev) => [...prev.slice(-15), newDot]); // Keep last 15 particles
    };

    window.addEventListener('mousemove', handleMouseMove);
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

      {/* Routed Main Content */}
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/sitemap" element={<SitemapPage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
