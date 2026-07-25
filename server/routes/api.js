import express from 'express';
import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import Work from '../models/Work.js';
import Inquiry from '../models/Inquiry.js';
import Settings from '../models/Settings.js';

const router = express.Router();

// Helper for error responses
const handleError = (res, err) => {
  console.error('API Error:', err);
  res.status(500).json({ error: err.message || 'Server error' });
};

// ==================== AUTH ROUTE ====================
router.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    if (username === settings.adminUsername && password === settings.adminPassword) {
      return res.json({ success: true, message: 'Authentication successful' });
    }
    return res.status(401).json({ success: false, error: 'Invalid username or password' });
  } catch (err) {
    handleError(res, err);
  }
});

// ==================== SERVICES ROUTES ====================
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json(services);
  } catch (err) {
    handleError(res, err);
  }
});

router.post('/services', async (req, res) => {
  try {
    const servicesData = req.body;
    if (Array.isArray(servicesData)) {
      await Service.deleteMany({});
      const created = await Service.insertMany(servicesData);
      return res.json(created);
    } else {
      const created = await Service.create(servicesData);
      return res.status(201).json(created);
    }
  } catch (err) {
    handleError(res, err);
  }
});

router.put('/services/:id', async (req, res) => {
  try {
    const updated = await Service.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    handleError(res, err);
  }
});

router.delete('/services/:id', async (req, res) => {
  try {
    await Service.deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
});

// ==================== BLOGS ROUTES ====================
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    handleError(res, err);
  }
});

router.post('/blogs', async (req, res) => {
  try {
    const blogsData = req.body;
    if (Array.isArray(blogsData)) {
      await Blog.deleteMany({});
      const created = await Blog.insertMany(blogsData);
      return res.json(created);
    } else {
      const created = await Blog.create(blogsData);
      return res.status(201).json(created);
    }
  } catch (err) {
    handleError(res, err);
  }
});

router.put('/blogs/:id', async (req, res) => {
  try {
    const updated = await Blog.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    handleError(res, err);
  }
});

router.delete('/blogs/:id', async (req, res) => {
  try {
    await Blog.deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
});

// ==================== WORKS ROUTES ====================
router.get('/works', async (req, res) => {
  try {
    const works = await Work.find().sort({ createdAt: -1 });
    res.json(works);
  } catch (err) {
    handleError(res, err);
  }
});

router.post('/works', async (req, res) => {
  try {
    const worksData = req.body;
    if (Array.isArray(worksData)) {
      await Work.deleteMany({});
      const created = await Work.insertMany(worksData);
      return res.json(created);
    } else {
      const created = await Work.create(worksData);
      return res.status(201).json(created);
    }
  } catch (err) {
    handleError(res, err);
  }
});

router.put('/works/:id', async (req, res) => {
  try {
    const updated = await Work.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    handleError(res, err);
  }
});

router.delete('/works/:id', async (req, res) => {
  try {
    await Work.deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
});

// ==================== INQUIRIES ROUTES ====================
router.get('/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    handleError(res, err);
  }
});

router.post('/inquiries', async (req, res) => {
  try {
    const inquiryData = req.body;
    if (Array.isArray(inquiryData)) {
      await Inquiry.deleteMany({});
      const created = await Inquiry.insertMany(inquiryData);
      return res.json(created);
    } else {
      if (!inquiryData.id) {
        inquiryData.id = 'inq_' + Date.now();
      }
      const created = await Inquiry.create(inquiryData);
      return res.status(201).json(created);
    }
  } catch (err) {
    handleError(res, err);
  }
});

router.put('/inquiries/:id', async (req, res) => {
  try {
    const updated = await Inquiry.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    handleError(res, err);
  }
});

router.delete('/inquiries/:id', async (req, res) => {
  try {
    await Inquiry.deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
});

// ==================== SETTINGS ROUTES ====================
router.get('/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (err) {
    handleError(res, err);
  }
});

router.put('/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json(settings);
  } catch (err) {
    handleError(res, err);
  }
});

export default router;
