import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';
import { requireSignin, hasAuthorization } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);

router.get('/:id', requireSignin, getUserById);
router.put('/:id', requireSignin, updateUser);
router.delete('/:id', requireSignin, deleteUser);

export default router;
