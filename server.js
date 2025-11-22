import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import contactRoutes from './server/routes/contact.routes.js';
import projectRoutes from './server/routes/project.routes.js';
import qualificationRoutes from './server/routes/qualification.routes.js';
import userRoutes from './server/routes/user.routes.js';
import authRoutes from './server/routes/auth.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5000',
      'https://comp-229-assignmnet-3.vercel.app'
    ];

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
      return;
    }

    const vercelPreviewPattern = /^https:\/\/comp-229-assignmnet-3-[a-z0-9]+-naomis-projects-b5a0354c\.vercel\.app$/;
    if (vercelPreviewPattern.test(origin)) {
      callback(null, true);
      return;
    }

    console.log('CORS blocked origin:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Portfolio';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Successfully connected to MongoDB Portfolio database!');
    
    try {
      const User = (await import('./server/models/user.model.js')).default;
      
      const adminExists = await User.findOne({ email: 'admin@portfolio.com' });
      
      if (!adminExists) {
        const adminUser = new User({
          name: 'Admin User',
          email: 'admin@portfolio.com',
          password: 'admin123',
          isAdmin: true
        });
        
        await adminUser.save();
        console.log('==================================');
        console.log('Admin user created successfully!');
        console.log('Email: admin@portfolio.com');
        console.log('Password: admin123');
        console.log('==================================');
      } else {
        console.log('Admin user already exists');
      }
    } catch (error) {
      console.error('Admin user creation error:', error);
    }

  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to my Portfolio Application - Backend API Server',
    version: '1.0.0',
    author: 'Naomi Smith',
    endpoints: {
      auth: {
        signup: 'POST /api/auth/signup',
        signin: 'POST /api/auth/signin',
        signout: 'GET /api/auth/signout',
        verify: 'GET /api/auth/verify'
      },
      contacts: '/api/contacts',
      projects: '/api/projects',
      qualifications: '/api/qualifications',
      users: '/api/users'
    },
    status: 'API is running successfully',
    cors: 'CORS configured for all Vercel deployments with pattern matching'
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    requestedPath: req.path 
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ 
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;