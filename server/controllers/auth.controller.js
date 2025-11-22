// server/controllers/auth.controller.js
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Sign Up - Register a new user
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: name, email, password' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email already exists' 
      });
    }

    // Create new user (password will be hashed by the pre-save middleware)
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Generate JWT token WITH isAdmin
    const token = jwt.sign(
      { 
        _id: user._id, 
        email: user.email,
        isAdmin: user.isAdmin || false
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error during signup',
      error: error.message 
    });
  }
};

// Sign In - Login user
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Please provide email and password' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT token WITH isAdmin
    const token = jwt.sign(
      { 
        _id: user._id, 
        email: user.email,
        isAdmin: user.isAdmin || false
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error during signin',
      error: error.message 
    });
  }
};

// Sign Out
export const signout = async (req, res) => {
  try {
    // In a stateless JWT implementation, signout is handled on the client side
    // by removing the token from storage
    res.status(200).json({
      message: 'Signout successful. Please remove the token from client storage.'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error during signout',
      error: error.message 
    });
  }
};

// Verify Token - Check if user is authenticated
export const verifyToken = async (req, res) => {
  try {
    // Token verification is done in the middleware
    // If we reach here, token is valid
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      message: 'Token is valid',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error verifying token',
      error: error.message 
    });
  }
};