import React, { useState, useEffect } from 'react';
import { Cpu, Flame, CheckCircle, Calculator, Info, Clock, Sparkles } from 'lucide-react';
import { db } from '../utils/db';

export default function CoffeeCalculator() {
  const [complexity, setComplexity] = useState(2);
  const [coffeeGrade, setCoffeeGrade] = useState('arabica');
  const [isUrgent, setIsUrgent] = useState(false);
  const [settings, setSettings] = useState(() => db.getSettings());

  // Add-on options
  const [addons, setAddons] = useState({
    animations: false,
    seo: false,
    support: false
  });

  const [estimation, setEstimation] = useState({ cups: 0, cost: 0, breakdowns: 0, timeline: '' });

  const complexities = [
    { label: 'Core Landing Page', desc: 'Static architecture, responsive visual blocks, scrolling highlights.' },
    { label: 'Commercial E-Commerce / CMS', desc: 'Payment gateway integrations, cart systems, catalog dashboards.' },
    { label: 'SaaS Platform & Dashboard', desc: 'Custom databases, external API endpoints, multi-role user authentications.' },
    { label: 'Real-Time Interactive App', desc: 'Live data streaming, WebSocket integration, notifications, data dashboards.' },
    { label: 'Enterprise Custom Portal', desc: 'High-end custom animations, micro-frontends, advanced security configurations.' }
  ];

  const coffeeGrades = {
    instant: { label: 'Standard Package (Core implementation)', multiplier: 0.8, priceMult: 0.7 },
    arabica: { label: 'Advanced Package (Includes testing & QA)', multiplier: 1.0, priceMult: 1.0 },
    sumatra: { label: 'Premium Package (High performance & scalability)', multiplier: 1.25, priceMult: 1.3 },
    civet: { label: 'Enterprise Package (Architect-led support)', multiplier: 1.8, priceMult: 2.0 }
  };

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(db.getSettings());
    };
    window.addEventListener('wm_settings_updated', handleUpdate);
    return () => window.removeEventListener('wm_settings_updated', handleUpdate);
  }, []);

  useEffect(() => {
    // Basic calculation formula
    const baseCups = (complexity + 1) * 20; 
    const baseCost = (complexity + 1) * 750;
    const baseBreakdowns = Math.floor(complexity + 2); 

    const gradeData = coffeeGrades[coffeeGrade];
    
    let cups = Math.ceil(baseCups * gradeData.multiplier);
    let cost = Math.ceil(baseCost * gradeData.priceMult);
    let breakdowns = baseBreakdowns;

    // Apply add-on costs
    if (addons.animations) cost += 250;
    if (addons.seo) cost += 180;
    if (addons.support) cost += 350;

    // Apply urgency
    if (isUrgent) {
      cups = Math.ceil(cups * 1.2) + 5;
      cost = Math.ceil(cost * 1.25) + 150;
      breakdowns += 1;
    }

    // Timeline calculation
    let timeline = '';
    let days = Math.ceil((complexity + 1) * 7 * gradeData.multiplier);
    if (isUrgent) days = Math.ceil(days / 1.3);

    if (days <= 10) {
      timeline = `${days - 2}-${days} Days`;
    } else {
      const weeks = Math.ceil(days / 7);
      timeline = `${weeks - 1}-${weeks + 1} Weeks`;
    }

    setEstimation({ cups, cost, breakdowns, timeline });
  }, [complexity, coffeeGrade, isUrgent, addons]);

  const handleRequestQuote = () => {
    const serviceMap = {
      0: 'web-dev',
      1: 'ecommerce',
      2: 'web-dev',
      3: 'web-dev',
      4: 'web-dev'
    };

    const promoDiscount = settings.seasonalDiscount || 0;
    const finalPromoCost = Math.ceil(estimation.cost * (1 - promoDiscount / 100));

    const pending = {
      cost: finalPromoCost,
      serviceType: serviceMap[complexity] || 'web-dev',
      scopeName: complexities[complexity].label,
      packageName: coffeeGrades[coffeeGrade].label.split(' (')[0],
      hours: estimation.cups,
      phases: estimation.breakdowns
    };

    localStorage.setItem('wm_pending_estimate', JSON.stringify(pending));
    // Trigger custom event so ContactForm immediately updates its state
    window.dispatchEvent(new Event('wm_estimate_applied'));

    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const promoDiscount = settings.seasonalDiscount || 0;
  const promoCost = Math.ceil(estimation.cost * (1 - promoDiscount / 100));
  const agencyEquivalent = estimation.cost * 3.5;

  return (
    <section className="section calculator-section" style={{ backgroundColor: 'var(--bg-darker)', position: 'relative' }}>
      <div className="ambient-glow-2"></div>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="services-intro-tag">Flexible Budgets</span>
          <h2 className="section-title">Project Budget & Scope Estimator</h2>
          <p className="section-subtitle">
            Craft a budget that fits your scale. Adjust the project complexity, service package level, and select add-on deliverables to view our pricing.
          </p>
        </div>

        <div className="calculator-pane glass-panel">
          <div className="calc-options-grid">
            {/* Slider & Add-ons Column */}
            <div className="slider-container">
              <div className="slider-labels">
                <span>Project Scope:</span>
                <span className="text-gradient-purple-cyan" style={{ fontWeight: '700' }}>
                  {complexities[complexity].label}
                </span>
              </div>
              
              <input
                type="range"
                min="0"
                max="4"
                value={complexity}
                onChange={(e) => setComplexity(parseInt(e.target.value))}
                className="calculator-slider"
              />
              
              <p className="slider-hint" style={{ marginBottom: '1.5rem' }}>
                "{complexities[complexity].desc}"
              </p>

              {/* Add-ons Checklist */}
              <div className="addons-checklist">
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
                  Add-on Project Features:
                </span>
                <div className="addons-grid">
                  <label className="addon-check-card">
                    <input
                      type="checkbox"
                      checked={addons.animations}
                      onChange={(e) => setAddons({ ...addons, animations: e.target.checked })}
                    />
                    <div className="addon-info">
                      <span>Advanced Animations</span>
                      <small>+$250</small>
                    </div>
                  </label>

                  <label className="addon-check-card">
                    <input
                      type="checkbox"
                      checked={addons.seo}
                      onChange={(e) => setAddons({ ...addons, seo: e.target.checked })}
                    />
                    <div className="addon-info">
                      <span>Full SEO Strategy Pack</span>
                      <small>+$180</small>
                    </div>
                  </label>

                  <label className="addon-check-card">
                    <input
                      type="checkbox"
                      checked={addons.support}
                      onChange={(e) => setAddons({ ...addons, support: e.target.checked })}
                    />
                    <div className="addon-info">
                      <span>3 Months Post Support</span>
                      <small>+$350</small>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Selects Column */}
            <div className="coffee-grade-select">
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Service Package Level:
              </label>
              <select
                value={coffeeGrade}
                onChange={(e) => setCoffeeGrade(e.target.value)}
                className="coffee-select-input"
              >
                {Object.entries(coffeeGrades).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>

              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="urgent-check"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                />
                <label htmlFor="urgent-check" style={{ cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Flame size={14} color="var(--accent)" /> Accelerated Delivery (ASAP)
                </label>
              </div>

              {/* Scope Deliverables Preview */}
              <div className="estimator-bullets-box" style={{ marginTop: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--secondary)', letterSpacing: '1px' }}>
                  Included Value:
                </span>
                <ul className="calculator-bullets-list" style={{ paddingLeft: 0, listStyle: 'none', margin: '0.5rem 0 0 0' }}>
                  <li style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                    <CheckCircle size={12} color="var(--secondary)" /> Mobile Responsive layouts
                  </li>
                  <li style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                    <CheckCircle size={12} color="var(--secondary)" /> SEO Semantic Structuring
                  </li>
                  <li style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                    <CheckCircle size={12} color="var(--secondary)" /> Handover Source Code Access
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Calculator Output */}
          <div className="calc-result-box">
            <div className="result-formula">
              <div className="founder-avatar-container" style={{ width: '50px', height: '50px', margin: 0, boxShadow: 'none' }}>
                <div className="founder-avatar-inner" style={{ background: 'rgba(6,182,212,0.1)' }}>
                  <Cpu className="coffee-icon-bounce" size={24} style={{ color: 'var(--secondary)' }} />
                </div>
              </div>
              <div className="result-text">
                <h4 style={{ margin: 0, fontSize: '1rem', color: 'white' }}>Timeline & Engineering Scope</h4>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem' }}>
                  Engineering effort: <strong>{estimation.cups} hours</strong> • <strong style={{ color: 'var(--secondary)' }}>{estimation.breakdowns} development phases</strong>.
                </p>
                <div className="timeline-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', background: 'rgba(139,92,246,0.15)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600' }}>
                  <Clock size={12} /> Launch Timeline: {estimation.timeline}
                </div>
              </div>
            </div>

            {/* Pricing Details Panel */}
            <div className="pricing-output-box" style={{ textAlign: 'right' }}>
              {promoDiscount > 0 ? (
                <>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    Regular: ${estimation.cost.toLocaleString()}
                  </div>
                  <div className="result-total text-gradient-purple-cyan" style={{ fontSize: '2.2rem', fontWeight: '800', lineHeight: 1 }}>
                    ${promoCost.toLocaleString()}
                  </div>
                  <div className="discount-badge" style={{ display: 'inline-block', background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700', marginTop: '0.25rem' }}>
                    ✨ {promoDiscount}% Launch Discount Applied
                  </div>
                </>
              ) : (
                <div className="result-total" style={{ fontSize: '2.2rem', fontWeight: '800' }}>
                  ${estimation.cost.toLocaleString()}
                </div>
              )}
              
              <div className="agency-compare-tag" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Agency equivalent: <strong style={{ color: 'var(--accent)' }}>${agencyEquivalent.toLocaleString()}+</strong> (You save ~75%)
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button onClick={handleRequestQuote} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calculator size={16} /> Request Custom Quotation
            </button>
          </div>

          <p className="coffee-calc-disclaimer" style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            *Disclaimer: Estimates are calculated based on typical project scopes. Contact us for a detailed project outline and formal quote.
          </p>
        </div>
      </div>
    </section>
  );
}
