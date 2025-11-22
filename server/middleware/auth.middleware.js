import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'Invalid token. User not found.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid token' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expired. Please login again.' 
      });
    }
    res.status(500).json({ 
      message: 'Error verifying token',
      error: error.message 
    });
  }
};

export const hasAuthorization = (req, res, next) => {
  const authorized = req.user && req.params.userId && 
                     req.user._id.toString() === req.params.userId;
  
  if (!authorized) {
    return res.status(403).json({ 
      message: 'User is not authorized to perform this action' 
    });
  }
  next();
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ 
        message: 'Access denied. Admin privileges required.' 
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ 
      message: 'Error checking admin status',
      error: error.message 
    });
  }
};
