import React from 'react';
import { ClipboardList, Calendar, ShoppingBag, TrendingUp } from 'lucide-react';

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="process-section">
      <div className="ambient-glow-1"></div>
      <div className="container">
        
        <div className="process-header reveal reveal-slide-up">
          <span className="process-tag">Our Process</span>
          <h2 className="process-title">
            How We <span className="underline-highlight">Works</span>
          </h2>
          <p className="process-subtitle">
            We follow a structured, transparent digital product workflow built to turn your vision into market-ready platforms.
          </p>
        </div>

        <div className="process-grid reveal-stagger">
          {/* Step 1 */}
          <div className="process-step reveal-item">
            <div className="process-icon-circle outline-circle theme-cyan">
              <ClipboardList size={30} />
            </div>
            <h3>Choose Your Service</h3>
            <p>Choose the Services what are all you want from us</p>
            
            <div className="process-connector">
              <svg width="100%" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5 C 45 22, 55 2, 95 10" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="2" strokeDasharray="5 5" />
                <path d="M90 5 L95 10 L88 14" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Step 2 */}
          <div className="process-step reveal-item">
            <div className="process-icon-circle filled-circle theme-green">
              <Calendar size={30} />
            </div>
            <h3>Consult With Us</h3>
            <p>Get a Customised best quote from us</p>

            <div className="process-connector">
              <svg width="100%" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10 C 45 2, 55 22, 95 5" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" strokeDasharray="5 5" />
                <path d="M90 1 L95 5 L89 10" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Step 3 */}
          <div className="process-step reveal-item">
            <div className="process-icon-circle filled-circle theme-green">
              <ShoppingBag size={30} />
            </div>
            <h3>Get the Service</h3>
            <p>We start to work to grow your brand</p>

            <div className="process-connector">
              <svg width="100%" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5 C 45 22, 55 2, 95 10" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" strokeDasharray="5 5" />
                <path d="M90 5 L95 10 L88 14" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Step 4 */}
          <div className="process-step reveal-item">
            <div className="process-icon-circle outline-circle theme-cyan">
              <TrendingUp size={30} />
            </div>
            <h3>Grow your Business</h3>
            <p>We will produce the live result with you happy</p>
          </div>
        </div>

      </div>
    </section>
  );
}
