import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';
import { requireSignin, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public route for user creation (signup)
router.post('/', createUser);

// Admin routes - require signin AND admin status
router.get('/', requireSignin, isAdmin, getAllUsers);
router.get('/:id', requireSignin, isAdmin, getUserById);
router.put('/:id', requireSignin, isAdmin, updateUser);
router.delete('/:id', requireSignin, isAdmin, deleteUser);

export default router;