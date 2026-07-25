import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  client: { type: String },
  category: { type: String, required: true },
  desc: { type: String },
  image: { type: String },
  results: { type: String },
  link: { type: String },
  pills: [{ type: String }],
  mockupType: { type: String, default: 'website' },
  features: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Work', workSchema);
