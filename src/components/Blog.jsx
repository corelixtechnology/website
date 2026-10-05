import React, { useState, useEffect } from 'react';
import { ArrowRight, Code, Moon, Flame, Search, TrendingUp, Heart, HelpCircle } from 'lucide-react';
import { db } from '../utils/db';

const iconMap = {
  Code: <Code size={36} />,
  Flame: <Flame size={36} />,
  Moon: <Moon size={36} />,
  Search: <Search size={36} />,
  TrendingUp: <TrendingUp size={36} />,
  Heart: <Heart size={36} />
};

const blogPhotoMap = {
  1: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
  2: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=80',
  3: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
};

export default function Blog() {
  const [blogs, setBlogs] = useState(() => db.getBlogs().filter(b => b.isActive));

  useEffect(() => {
    const handleUpdate = () => {
      setBlogs(db.getBlogs().filter(b => b.isActive));
    };
    window.addEventListener('wm_blogs_updated', handleUpdate);
    return () => window.removeEventListener('wm_blogs_updated', handleUpdate);
  }, []);

  return (
    <section id="blog" className="section" style={{ position: 'relative' }}>
      <div className="ambient-glow-1"></div>
      <div className="container">
        <h2 className="section-title reveal reveal-slide-up">Corelix Technology Blog</h2>
        <p className="section-subtitle reveal reveal-slide-up" data-delay="0.1s">
          Insightful articles on software engineering, digital branding, and product design from our team.
        </p>

        <div className="grid-3 reveal-stagger">
          {blogs.map((blog) => {
            const blogImage = blog.image || blogPhotoMap[blog.id] || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80';
            return (
              <article key={blog.id} className="blog-card glass-panel luxury-blog-card reveal-item reveal-slide-up">
                <div className="blog-img-box luxury-blog-img-box">
                  <img 
                    src={blogImage} 
                    alt={blog.title} 
                    className="luxury-blog-img" 
                    loading="lazy" 
                    decoding="async" 
                  />
                  <div className="luxury-blog-overlay-glow"></div>
                  <span className="tag luxury-blog-tag">
                    {blog.category}
                  </span>
                </div>

                <div className="blog-content luxury-blog-content">
                  <div className="blog-meta-row">
                    <span className="blog-meta-date">{blog.date}</span>
                    <span className="blog-meta-dot">•</span>
                    <span className="blog-meta-time">{blog.readTime}</span>
                  </div>
                  <h3>{blog.title}</h3>
                  <p>{blog.desc}</p>
                  <a 
                    href={`#blog-detail-${blog.id}`} 
                    className="blog-readmore luxury-readmore-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`The full article "${blog.title}" is coming soon! Contact our team to receive our latest insights and newsletters.`);
                    }}
                  >
                    <span>Read Article</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
