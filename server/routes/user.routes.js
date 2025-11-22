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

router.post('/', createUser);

router.get('/', requireSignin, isAdmin, getAllUsers);
router.get('/:id', requireSignin, isAdmin, getUserById);
router.put('/:id', requireSignin, isAdmin, updateUser);
router.delete('/:id', requireSignin, isAdmin, deleteUser);

export default router;