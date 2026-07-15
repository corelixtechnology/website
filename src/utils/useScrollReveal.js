import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to enable high-performance scroll-driven and staggered entrance animations.
 * Works dynamically with React Router updates via MutationObserver.
 */
export default function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px', // trigger 50px before entering viewport
      threshold: 0.05, // trigger when 5% is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once revealed, unobserve to optimize performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Configure stagger elements
    const setupStaggers = () => {
      const staggerContainers = document.querySelectorAll('.reveal-stagger');
      staggerContainers.forEach((container) => {
        const items = container.querySelectorAll('.reveal-item');
        items.forEach((item, index) => {
          if (!item.classList.contains('reveal')) {
            item.classList.add('reveal');
          }
          // Set transition delay only if not set already
          if (!item.style.transitionDelay) {
            item.style.transitionDelay = `${index * 0.08}s`;
          }
          observer.observe(item);
        });
      });
    };

    // Configure standalone reveal elements
    const setupSingleReveals = () => {
      const singleReveals = document.querySelectorAll('.reveal:not(.reveal-item)');
      singleReveals.forEach((el) => {
        observer.observe(el);
      });
    };

    // Fallback helper to immediately reveal elements already visible in viewport
    const revealVisibleOnLoad = () => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          el.classList.add('active');
        }
      });
    };

    // Initialize reveal elements on route/page load
    setupStaggers();
    setupSingleReveals();
    
    // Run visible check with a tiny delay to allow browser layout calculation
    const loadTimer = setTimeout(revealVisibleOnLoad, 50);

    // Setup MutationObserver to watch for dynamically loaded components / sections
    const mutationObserver = new MutationObserver(() => {
      setupStaggers();
      setupSingleReveals();
      revealVisibleOnLoad();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(loadTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]); // Re-initialize on route changes
}
