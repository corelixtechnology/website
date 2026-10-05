import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * High-performance scroll-driven and staggered entrance animations.
 * Handles React Suspense lazy chunks, route transitions, and dynamic DOM insertions.
 */
export default function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px 100px 0px',
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

    const activateElement = (el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // If element is anywhere near the current viewport or above the fold, activate immediately
      if (rect.top < vh + 250 && rect.bottom > -250) {
        el.classList.add('active');
      } else {
        observer.observe(el);
      }
    };

    const processAllReveals = () => {
      // 1. Stagger containers
      const staggerContainers = document.querySelectorAll('.reveal-stagger');
      staggerContainers.forEach((container) => {
        const items = container.querySelectorAll('.reveal-item');
        items.forEach((item, index) => {
          if (!item.classList.contains('reveal')) {
            item.classList.add('reveal');
          }
          if (!item.style.transitionDelay) {
            item.style.transitionDelay = `${index * 0.06}s`;
          }
          activateElement(item);
        });
      });

      // 2. Individual reveal elements
      const singleReveals = document.querySelectorAll('.reveal, .home-scroll-section');
      singleReveals.forEach((el) => {
        activateElement(el);
      });
    };

    // Run immediately
    processAllReveals();

    // Run on successive animation frames & delays for Suspense lazy-loaded route chunks
    const t1 = setTimeout(processAllReveals, 50);
    const t2 = setTimeout(processAllReveals, 150);
    const t3 = setTimeout(processAllReveals, 350);
    const t4 = setTimeout(processAllReveals, 700);

    // Safety fallback: reveal everything after 1s so content is never stuck blank
    const safetyTimer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal:not(.active), .home-scroll-section:not(.active)');
      elements.forEach((el) => el.classList.add('active'));
    }, 1000);

    // Watch for dynamically loaded components / Suspense completions
    const mutationObserver = new MutationObserver(() => {
      processAllReveals();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(safetyTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname, location.search]);
}

