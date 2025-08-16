import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import userRoutes from './Routes/user.route.js';
import authRoutes from './Routes/auth.route.js';
import postRoutes from './Routes/post.route.js';
import facultyRoutes from './Routes/faculty.route.js';
import departRoutes from './Routes/depart.route.js';
import courseRoutes from './Routes/course.route.js';
import settingRoutes from './Routes/settings.route.js';
import staffRoutes from './Routes/staff.route.js';
import announceRoutes from './Routes/announce.route.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/departments', departRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/announce', announceRoutes);
app.use('/api/post', postRoutes);

// Static + Catch-all
// const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve()


// // Serve static files
app.use(express.static(path.join(__dirname, 'dlp-page/dist'))); 

// // Handle all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dlp-page', 'dist', 'index.html'));
});
// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

// DB connection + Start server
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

connectToDb();
