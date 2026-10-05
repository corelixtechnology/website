import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot,
  MessageSquare,
  Send, 
  X, 
  RotateCcw, 
  MessageCircle, 
  CheckCircle2, 
  Check,
  ChevronRight, 
  Zap,
  Sparkles,
  PhoneCall,
  Calendar,
  ShieldCheck,
  Volume2,
  VolumeX
} from 'lucide-react';
import { db } from '../utils/db';
import './AIChatBot.css';

// Subtle Web Audio message pop sound
const playMessageChime = (isMuted) => {
  if (isMuted) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08); // A5
    
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    // AudioContext may be blocked before first interaction
  }
};

const INITIAL_GREETING = {
  id: 'msg_welcome',
  sender: 'bot',
  text: "Hey there! 👋 I'm **Corelix Project Advisor**.\n\nWhether you need a **custom high-speed website**, **Flutter mobile app**, **e-commerce store**, or want to **scale your business with SEO & ads** — I'm right here to help you scope it out!\n\nHow can I help you today?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  actions: [
    { type: 'lead_flow_start', label: '🚀 Get a Free Custom Quote & Blueprint' },
    { type: 'prompt', label: '💰 Pricing Packages & Rates', query: 'What are your pricing packages and rates?' },
    { type: 'prompt', label: '🛠️ Web & Mobile App Services', query: 'Tell me about your web and app development services' },
    { type: 'whatsapp', label: '💬 Chat with our Tech Lead on WhatsApp' }
  ]
};

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPromptedTooltip, setHasPromptedTooltip] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('wm_ai_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [INITIAL_GREETING];
      }
    }
    return [INITIAL_GREETING];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [settings, setSettings] = useState(() => db.getSettings());

  // Conversational Lead Funnel State (Human Step-by-Step Flow)
  const [leadStep, setLeadStep] = useState(0); // 0 = normal chat, 1 = asking name, 2 = asking service, 3 = asking contact, 4 = asking budget, 5 = completed
  const [leadData, setLeadData] = useState({
    name: '',
    service: '',
    contact: '',
    budget: '',
    notes: ''
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load database settings
  useEffect(() => {
    setSettings(db.getSettings());
    const handleUpdate = () => setSettings(db.getSettings());
    window.addEventListener('wm_settings_updated', handleUpdate);
    return () => window.removeEventListener('wm_settings_updated', handleUpdate);
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem('wm_ai_chat_history', JSON.stringify(messages));
  }, [messages]);

  // Auto show tooltip after 3.5 seconds on first page visit
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPromptedTooltip(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setHasPromptedTooltip(false);
    }
  };

  const clearChat = () => {
    setMessages([INITIAL_GREETING]);
    setLeadStep(0);
    setLeadData({ name: '', service: '', contact: '', budget: '', notes: '' });
    localStorage.removeItem('wm_ai_chat_history');
  };

  // Human-like Intelligent Natural Dialogue Engine
  const generateHumanResponse = (userText) => {
    const text = userText.toLowerCase().trim();
    const works = db.getWorks();
    const currSettings = db.getSettings();
    const discount = currSettings.seasonalDiscount || 20;
    const phone = currSettings.phoneNumber || '9360410038';
    const email = currSettings.email || 'corelixtechonology@gmail.com';
    const whatsappUrl = currSettings.whatsappUrl || `https://wa.me/91${phone}`;

    // A. Friendly Human Greetings & Chit-chat
    if (/^(hi|hello|hey|heya|yo|hlo|good morning|good afternoon|good evening|vanakkam|namaste|hola)/i.test(text)) {
      return {
        text: `Hey there! 😊 Great to connect with you!\n\nAre you planning a new **web or mobile project**, looking to upgrade your existing site, or simply exploring our services today?`,
        actions: [
          { type: 'lead_flow_start', label: '🚀 Plan a New Project (Get Quote)' },
          { type: 'prompt', label: '💡 Explore Services & Pricing', query: 'What services and pricing do you offer?' },
          { type: 'prompt', label: '⭐ See Recent Client Projects', query: 'Show me your portfolio and past works' },
          { type: 'whatsapp', label: '💬 Message on WhatsApp', url: whatsappUrl }
        ]
      };
    }

    // B. Human Identity / Bot question
    if (text.includes('who are you') || text.includes('are you human') || text.includes('are you a bot') || text.includes('real person')) {
      return {
        text: `I'm your **Corelix Project Consultant**! 👩‍💻\n\nI combine smart AI speed to give you immediate answers 24/7 with direct backing from our senior engineering team in Coimbatore, Tamil Nadu. Whenever you're ready, I can also connect you straight to our Lead Architect on WhatsApp or phone!`,
        actions: [
          { type: 'lead_flow_start', label: '✨ Let\'s Scope My Project' },
          { type: 'whatsapp', label: '📞 Talk to Live Specialist', url: whatsappUrl }
        ]
      };
    }

    // C. Quotation / Estimate / Hire / Consultation Intent
    if (
      text.includes('quote') || 
      text.includes('estimate') || 
      text.includes('hire') || 
      text.includes('proposal') || 
      text.includes('consult') || 
      text.includes('start project') || 
      text.includes('build me') ||
      text.includes('call me') ||
      text.includes('how to start')
    ) {
      setLeadStep(1);
      return {
        text: `I'd love to put together a personalized project roadmap and estimate for you! 🎯\n\nTo get started, **what is your full name?**`,
        isLeadStep: true
      };
    }

    // D. Pricing & Packages
    if (text.includes('price') || text.includes('cost') || text.includes('rate') || text.includes('package') || text.includes('budget') || text.includes('how much') || text.includes('fee')) {
      return {
        text: `Here is our transparent project pricing breakdown 💼:\n\n• **🚀 Starter Web Launch**: Single/Multi-page responsive site with SEO & speed optimization (From ₹15,000)\n• **🛍️ E-Commerce & Web App**: Custom storefront, payment gateways, product dashboard & CMS (From ₹35,000)\n• **📱 Mobile App (Flutter / React Native)**: Cross-platform iOS & Android with custom backend (From ₹65,000)\n• **🎨 Branding & Visual Identity**: Logo design, stationery & brand manual (From ₹8,000)\n\n🎁 *Plus, we're currently applying our **${discount}% Seasonal Discount** on all new projects this month!*`,
        actions: [
          { type: 'lead_flow_start', label: '⚡ Get Exact Quote for My Requirements' },
          { type: 'whatsapp', label: '💬 Discuss Budget on WhatsApp', url: whatsappUrl }
        ]
      };
    }

    // E. Web Development
    if (text.includes('web') || text.includes('react') || text.includes('frontend') || text.includes('portal') || text.includes('cms') || text.includes('next')) {
      return {
        text: `We specialize in ultra-fast, modern web engineering! ⚡\n\n• **Modern Tech**: React 19, Next.js, Vite, Node.js & high-performance databases.\n• **Speed Guaranteed**: 95+ PageSpeed scores for top Google ranking.\n• **Full Responsiveness**: Looks stunning on phones, tablets, and 4K displays.\n• **Custom Admin Portals**: Easily manage your products, leads, and content without touching code.\n\nAre you looking to build a new website from scratch or redesign an existing one?`,
        actions: [
          { type: 'lead_flow_start', label: '🌐 Request Web Development Quote' },
          { type: 'prompt', label: '🌟 View Past Web Case Studies', query: 'Show me your portfolio and past works' },
          { type: 'whatsapp', label: '💬 Chat with Lead Web Architect', url: whatsappUrl }
        ]
      };
    }

    // F. Mobile App Development
    if (text.includes('app') || text.includes('mobile') || text.includes('flutter') || text.includes('android') || text.includes('ios') || text.includes('play store') || text.includes('app store')) {
      return {
        text: `Mobile apps are our bread and butter! 📱\n\n• **Cross-Platform**: One unified Flutter/React codebase that delivers 60fps native performance on both iOS and Android.\n• **Key Features**: Push notifications, biometric login, offline sync, payment gateways, and geolocation.\n• **Store Publishing**: We handle full submission to Google Play Store & Apple App Store.\n\nWhat kind of mobile app idea do you have in mind?`,
        actions: [
          { type: 'lead_flow_start', label: '📲 Scope My Mobile App Idea' },
          { type: 'whatsapp', label: '💬 Discuss App Features on WhatsApp', url: whatsappUrl }
        ]
      };
    }

    // G. Delivery Timeline / How Fast
    if (text.includes('time') || text.includes('how long') || text.includes('timeline') || text.includes('duration') || text.includes('fast') || text.includes('urgent')) {
      return {
        text: `We pride ourselves on swift, milestone-driven execution ⏱️:\n\n• **Landing Pages / Brochures**: 3 to 7 business days\n• **Full Corporate / E-Commerce Sites**: 10 to 18 business days\n• **Custom Mobile Apps & SaaS**: 3 to 6 weeks\n\nNeed an express rush delivery for an upcoming launch? We can prioritize your sprint!`,
        actions: [
          { type: 'lead_flow_start', label: '🚀 Check Sprint Availability for My Project' },
          { type: 'whatsapp', label: '💬 Ask for Rush Timeline on WhatsApp', url: whatsappUrl }
        ]
      };
    }

    // H. SEO & Digital Marketing
    if (text.includes('seo') || text.includes('marketing') || text.includes('ads') || text.includes('google ranking') || text.includes('traffic') || text.includes('instagram') || text.includes('meta')) {
      return {
        text: `We don't just build software — we ensure customers find you first! 📈\n\n• **Technical & On-Page SEO**: Schema markup, speed optimization, keyword authority.\n• **High-ROAS Meta & Google Ads**: Targeted campaigns that turn views into qualified phone inquiries and sales.\n• **Full-Funnel Growth**: Analytics tracking, retargeting pixels, and conversion rate optimization.`,
        actions: [
          { type: 'lead_flow_start', label: '📊 Request a Free SEO & Growth Audit' },
          { type: 'whatsapp', label: '💬 Chat with Marketing Strategist', url: whatsappUrl }
        ]
      };
    }

    // I. Branding, Posters & Graphics
    if (text.includes('brand') || text.includes('logo') || text.includes('poster') || text.includes('brochure') || text.includes('graphic') || text.includes('flyer')) {
      return {
        text: `We craft bold, award-winning visual identities! 🎨\n\n• **Logos & Brand Identity**: Vector logos, typography guides, and corporate color palettes.\n• **Print & Packaging**: FSC-certified tri-fold brochures, retail product boxes, and flyers.\n• **Social Creatives**: High-impact thumb-stopping ad visuals.`,
        actions: [
          { type: 'lead_flow_start', label: '🎨 Request Brand Kit Quote' },
          { type: 'whatsapp', label: '💬 Share Brand Vision on WhatsApp', url: whatsappUrl }
        ]
      };
    }

    // J. Portfolio / Past Works
    if (text.includes('portfolio') || text.includes('work') || text.includes('case study') || text.includes('example') || text.includes('client') || text.includes('previous')) {
      const topWorks = works.slice(0, 3).map(w => `• **${w.title}**: ${w.desc}`).join('\n\n');
      return {
        text: `Here are a few recent client highlights we engineered 🌟:\n\n${topWorks}\n\nOver 50+ successful deployments across Education, Healthcare, E-Commerce, and SaaS!`,
        actions: [
          { type: 'lead_flow_start', label: '🚀 Build Something Similar' },
          { type: 'whatsapp', label: '💬 Request Live Demo Links', url: whatsappUrl }
        ]
      };
    }

    // K. Discounts & Offers
    if (text.includes('discount') || text.includes('offer') || text.includes('promo') || text.includes('deal') || text.includes('coupon')) {
      return {
        text: `🎉 Good news! We have an active **${discount}% New Client Discount** running right now on all custom web, app, and branding contracts signed this month!\n\nWould you like me to reserve your 20% discount coupon with a quick project estimate?`,
        actions: [
          { type: 'lead_flow_start', label: '🎁 Claim My 20% Discount Voucher' },
          { type: 'whatsapp', label: '💬 Claim via WhatsApp', url: whatsappUrl }
        ]
      };
    }

    // L. Contact / Location / Office
    if (text.includes('contact') || text.includes('location') || text.includes('address') || text.includes('office') || text.includes('phone') || text.includes('email') || text.includes('meet')) {
      return {
        text: `📍 **Corelix Technology Contact Hub**\n\n🏢 **Office**: Tamil Nadu, India\n📞 **Phone / WhatsApp**: +91 ${phone}\n✉️ **Direct Email**: ${email}\n🕒 **Support**: Monday – Saturday (9:00 AM – 7:00 PM IST)\n\nWe also do online Google Meet & Zoom discovery calls with clients worldwide!`,
        actions: [
          { type: 'whatsapp', label: '📲 Connect on WhatsApp (+91 9360410038)', url: whatsappUrl },
          { type: 'lead_flow_start', label: '📅 Book a Discovery Call' }
        ]
      };
    }

    // M. Default Human-like Assistant Fallback
    return {
      text: `Got it! Corelix Technology specializes in **End-to-End Web Design**, **Mobile Apps (Flutter)**, **SEO Growth**, and **Corporate Branding**.\n\nTell me a bit more about your project idea or what you'd like to achieve, and I'll give you clear recommendations and pricing!`,
      actions: [
        { type: 'lead_flow_start', label: '⚡ Request a Quick Quote & Estimate' },
        { type: 'prompt', label: '💰 Check Pricing Packages', query: 'What are your pricing packages and rates?' },
        { type: 'prompt', label: '🛠️ Web & App Development', query: 'Tell me about your web and app development services' },
        { type: 'whatsapp', label: '💬 Talk to Senior Consultant on WhatsApp', url: whatsappUrl }
      ]
    };
  };

  // Process Interactive Step-by-Step Lead Capture (Human Conversational Style)
  const handleLeadStepProgression = (userInputText) => {
    const text = userInputText.trim();

    if (leadStep === 1) {
      // User provided Name
      const name = text;
      setLeadData(prev => ({ ...prev, name }));
      setLeadStep(2);

      return {
        text: `Wonderful to meet you, **${name}**! 😊\n\nWhich service category are you looking to build? *(Click below or type)*`,
        choices: [
          { label: '🌐 Web Design & Development', value: 'Web Design & Development' },
          { label: '📱 Mobile App (iOS & Android)', value: 'Mobile App Development (Flutter)' },
          { label: '🛍️ E-Commerce Storefront', value: 'E-Commerce Solution' },
          { label: '📈 SEO & Digital Marketing', value: 'SEO & Growth Marketing' },
          { label: '🎨 Branding & UI/UX Design', value: 'Branding & Graphic Design' }
        ]
      };
    }

    if (leadStep === 2) {
      // User provided Service
      const service = text;
      setLeadData(prev => ({ ...prev, service }));
      setLeadStep(3);

      return {
        text: `Awesome choice! **${service}** is one of our flagship strengths at Corelix.\n\nWhat is your **WhatsApp / Phone number** (or Email) so our team can send over the custom project proposal and discount?`,
        isLeadStep: true
      };
    }

    if (leadStep === 3) {
      // User provided Contact
      const contact = text;
      setLeadData(prev => ({ ...prev, contact }));
      setLeadStep(4);

      return {
        text: `Perfect! Last quick detail — what estimated budget range do you have in mind for this project?`,
        choices: [
          { label: '💵 Starter (₹15,000 - ₹35,000)', value: 'Starter (₹15,000 - ₹35,000)' },
          { label: '💼 Standard (₹35,000 - ₹1,00,000)', value: 'Standard (₹35,000 - ₹1,00,000)' },
          { label: '🚀 Enterprise (₹1,00,000+)', value: 'Enterprise (₹1,00,000+)' },
          { label: '💬 Need Advice on Budget', value: 'Flexible / Need Guidance' }
        ]
      };
    }

    if (leadStep === 4) {
      // User provided Budget -> Complete & Save
      const budget = text;
      const finalLead = {
        name: leadData.name,
        service: leadData.service || 'Custom Web/App Project',
        contact: leadData.contact,
        budget: budget
      };
      
      setLeadData(prev => ({ ...prev, budget }));
      setLeadStep(5);

      // Save inquiry into db & backend
      db.addInquiry({
        name: finalLead.name,
        email: finalLead.contact.includes('@') ? finalLead.contact : 'chat-lead@corelix.com',
        phone: finalLead.contact,
        projectType: finalLead.service,
        budget: 500,
        message: `[Human Chat Funnel Lead]\nCustomer Name: ${finalLead.name}\nService Requested: ${finalLead.service}\nContact: ${finalLead.contact}\nBudget Bracket: ${budget}`
      });

      const whatsappText = encodeURIComponent(`Hi Corelix Team! My name is ${finalLead.name}. I just discussed a project for ${finalLead.service} with budget range ${budget} on your website. I'd like to get the proposal!`);
      const directWhatsAppUrl = `https://wa.me/91${settings.phoneNumber || '9360410038'}?text=${whatsappText}`;

      return {
        text: `🎉 **You're all set, ${finalLead.name}!**\n\nI have logged your project scope for **${finalLead.service}** directly with our Senior Engineering desk. Our team will review your requirements and reach out on **${finalLead.contact}** within **30 minutes**!\n\nWant to skip the wait and connect right now on WhatsApp?`,
        actions: [
          { type: 'whatsapp', label: '📲 Open Direct WhatsApp Chat with Team', url: directWhatsAppUrl },
          { type: 'prompt', label: '⭐ Explore More Case Studies', query: 'Show me your portfolio and past works' },
          { type: 'prompt', label: '💡 What technologies do you use?', query: 'Tell me about your web and app development services' }
        ]
      };
    }

    return null;
  };

  const handleSendMessage = (textToSend = null) => {
    const query = textToSend || inputValue;
    if (!query || !query.trim()) return;

    const userMsg = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Natural human typing delay (calculated based on response complexity)
    const typingDelay = 700;

    setTimeout(() => {
      let botResponse;

      if (leadStep > 0 && leadStep < 5) {
        botResponse = handleLeadStepProgression(query);
      } else {
        botResponse = generateHumanResponse(query);
      }

      if (botResponse) {
        const botMsg = {
          id: 'msg_' + (Date.now() + 1),
          sender: 'bot',
          text: botResponse.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: botResponse.actions,
          choices: botResponse.choices
        };

        setMessages(prev => [...prev, botMsg]);
        playMessageChime(isMuted);
      }

      setIsTyping(false);
    }, typingDelay);
  };

  const handleActionClick = (action) => {
    if (action.type === 'prompt') {
      handleSendMessage(action.query);
    } else if (action.type === 'lead_flow_start') {
      setLeadStep(1);
      const startMsg = {
        id: 'msg_lead_start_' + Date.now(),
        sender: 'bot',
        text: `Let's make this happen! 🚀 I'd love to put together a personalized project blueprint and estimate for you.\n\nTo begin, **what is your full name?**`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, startMsg]);
      playMessageChime(isMuted);
    } else if (action.type === 'whatsapp') {
      const url = action.url || settings.whatsappUrl || 'https://wa.me/919360410038';
      window.open(url, '_blank');
    }
  };

  const handleChoiceSelect = (choiceValue) => {
    handleSendMessage(choiceValue);
  };

  // Convert bold markdown and line breaks
  const renderFormattedText = (rawText) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      const parts = [];
      let lastIdx = 0;
      const regex = /\*\*(.*?)\*\*/g;
      let match;
      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIdx) {
          parts.push(line.substring(lastIdx, match.index));
        }
        parts.push(<strong key={`bold-${idx}-${match.index}`}>{match[1]}</strong>);
        lastIdx = match.index + match[0].length;
      }
      if (lastIdx < line.length) {
        parts.push(line.substring(lastIdx));
      }

      return (
        <span key={`line-${idx}`} style={{ display: 'block', minHeight: line.trim() ? 'auto' : '8px' }}>
          {parts.length > 0 ? parts : line}
        </span>
      );
    });
  };

  return (
    <div className="ai-chat-container">
      {/* Floating Tooltip Hint */}
      {!isOpen && hasPromptedTooltip && (
        <div className="ai-chat-tooltip" onClick={toggleChat} style={{ cursor: 'pointer' }}>
          <Sparkles size={14} color="#38bdf8" />
          <span>Need an instant quote?</span>
          <strong style={{ color: '#38bdf8' }}>Ask AI</strong>
        </div>
      )}

      {/* Minimalist Trending Floating Action Button */}
      <button 
        className={`ai-chat-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle Corelix AI Assistant"
        title="Chat with Corelix AI"
      >
        <div className="ai-trigger-icon">
          {isOpen ? <X size={22} /> : <Bot size={24} />}
        </div>
        {!isOpen && <span className="ai-trigger-badge" />}
      </button>

      {/* Expandable Trending Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-header-brand">
              <div className="ai-avatar-icon">
                <Bot size={20} />
                <span className="ai-avatar-status-dot" />
              </div>
              <div className="ai-header-titles">
                <h4>
                  Corelix AI 
                  <span className="ai-trending-badge">PRO</span>
                </h4>
                <p>Senior Project & Tech Advisor • Online</p>
              </div>
            </div>
            <div className="ai-header-controls">
              <button 
                className="ai-ctrl-btn" 
                onClick={() => setIsMuted(prev => !prev)} 
                title={isMuted ? "Unmute Sound" : "Mute Sound"}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button className="ai-ctrl-btn" onClick={clearChat} title="Reset Chat">
                <RotateCcw size={16} />
              </button>
              <button className="ai-ctrl-btn" onClick={toggleChat} title="Close Chat">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="ai-chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-msg ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="ai-msg-avatar">
                    <Bot size={15} />
                  </div>
                )}
                <div className="ai-msg-content">
                  <div>{renderFormattedText(msg.text)}</div>

                  {/* Interactive Choice Grid (For step-by-step human lead qualification) */}
                  {msg.choices && msg.choices.length > 0 && (
                    <div className="ai-choice-grid">
                      {msg.choices.map((choice, cIdx) => (
                        <button
                          key={cIdx}
                          className="ai-choice-pill"
                          onClick={() => handleChoiceSelect(choice.value)}
                        >
                          <span>{choice.label}</span>
                          <ChevronRight size={13} color="#38bdf8" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="ai-msg-actions">
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          className={`ai-action-link-btn ${act.type === 'whatsapp' ? 'whatsapp-btn' : ''}`}
                          onClick={() => handleActionClick(act)}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {act.type === 'whatsapp' && <MessageCircle size={15} />}
                            {act.type === 'lead_flow_start' && <Zap size={15} color="#38bdf8" />}
                            {act.label}
                          </span>
                          <ChevronRight size={14} />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="ai-msg-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {/* Human Typing Indicator */}
            {isTyping && (
              <div className="ai-msg bot">
                <div className="ai-msg-avatar">
                  <Bot size={15} />
                </div>
                <div className="ai-typing-indicator">
                  <div className="ai-typing-dot" />
                  <div className="ai-typing-dot" />
                  <div className="ai-typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="ai-chips-container">
            <button className="ai-chip" onClick={() => handleActionClick({ type: 'lead_flow_start' })}>
              <Zap size={13} color="#06b6d4" /> 🚀 Get Custom Quote
            </button>
            <button className="ai-chip" onClick={() => handleSendMessage('What are your pricing packages and rates?')}>
              💰 Pricing & Plans
            </button>
            <button className="ai-chip" onClick={() => handleSendMessage('Tell me about your web and app development services')}>
              🛠️ Web & App Dev
            </button>
            <button className="ai-chip" onClick={() => handleSendMessage('How fast can you build and launch my project?')}>
              ⏱️ Timelines
            </button>
            <button className="ai-chip" onClick={() => handleSendMessage('Do you have any discount or active offers?')}>
              🎁 20% Discount
            </button>
            <button className="ai-chip" onClick={() => handleSendMessage('Show me your portfolio and past works')}>
              ⭐ Portfolio
            </button>
            <button className="ai-chip" onClick={() => handleActionClick({ type: 'whatsapp' })}>
              <MessageCircle size={13} color="#10b981" /> WhatsApp
            </button>
          </div>

          {/* Chat Input Bar */}
          <form 
            className="ai-chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              className="ai-chat-input"
              placeholder={leadStep > 0 && leadStep < 5 ? "Type your answer here..." : "Ask anything or request a quote..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="ai-chat-send-btn"
              disabled={!inputValue.trim() || isTyping}
              title="Send Message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
