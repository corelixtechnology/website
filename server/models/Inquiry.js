import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  projectType: { type: String, default: '' },
  budget: { type: Number, default: 0 },
  message: { type: String, required: true },
  date: { type: String },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Inquiry', inquirySchema);
