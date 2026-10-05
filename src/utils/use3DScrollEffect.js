import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * High-performance 3D Scroll Parallax & Interactive 3D Card Tilt Hook.
 * Adds perspective depth, rotational parallax on scroll, and mouse-tracked 3D tilt.
 */
export default function use3DScrollEffect() {
  const location = useLocation();

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let ticking = false;

    // ── 1. Scroll-driven 3D Rotation & Parallax ──────────────────────────────
    const handleScroll3D = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const vh = window.innerHeight;

          // Apply 3D Scroll Perspective to 3D targets
          const targets = document.querySelectorAll('.scroll-3d-target, .luxury-work-card, .luxury-testimonial-card, .luxury-pillar-card, .service-intro-card, .collage-portrait-card, .luxury-blog-card');
          
          targets.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = vh / 2;
            const distanceFromCenter = (elementCenter - viewportCenter) / (vh / 2); // -1 (top) to +1 (bottom)

            // Calculate subtle 3D rotational tilt (-6deg to +6deg)
            const clampedDist = Math.max(-1.2, Math.min(1.2, distanceFromCenter));
            const rotateX = clampedDist * -5.5; // tilts up or down depending on scroll position
            const translateY = clampedDist * 8;
            const translateZ = (1 - Math.abs(clampedDist)) * 12; // pops out toward user when centered

            el.style.setProperty('--scroll-rotate-x', `${rotateX.toFixed(2)}deg`);
            el.style.setProperty('--scroll-translate-y', `${translateY.toFixed(2)}px`);
            el.style.setProperty('--scroll-translate-z', `${translateZ.toFixed(2)}px`);
          });

          // Subtle Parallax on Hero floating elements
          const floatingChips = document.querySelectorAll('.hero-floating-chip, .badge-experience-violet-card, .luxury-founder-float-card, .luxury-stat-float-card');
          floatingChips.forEach((chip, i) => {
            const factor = (i % 2 === 0 ? 1 : -1) * 0.08;
            const shiftY = scrollY * factor;
            chip.style.transform = `translate3d(0, ${shiftY.toFixed(1)}px, 20px)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll3D, { passive: true });
    handleScroll3D();

    // ── 2. Interactive 3D Cursor Tilt & Specular Glare (Desktop only) ───────
    let currentHoverCard = null;

    const handleCardMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = -((y - centerY) / centerY) * 9; // -9deg to +9deg
      const rotateY = ((x - centerX) / centerX) * 9;   // -9deg to +9deg

      card.style.setProperty('--mouse-rotate-x', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--mouse-rotate-y', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--glare-x', `${((x / rect.width) * 100).toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${((y / rect.height) * 100).toFixed(1)}%`);
    };

    const handleCardMouseLeave = (e) => {
      const card = e.currentTarget;
      card.style.setProperty('--mouse-rotate-x', '0deg');
      card.style.setProperty('--mouse-rotate-y', '0deg');
    };

    const bind3DCards = () => {
      if (isTouch) return;
      const tiltCards = document.querySelectorAll('.luxury-work-card, .luxury-testimonial-card, .luxury-pillar-card, .luxury-blog-card, .service-intro-card, .collage-portrait-card, .value-card, .about-stat-card');
      
      tiltCards.forEach((card) => {
        card.classList.add('card-3d-interactive');
        card.removeEventListener('mousemove', handleCardMouseMove);
        card.removeEventListener('mouseleave', handleCardMouseLeave);
        card.addEventListener('mousemove', handleCardMouseMove, { passive: true });
        card.addEventListener('mouseleave', handleCardMouseLeave, { passive: true });
      });
    };

    bind3DCards();

    const observer = new MutationObserver(() => {
      bind3DCards();
      handleScroll3D();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll3D);
      observer.disconnect();
    };
  }, [location.pathname]);
}
