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
    <section id="blog" className="section">
      <div className="ambient-glow-1"></div>
      <div className="container">
        <h2 className="section-title reveal reveal-slide-up">Corelix Technology Blog</h2>
        <p className="section-subtitle reveal reveal-slide-up" data-delay="0.1s">
          Insightful articles on software engineering, digital branding, and product design from our team.
        </p>

        <div className="grid-3 reveal-stagger">
          {blogs.map((blog) => (
            <article key={blog.id} className="blog-card glass-panel reveal-item reveal-slide-up">
              <div className="blog-img-box">
                {iconMap[blog.iconName] || <HelpCircle size={36} />}
                <span className="tag" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  {blog.category}
                </span>
              </div>

              <div className="blog-content">
                <span className="blog-meta">{blog.date} • {blog.readTime}</span>
                <h3>{blog.title}</h3>
                <p>{blog.desc}</p>
                <a 
                  href={`#blog-detail-${blog.id}`} 
                  className="blog-readmore"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`The full article "${blog.title}" is coming soon! Contact our team to receive our latest insights and newsletters.`);
                  }}
                >
                  Read Article <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
