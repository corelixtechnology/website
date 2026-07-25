import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  excerpt: { type: String },
  content: { type: String },
  author: { type: String, default: 'Corelix Team' },
  date: { type: String },
  category: { type: String, default: 'Web Dev' },
  readTime: { type: String, default: '5 min read' },
  coverImage: { type: String },
  tags: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
