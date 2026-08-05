import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';
import { autoSeedIfEmpty } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

// Configure DNS resolvers for SRV record resolution
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  // ignore
}

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://corelixtechnology_db_user:Corelix2026@corelixtechnology.0mtmpsm.mongodb.net/corelix?retryWrites=true&w=majority&appName=corelixtechnology';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'ok',
    database: isConnected ? 'connected' : 'connecting',
    time: new Date().toISOString()
  });
});

// 1. Start HTTP Server immediately for Render Health Checks
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 2. Connect to MongoDB Atlas with background retry logic
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('Successfully connected to MongoDB Atlas');
    await autoSeedIfEmpty();
  } catch (err) {
    console.error('MongoDB connection notice:', err.message);
    console.log('Retrying MongoDB Atlas connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

connectDB();
