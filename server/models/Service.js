import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  bullets: [{ type: String }],
  pills: [{ type: String }],
  themeClass: { type: String, default: 'theme-violet' },
  iconName: { type: String, default: 'Code' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
