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
      rootMargin: '0px 0px 50px 0px', // start animating 50px before element hits screen
      threshold: 0.01,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
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
          if (!item.style.transitionDelay) {
            item.style.transitionDelay = `${index * 0.08}s`;
          }
          observer.observe(item);
        });
      });
    };

    // Configure standalone reveal elements
    const setupSingleReveals = () => {
      const singleReveals = document.querySelectorAll('.reveal');
      singleReveals.forEach((el) => {
        observer.observe(el);
      });
    };

    // Fallback helper to immediately reveal elements already visible in viewport
    const revealVisibleOnLoad = () => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < (window.innerHeight || document.documentElement.clientHeight) + 100 && rect.bottom > -100;
        if (isInViewport) {
          el.classList.add('active');
        }
      });
    };

    // Safety fallback: reveal everything after 1.2s so content is never stuck hidden
    const safetyTimer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal:not(.active)');
      elements.forEach((el) => el.classList.add('active'));
    }, 1200);

    // Initialize reveal elements on route/page load
    setupStaggers();
    setupSingleReveals();
    revealVisibleOnLoad();

    const loadTimer = setTimeout(revealVisibleOnLoad, 60);

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
      clearTimeout(safetyTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]); // Re-initialize on route changes
}
