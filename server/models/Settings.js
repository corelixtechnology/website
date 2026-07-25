import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  companyName: { type: String, default: 'Corelix Technology' },
  contactEmail: { type: String, default: 'contact@corelixtechnology.com' },
  contactPhone: { type: String, default: '+91 (800) 555-0199' },
  officeAddress: { type: String, default: 'Corelix Tech Park, Cyber City, Bangalore, KA, India' },
  adminUsername: { type: String, default: 'corelix' },
  adminPassword: { type: String, default: 'corelix@2026' },
  primaryColor: { type: String, default: '#6366f1' }
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
