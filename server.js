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

app.use(cors());
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
      contacts: '/api/contacts',
      projects: '/api/projects',
      qualifications: '/api/qualifications',
      users: '/api/users',
      auth: '/api/auth'
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});

export default app;