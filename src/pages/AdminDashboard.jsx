import React, { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { db } from '../utils/db';
import SEO from '../components/SEO';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('wm_admin_authenticated') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('overview');
  const [inquiries, setInquiries] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [works, setWorks] = useState([]);
  const [settings, setSettings] = useState({});
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // CRUD Editing States
  const [editingItem, setEditingItem] = useState(null); // holds item being edited
  const [isAdding, setIsAdding] = useState(false); // toggle add form
  const [formData, setFormData] = useState({}); // forms content
  const [formBullets, setFormBullets] = useState(['']); // bullet lists builder
  const [formTags, setFormTags] = useState(''); // comma-separated tags

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const activeSettings = db.getSettings();
    const targetUser = activeSettings.adminUsername || 'corelix';
    const targetPass = activeSettings.adminPassword || 'corelix@2026';

    if (usernameInput === targetUser && passwordInput === targetPass) {
      sessionStorage.setItem('wm_admin_authenticated', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('wm_admin_authenticated');
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
    setShowPassword(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    setInquiries(db.getInquiries());
    setServices(db.getServices());
    setBlogs(db.getBlogs());
    setWorks(db.getWorks());
    setSettings(db.getSettings());
  };

  const renderIcon = (name, size = 18, color = 'currentColor', className = '') => {
    const IconComponent = Lucide[name] || Lucide.HelpCircle;
    return <IconComponent size={size} color={color} className={className} />;
  };

  // Inbox Handlers
  const handleMarkRead = (id) => {
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, isRead: true } : inq);
    db.saveInquiries(updated);
    setInquiries(updated);
  };

  const handleDeleteInquiry = (id) => {
    const key = `inquiry_${id}`;
    if (deleteConfirmId === key) {
      const updated = inquiries.filter(inq => inq.id !== id);
      db.saveInquiries(updated);
      setInquiries(updated);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(key);
      setTimeout(() => {
        setDeleteConfirmId(current => current === key ? null : current);
      }, 4000); // reset after 4 seconds
    }
  };

  // Settings Handlers
  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === 'checkbox' ? checked : value;
    const updated = { ...settings, [name]: newVal };
    setSettings(updated);
    db.saveSettings(updated);
  };

  // Services Handlers
  const handleToggleService = (id) => {
    const updated = services.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s);
    db.saveServices(updated);
    setServices(updated);
  };

  const handleEditService = (service) => {
    setEditingItem(service);
    setIsAdding(false);
    setFormData({
      id: service.id,
      title: service.title,
      desc: service.desc,
      themeClass: service.themeClass,
      iconName: service.iconName
    });
    setFormBullets(service.bullets || ['']);
    setFormTags(service.pills ? service.pills.join(', ') : '');
  };

  const handleStartAddService = () => {
    setIsAdding(true);
    setEditingItem(null);
    setFormData({
      id: 'service_' + Date.now(),
      title: '',
      desc: '',
      themeClass: 'theme-violet',
      iconName: 'Code'
    });
    setFormBullets(['']);
    setFormTags('');
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    const servicePayload = {
      ...formData,
      bullets: formBullets.filter(b => b.trim() !== ''),
      pills: formTags.split(',').map(p => p.trim()).filter(p => p !== ''),
      isActive: editingItem ? editingItem.isActive : true
    };

    let updated;
    if (editingItem) {
      updated = services.map(s => s.id === editingItem.id ? servicePayload : s);
    } else {
      updated = [...services, servicePayload];
    }
    db.saveServices(updated);
    setServices(updated);
    resetForms();
  };

  const handleDeleteService = (id) => {
    const key = `service_${id}`;
    if (deleteConfirmId === key) {
      const updated = services.filter(s => s.id !== id);
      db.saveServices(updated);
      setServices(updated);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(key);
      setTimeout(() => {
        setDeleteConfirmId(current => current === key ? null : current);
      }, 4000);
    }
  };

  // Blogs Handlers
  const handleEditBlog = (blog) => {
    setEditingItem(blog);
    setIsAdding(false);
    setFormData({
      id: blog.id,
      title: blog.title,
      category: blog.category,
      desc: blog.desc,
      iconName: blog.iconName,
      readTime: blog.readTime,
      date: blog.date
    });
  };

  const handleStartAddBlog = () => {
    setIsAdding(true);
    setEditingItem(null);
    setFormData({
      id: Date.now(),
      title: '',
      category: 'Engineering',
      desc: '',
      iconName: 'Code',
      readTime: '5 min read',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });
  };

  const handleSaveBlog = (e) => {
    e.preventDefault();
    const blogPayload = {
      ...formData,
      isActive: editingItem ? editingItem.isActive : true
    };

    let updated;
    if (editingItem) {
      updated = blogs.map(b => b.id === editingItem.id ? blogPayload : b);
    } else {
      updated = [...blogs, blogPayload];
    }
    db.saveBlogs(updated);
    setBlogs(updated);
    resetForms();
  };

  const handleDeleteBlog = (id) => {
    const key = `blog_${id}`;
    if (deleteConfirmId === key) {
      const updated = blogs.filter(b => b.id !== id);
      db.saveBlogs(updated);
      setBlogs(updated);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(key);
      setTimeout(() => {
        setDeleteConfirmId(current => current === key ? null : current);
      }, 4000);
    }
  };

  // Portfolio Works Handlers
  const handleWorkImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditWork = (work) => {
    setEditingItem(work);
    setIsAdding(false);
    setFormData({
      id: work.id,
      title: work.title,
      client: work.client,
      desc: work.desc,
      category: work.category,
      svgType: work.svgType,
      rating: work.rating,
      image: work.image || ''
    });
    setFormTags(work.tags ? work.tags.join(', ') : '');
  };

  const handleStartAddWork = () => {
    setIsAdding(true);
    setEditingItem(null);
    setFormData({
      id: Date.now(),
      title: '',
      client: '',
      desc: '',
      category: 'web-works',
      svgType: 'web-dashboard',
      rating: '⭐⭐⭐⭐⭐',
      image: ''
    });
    setFormTags('');
  };

  const handleSaveWork = (e) => {
    e.preventDefault();
    const workPayload = {
      ...formData,
      tags: formTags.split(',').map(t => t.trim()).filter(t => t !== ''),
      isActive: editingItem ? editingItem.isActive : true
    };

    let updated;
    if (editingItem) {
      updated = works.map(w => w.id === editingItem.id ? workPayload : w);
    } else {
      updated = [...works, workPayload];
    }
    db.saveWorks(updated);
    setWorks(updated);
    resetForms();
  };

  const handleDeleteWork = (id) => {
    const key = `work_${id}`;
    if (deleteConfirmId === key) {
      const updated = works.filter(w => w.id !== id);
      db.saveWorks(updated);
      setWorks(updated);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(key);
      setTimeout(() => {
        setDeleteConfirmId(current => current === key ? null : current);
      }, 4000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newVal
    }));
  };

  // Helper Reset Forms
  const resetForms = () => {
    setEditingItem(null);
    setIsAdding(false);
    setFormData({});
    setFormBullets(['']);
    setFormTags('');
  };

  // Form List Builders
  const handleBulletChange = (idx, value) => {
    const updated = [...formBullets];
    updated[idx] = value;
    setFormBullets(updated);
  };

  const handleAddBulletRow = () => {
    setFormBullets([...formBullets, '']);
  };

  const handleRemoveBulletRow = (idx) => {
    setFormBullets(formBullets.filter((_, i) => i !== idx));
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <SEO title="Admin Login" robots="noindex, nofollow" />
        <div className="ambient-glow-1" style={{ top: '15%', left: '20%', opacity: 0.2 }}></div>
        <div className="ambient-glow-2" style={{ bottom: '15%', right: '20%', opacity: 0.2 }}></div>
        
        <div className="admin-login-card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="admin-login-logo-box">
              {renderIcon('Cpu', 28, 'var(--secondary)')}
            </div>
            <h3 className="admin-login-title">Corelix CMS</h3>
            <span className="admin-login-subtitle">Authorized Control Portal</span>
          </div>

          {loginError && (
            <div className="admin-login-error-box">
              {renderIcon('AlertCircle', 16, '#fb7185')}
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit}>
            <div className="admin-login-input-group">
              <label className="admin-login-label">Username</label>
              <div className="admin-login-input-wrapper">
                {renderIcon('User', 16, 'var(--text-muted)', 'admin-login-input-icon')}
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                  className="admin-login-input"
                  placeholder="Enter admin username"
                />
              </div>
            </div>

            <div className="admin-login-input-group">
              <label className="admin-login-label">Password</label>
              <div className="admin-login-input-wrapper">
                {renderIcon('Lock', 16, 'var(--text-muted)', 'admin-login-input-icon')}
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  className="admin-login-input"
                  placeholder="Enter security key"
                  style={{ paddingRight: '2.8rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0
                  }}
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {renderIcon(showPassword ? 'EyeOff' : 'Eye', 16)}
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--secondary)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0
                  }}
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button type="submit" className="admin-login-btn">
              {renderIcon('LogIn', 16)} <span>Authenticate</span>
            </button>
          </form>
        </div>

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(2, 3, 6, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem 2rem', borderRadius: '16px', textAlign: 'center', position: 'relative' }}>
              <div style={{ display: 'inline-flex', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                {renderIcon('HelpCircle', 24, 'var(--secondary)')}
              </div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: 0, color: 'white' }}>Forgot Credentials?</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5', marginBottom: '1.75rem' }}>
                For security reasons, admin credentials are encrypted locally. You can view or reset them by checking the <code>adminUsername</code> and <code>adminPassword</code> keys in your <code>DEFAULT_SETTINGS</code> structure within the local file <code>src/utils/db.js</code>, or check your local cache.
              </p>
              <button
                onClick={() => setShowForgotModal(false)}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Acknowledge
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container" style={{ paddingTop: '7.2rem', minHeight: '100vh' }}>
      <SEO title="Admin Dashboard" robots="noindex, nofollow" />
      {/* Sidebar Panel */}
      <aside className="admin-sidebar glass-panel">
        <div className="admin-profile">
          <div className="admin-avatar">
            {renderIcon('Cpu', 28, 'var(--secondary)')}
          </div>
          <div>
            <h4>Corelix CMS</h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: '600' }}>Admin Console</span>
          </div>
        </div>

        <nav className="admin-nav">
          <button
            onClick={() => { setActiveTab('overview'); resetForms(); }}
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
          >
            {renderIcon('Layout', 16)} <span>Overview</span>
          </button>
          <button
            onClick={() => { setActiveTab('inquiries'); resetForms(); }}
            className={`admin-nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}
          >
            {renderIcon('Inbox', 16)} <span>Inquiries</span>
            {inquiries.filter(i => !i.isRead).length > 0 && (
              <span className="admin-inbox-badge">{inquiries.filter(i => !i.isRead).length}</span>
            )}
          </button>
          <button
            onClick={() => { setActiveTab('services'); resetForms(); }}
            className={`admin-nav-item ${activeTab === 'services' ? 'active' : ''}`}
          >
            {renderIcon('Cpu', 16)} <span>Services CMS</span>
          </button>
          <button
            onClick={() => { setActiveTab('blogs'); resetForms(); }}
            className={`admin-nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
          >
            {renderIcon('BookOpen', 16)} <span>Blog CMS</span>
          </button>
          <button
            onClick={() => { setActiveTab('works'); resetForms(); }}
            className={`admin-nav-item ${activeTab === 'works' ? 'active' : ''}`}
          >
            {renderIcon('Briefcase', 16)} <span>Works CMS</span>
          </button>
          <button
            onClick={() => { setActiveTab('settings'); resetForms(); }}
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          >
            {renderIcon('Settings', 16)} <span>Global Settings</span>
          </button>

          {/* Sign Out Button placed at the bottom of the sidebar list */}
          <div className="admin-nav-logout-wrapper">
            <button
              onClick={handleLogout}
              className="admin-nav-item admin-logout-btn"
            >
              {renderIcon('LogOut', 16, 'var(--accent)')} <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Pane */}
      <main className="admin-content-pane">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="tab-pane-content">
            <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 1rem 0' }}>Dashboard Overview</h2>
            <p className="admin-subheading">A snapshot of client inquiries, active campaigns, and portfolio highlights.</p>

            <div className="admin-stats-grid">
              <div className="stat-card glass-panel">
                <div className="stat-card-header">
                  <span>Client Inquiries</span>
                  {renderIcon('Inbox', 20, 'var(--primary)')}
                </div>
                <h3>{inquiries.length}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {inquiries.filter(i => !i.isRead).length} unread messages in inbox
                </p>
              </div>

              <div className="stat-card glass-panel">
                <div className="stat-card-header">
                  <span>Active Services</span>
                  {renderIcon('Cpu', 20, 'var(--secondary)')}
                </div>
                <h3>{services.filter(s => s.isActive).length}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {services.filter(s => !s.isActive).length} services hidden from view
                </p>
              </div>

              <div className="stat-card glass-panel">
                <div className="stat-card-header">
                  <span>Articles Published</span>
                  {renderIcon('BookOpen', 20, 'var(--accent)')}
                </div>
                <h3>{blogs.length}</h3>
                 <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Live inside Corelix insights feed
                </p>
              </div>

              <div className="stat-card glass-panel">
                <div className="stat-card-header">
                  <span>Client Projects</span>
                  {renderIcon('Briefcase', 20, '#10b981')}
                </div>
                <h3>{works.length}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Featured in the portfolio showcase
                </p>
              </div>
            </div>

            {/* Performance Visual Block */}
            <div className="admin-visual-block glass-panel" style={{ marginTop: '2rem', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <h4 style={{ margin: 0 }}>Traffic & Lead Generation</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated project conversions per week</span>
                </div>
                <div className="legend" style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '2px' }}></span> Estimate submissions
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ width: '10px', height: '10px', background: 'var(--secondary)', borderRadius: '2px' }}></span> Direct calls
                  </span>
                </div>
              </div>

              <div className="simulated-chart" style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', width: '100%', height: '100px', alignItems: 'flex-end', gap: '4px' }}>
                    <div style={{ height: '30%', background: 'var(--primary)', flex: 1, borderRadius: '3px' }}></div>
                    <div style={{ height: '20%', background: 'var(--secondary)', flex: 1, borderRadius: '3px' }}></div>
                  </div>
                  <span style={{ fontSize: '0.7rem', marginTop: '5px', color: 'var(--text-muted)' }}>Week 1</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', width: '100%', height: '100px', alignItems: 'flex-end', gap: '4px' }}>
                    <div style={{ height: '45%', background: 'var(--primary)', flex: 1, borderRadius: '3px' }}></div>
                    <div style={{ height: '35%', background: 'var(--secondary)', flex: 1, borderRadius: '3px' }}></div>
                  </div>
                  <span style={{ fontSize: '0.7rem', marginTop: '5px', color: 'var(--text-muted)' }}>Week 2</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', width: '100%', height: '100px', alignItems: 'flex-end', gap: '4px' }}>
                    <div style={{ height: '70%', background: 'var(--primary)', flex: 1, borderRadius: '3px' }}></div>
                    <div style={{ height: '55%', background: 'var(--secondary)', flex: 1, borderRadius: '3px' }}></div>
                  </div>
                  <span style={{ fontSize: '0.7rem', marginTop: '5px', color: 'var(--text-muted)' }}>Week 3</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', width: '100%', height: '100px', alignItems: 'flex-end', gap: '4px' }}>
                    <div style={{ height: '90%', background: 'var(--primary)', flex: 1, borderRadius: '3px' }}></div>
                    <div style={{ height: '75%', background: 'var(--secondary)', flex: 1, borderRadius: '3px' }}></div>
                  </div>
                  <span style={{ fontSize: '0.7rem', marginTop: '5px', color: 'var(--text-muted)' }}>Current Week</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="tab-pane-content">
            <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 1rem 0' }}>Client Inquiries Inbox</h2>
            <p className="admin-subheading">Review project budgets and contact inquiries submitted by clients.</p>

            <div className="admin-inbox-list">
              {inquiries.length === 0 ? (
                <div className="empty-state glass-panel text-center" style={{ padding: '3rem' }}>
                  {renderIcon('Mail', 36, 'var(--text-muted)', 'margin-auto')}
                  <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>No inquiries found in database.</p>
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div key={inq.id} className={`inquiry-card glass-panel ${!inq.isRead ? 'unread' : ''}`}>
                    <div className="inquiry-header">
                      <div className="inquiry-sender">
                        <h4>{inq.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                          {inq.email} {inq.phone ? `• Phone: ${inq.phone}` : ''}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Submitted: {new Date(inq.date).toLocaleString()}
                        </span>
                      </div>
                      <div className="inquiry-meta-tags">
                        {inq.projectType && (
                          <span className="inquiry-tag service-tag">
                            {services.find(s => s.id === inq.projectType)?.title || inq.projectType}
                          </span>
                        )}
                        {inq.budget > 0 && (
                          <span className="inquiry-tag budget-tag">
                            Budget: ${inq.budget.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="inquiry-message">{inq.message}</p>

                    <div className="inquiry-actions">
                      {!inq.isRead && (
                        <button onClick={() => handleMarkRead(inq.id)} className="btn btn-outline-cyan btn-sm">
                          {renderIcon('CheckSquare', 12)} Mark as Read
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteInquiry(inq.id)} 
                        className={`btn btn-sm ${deleteConfirmId === `inquiry_${inq.id}` ? 'btn-danger' : 'btn-delete'}`} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.2rem',
                          backgroundColor: deleteConfirmId === `inquiry_${inq.id}` ? 'var(--accent)' : '',
                          borderColor: deleteConfirmId === `inquiry_${inq.id}` ? 'var(--accent)' : '',
                          color: deleteConfirmId === `inquiry_${inq.id}` ? '#ffffff' : ''
                        }}
                      >
                        {renderIcon(deleteConfirmId === `inquiry_${inq.id}` ? 'AlertTriangle' : 'Trash2', 12)} 
                        {deleteConfirmId === `inquiry_${inq.id}` ? 'Confirm?' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES CMS */}
        {activeTab === 'services' && (
          <div className="tab-pane-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>Services Manager</h2>
                <p className="admin-subheading">Configure the capabilities page and scope estimator fields.</p>
              </div>
              {!isAdding && !editingItem && (
                <button onClick={handleStartAddService} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {renderIcon('Plus', 16)} Add New Service
                </button>
              )}
            </div>

            {/* Forms Panel */}
            {(isAdding || editingItem) && (
              <div className="cms-editor-panel glass-panel">
                <h3>{editingItem ? 'Edit Service' : 'Create New Service'}</h3>
                
                <form onSubmit={handleSaveService}>
                  <div className="form-grid">
                    <div className="input-group">
                      <label>Service Unique ID (Slug)</label>
                      <input
                        type="text"
                        name="id"
                        value={formData.id}
                        disabled={!!editingItem}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="e.g. mobile-apps"
                      />
                    </div>
                    <div className="input-group">
                      <label>Service Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="e.g. Mobile App Development"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Description</label>
                    <textarea
                      name="desc"
                      value={formData.desc}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="Write a catchy 1-2 sentence description explaining the value..."
                      rows="2"
                    ></textarea>
                  </div>

                  <div className="form-grid">
                    <div className="input-group">
                      <label>Lucide Icon Component Name</label>
                      <select
                        name="iconName"
                        value={formData.iconName}
                        onChange={handleInputChange}
                        className="input-field"
                        style={{ color: 'white', background: 'var(--bg-darker)' }}
                      >
                        <option value="Code">Code (Web Dev)</option>
                        <option value="Palette">Palette (Branding/Design)</option>
                        <option value="ShoppingCart">ShoppingCart (E-commerce)</option>
                        <option value="Image">Image (Graphics/Posters)</option>
                        <option value="Search">Search (SEO)</option>
                        <option value="TrendingUp">TrendingUp (Ads)</option>
                        <option value="Megaphone">Megaphone (Marketing)</option>
                        <option value="Smartphone">Smartphone (Mobile)</option>
                        <option value="Database">Database (Backends)</option>
                        <option value="Globe">Globe (Global)</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label>Theme Class Name</label>
                      <select
                        name="themeClass"
                        value={formData.themeClass}
                        onChange={handleInputChange}
                        className="input-field"
                        style={{ color: 'white', background: 'var(--bg-darker)' }}
                      >
                        <option value="theme-violet">Violet</option>
                        <option value="theme-rose">Rose</option>
                        <option value="theme-cyan">Cyan</option>
                        <option value="theme-emerald">Emerald</option>
                        <option value="theme-amber">Amber</option>
                        <option value="theme-blue">Blue</option>
                        <option value="theme-purple">Purple</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Marketing Pills / Skills (Comma-separated)</label>
                    <input
                      type="text"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      placeholder="React Native, iOS, Android, Flutter"
                      className="input-field"
                    />
                  </div>

                  <div className="input-group">
                    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Core Deliverables (Bullets)</span>
                      <button type="button" onClick={handleAddBulletRow} className="btn btn-outline-cyan btn-sm" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                        + Add Bullet
                      </button>
                    </label>

                    {formBullets.map((bullet, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => handleBulletChange(idx, e.target.value)}
                          placeholder="e.g. Cross-platform builds"
                          className="input-field"
                          required
                        />
                        {formBullets.length > 1 && (
                          <button type="button" onClick={() => handleRemoveBulletRow(idx)} className="btn btn-delete btn-sm" style={{ padding: '0 0.6rem' }}>
                            ✖
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button type="submit" className="btn btn-primary">
                      {renderIcon('Save', 14)} Save Service
                    </button>
                    <button type="button" onClick={resetForms} className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List Table */}
            <div className="cms-table-wrapper glass-panel">
              <table className="cms-table">
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Slug</th>
                    <th>Service Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(s => (
                    <tr key={s.id}>
                      <td>
                        <span className={`service-avatar-small ${s.themeClass}`} style={{ display: 'inline-flex', padding: '6px', borderRadius: '6px' }}>
                          {renderIcon(s.iconName || 'Code', 16)}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'monospace', color: 'var(--secondary)' }}>{s.id}</td>
                      <td style={{ fontWeight: '600' }}>{s.title}</td>
                      <td>
                        <button
                          onClick={() => handleToggleService(s.id)}
                          className={`badge-status ${s.isActive ? 'active' : 'inactive'}`}
                        >
                          {s.isActive ? 'Active' : 'Hidden'}
                        </button>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleEditService(s)} className="btn btn-secondary btn-sm" title="Edit Service">
                            {renderIcon('Edit2', 12)} Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteService(s.id)} 
                            className={`btn btn-sm ${deleteConfirmId === `service_${s.id}` ? 'btn-danger' : 'btn-delete'}`} 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '0.2rem',
                              backgroundColor: deleteConfirmId === `service_${s.id}` ? 'var(--accent)' : '',
                              borderColor: deleteConfirmId === `service_${s.id}` ? 'var(--accent)' : '',
                              color: deleteConfirmId === `service_${s.id}` ? '#ffffff' : ''
                            }}
                            title="Delete Service"
                          >
                            {renderIcon(deleteConfirmId === `service_${s.id}` ? 'AlertTriangle' : 'Trash2', 12)}
                            {deleteConfirmId === `service_${s.id}` ? 'Confirm?' : ''}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: BLOG CMS */}
        {activeTab === 'blogs' && (
          <div className="tab-pane-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>Blog Manager</h2>
                <p className="admin-subheading">Manage team insights, design patterns, and announcements.</p>
              </div>
              {!isAdding && !editingItem && (
                <button onClick={handleStartAddBlog} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {renderIcon('Plus', 16)} Create New Article
                </button>
              )}
            </div>

            {/* Forms Panel */}
            {(isAdding || editingItem) && (
              <div className="cms-editor-panel glass-panel">
                <h3>{editingItem ? 'Edit Article' : 'Compose New Article'}</h3>
                
                <form onSubmit={handleSaveBlog}>
                  <div className="input-group">
                    <label>Article Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="e.g. Scalable Server Designs"
                    />
                  </div>

                  <div className="form-grid">
                    <div className="input-group">
                      <label>Category</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="e.g. Engineering, Design, Business"
                      />
                    </div>
                    <div className="input-group">
                      <label>Read Time Estimate</label>
                      <input
                        type="text"
                        name="readTime"
                        value={formData.readTime}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="e.g. 5 min read"
                      />
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="input-group">
                      <label>Date Label</label>
                      <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                      />
                    </div>
                    <div className="input-group">
                      <label>Lucide Icon Component Name</label>
                      <select
                        name="iconName"
                        value={formData.iconName}
                        onChange={handleInputChange}
                        className="input-field"
                        style={{ color: 'white', background: 'var(--bg-darker)' }}
                      >
                        <option value="Code">Code (Engineering)</option>
                        <option value="Flame">Flame (Hot Topic)</option>
                        <option value="Moon">Moon (Branding/Aesthetics)</option>
                        <option value="Search">Search (SEO)</option>
                        <option value="TrendingUp">TrendingUp (Marketing)</option>
                        <option value="Heart">Heart (Community)</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Article Excerpt</label>
                    <textarea
                      name="desc"
                      value={formData.desc}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="Write a brief overview of the article..."
                      rows="3"
                    ></textarea>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button type="submit" className="btn btn-primary">
                      {renderIcon('Save', 14)} Publish Article
                    </button>
                    <button type="button" onClick={resetForms} className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List Table */}
            <div className="cms-table-wrapper glass-panel">
              <table className="cms-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Read Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map(b => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: '600' }}>{b.title}</td>
                      <td>
                        <span className="tag" style={{ border: 'none', background: 'rgba(139, 92, 246, 0.15)', color: 'var(--secondary)' }}>
                          {b.category}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{b.date}</td>
                      <td style={{ fontSize: '0.85rem' }}>{b.readTime}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleEditBlog(b)} className="btn btn-secondary btn-sm">
                            {renderIcon('Edit2', 12)} Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteBlog(b.id)} 
                            className={`btn btn-sm ${deleteConfirmId === `blog_${b.id}` ? 'btn-danger' : 'btn-delete'}`}
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '0.2rem',
                              backgroundColor: deleteConfirmId === `blog_${b.id}` ? 'var(--accent)' : '',
                              borderColor: deleteConfirmId === `blog_${b.id}` ? 'var(--accent)' : '',
                              color: deleteConfirmId === `blog_${b.id}` ? '#ffffff' : ''
                            }}
                            title="Delete Blog"
                          >
                            {renderIcon(deleteConfirmId === `blog_${b.id}` ? 'AlertTriangle' : 'Trash2', 12)}
                            {deleteConfirmId === `blog_${b.id}` ? 'Confirm?' : ''}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: WORKS CMS */}
        {activeTab === 'works' && (
          <div className="tab-pane-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>Portfolio Works Manager</h2>
                <p className="admin-subheading">Add or edit showcase cases in the client portfolio page.</p>
              </div>
              {!isAdding && !editingItem && (
                <button onClick={handleStartAddWork} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {renderIcon('Plus', 16)} Add Portfolio Project
                </button>
              )}
            </div>

            {/* Forms Panel */}
            {(isAdding || editingItem) && (
              <div className="cms-editor-panel glass-panel">
                <h3>{editingItem ? 'Edit Project' : 'Add New Portfolio Project'}</h3>
                
                <form onSubmit={handleSaveWork}>
                  <div className="form-grid">
                    <div className="input-group">
                      <label>Project Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="e.g. Zenith Corporate Hub"
                      />
                    </div>
                    <div className="input-group">
                      <label>Client Name</label>
                      <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="e.g. Zenith Agri Group"
                      />
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="input-group">
                      <label>Category Filter</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="input-field"
                        style={{ color: 'white', background: 'var(--bg-darker)' }}
                      >
                        <option value="brochures">Brochures & Packages</option>
                        <option value="web-works">Web Design & Dev</option>
                        <option value="branding-ads">Branding & Ads</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label>Mockup Render Type</label>
                      <select
                        name="svgType"
                        value={formData.svgType}
                        onChange={handleInputChange}
                        className="input-field"
                        style={{ color: 'white', background: 'var(--bg-darker)' }}
                      >
                        <option value="web-dashboard">Web Dashboard</option>
                        <option value="web-portal">Web Portal</option>
                        <option value="brochure">Print Brochure (3-Fold)</option>
                        <option value="package">Skincare/Box Package</option>
                        <option value="branding">Vector Badge Logo</option>
                        <option value="ad">Marketing/Ad Banner</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="input-group">
                      <label>Project Tags (Comma-separated)</label>
                      <input
                        type="text"
                        value={formTags}
                        onChange={(e) => setFormTags(e.target.value)}
                        placeholder="React, Print, 3D Mockup"
                        className="input-field"
                      />
                    </div>
                    <div className="input-group">
                      <label>Client Rating / Testimonial Excerpt</label>
                      <input
                        type="text"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder='⭐⭐⭐⭐⭐ ("Excellent speed!")'
                      />
                    </div>
                  </div>

                  <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                    <label>Project Cover Image (Upload Photo)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleWorkImageUpload}
                      className="input-field"
                      style={{ padding: '0.5rem', background: 'var(--bg-darker)', color: 'var(--text-muted)' }}
                    />
                    {formData.image && (
                      <div style={{ marginTop: '1rem', position: 'relative', display: 'inline-block' }}>
                        <img
                          src={formData.image}
                          alt="Project Preview"
                          style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-glass)' }}
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                          style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            background: 'var(--accent)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px'
                          }}
                          title="Remove Image"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="input-group">
                    <label>Description</label>
                    <textarea
                      name="desc"
                      value={formData.desc}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="Write a description summarizing the scope and details..."
                      rows="3"
                    ></textarea>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button type="submit" className="btn btn-primary">
                      {renderIcon('Save', 14)} Save Project
                    </button>
                    <button type="button" onClick={resetForms} className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List Table */}
            <div className="cms-table-wrapper glass-panel">
              <table className="cms-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Client</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {works.map(w => (
                    <tr key={w.id}>
                      <td style={{ fontWeight: '600' }}>{w.title}</td>
                      <td>{w.client}</td>
                      <td style={{ fontSize: '0.85rem' }}>
                        {w.category === 'web-works' ? 'Web' : w.category === 'brochures' ? 'Print' : 'Branding'}
                      </td>
                      <td style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--secondary)' }}>{w.svgType}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleEditWork(w)} className="btn btn-secondary btn-sm">
                            {renderIcon('Edit2', 12)} Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteWork(w.id)} 
                            className={`btn btn-sm ${deleteConfirmId === `work_${w.id}` ? 'btn-danger' : 'btn-delete'}`}
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '0.2rem',
                              backgroundColor: deleteConfirmId === `work_${w.id}` ? 'var(--accent)' : '',
                              borderColor: deleteConfirmId === `work_${w.id}` ? 'var(--accent)' : '',
                              color: deleteConfirmId === `work_${w.id}` ? '#ffffff' : ''
                            }}
                            title="Delete Work"
                          >
                            {renderIcon(deleteConfirmId === `work_${w.id}` ? 'AlertTriangle' : 'Trash2', 12)}
                            {deleteConfirmId === `work_${w.id}` ? 'Confirm?' : ''}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: GLOBAL SETTINGS */}
        {activeTab === 'settings' && (
          <div className="tab-pane-content">
            <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 1rem 0' }}>Global Website Settings</h2>
            <p className="admin-subheading">Update content and variables displayed globally on the main layout pages.</p>

            <div className="cms-editor-panel glass-panel" style={{ marginTop: '1.5rem' }}>
              <div className="form-grid">
                <div className="input-group">
                  <label>Hero Headline</label>
                  <input
                    type="text"
                    name="heroTitle"
                    value={settings.heroTitle || ''}
                    onChange={handleSettingsChange}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label>Promo Banner Discount Percentage</label>
                  <input
                    type="number"
                    name="seasonalDiscount"
                    value={settings.seasonalDiscount || 0}
                    onChange={handleSettingsChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Hero Subtitle / Description</label>
                <textarea
                  name="heroSubtitle"
                  value={settings.heroSubtitle || ''}
                  onChange={handleSettingsChange}
                  className="input-field"
                  rows="3"
                ></textarea>
              </div>

              <div className="input-group">
                <label>Active Alert Banner Announcement Text</label>
                <input
                  type="text"
                  name="activePromoText"
                  value={settings.activePromoText || ''}
                  onChange={handleSettingsChange}
                  className="input-field"
                />
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label>WhatsApp Contact Link</label>
                  <input
                    type="text"
                    name="whatsappUrl"
                    value={settings.whatsappUrl || ''}
                    onChange={handleSettingsChange}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label>Call-Now Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={settings.phoneNumber || ''}
                    onChange={handleSettingsChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Contact Email Address</label>
                <input
                  type="text"
                  name="email"
                  value={settings.email || ''}
                  onChange={handleSettingsChange}
                  className="input-field"
                />
              </div>

              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Google Site Verification Code</label>
                <input
                  type="text"
                  name="googleSiteVerification"
                  value={settings.googleSiteVerification || ''}
                  onChange={handleSettingsChange}
                  className="input-field"
                  placeholder="e.g. google1234567890abcdef"
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                  Used to verify domain ownership in Google Search Console.
                </span>
              </div>

              <div style={{ marginTop: '2rem', marginBottom: '1.5rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--secondary)' }}>Admin Portal Access Settings</h4>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Portal Admin Username</label>
                    <input
                      type="text"
                      name="adminUsername"
                      value={settings.adminUsername || 'corelix'}
                      onChange={handleSettingsChange}
                      className="input-field"
                      placeholder="corelix"
                    />
                  </div>
                  <div className="input-group">
                    <label>Portal Admin Password</label>
                    <input
                      type="text"
                      name="adminPassword"
                      value={settings.adminPassword || 'corelix@2026'}
                      onChange={handleSettingsChange}
                      className="input-field"
                      placeholder="corelix@2026"
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="promo-enabled-check"
                  name="promoEnabled"
                  checked={!!settings.promoEnabled}
                  onChange={handleSettingsChange}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
                <label htmlFor="promo-enabled-check" style={{ cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  Enable Sticky Launch Alert/Promo Banner at Top of Page
                </label>
              </div>

              <div className="alert-box-info" style={{ marginTop: '2rem', padding: '1rem', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '8px', background: 'rgba(6,182,212,0.05)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <strong>Tip:</strong> Changes to settings are saved automatically. To verify, click the Corelix logo in the sidebar or navbar to return to the homepage.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
