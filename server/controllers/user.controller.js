import User from '../models/user.model.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please provide all required fields: name, email, password'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email already exists'
      });
    }

    const user = new User({
      name,
      email,
      password
    });

    const savedUser = await user.save();
    res.status(201).json({
      message: 'User created successfully',
      user: savedUser
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating user',
      error: error.message 
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ created: -1 });
    res.status(200).json({
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching users',
      error: error.message 
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching user',
      error: error.message 
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const updateData = { name, email, updated: Date.now() };

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating user',
      error: error.message 
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting user',
      error: error.message 
    });
  }
};
