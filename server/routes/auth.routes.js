import express from 'express';
import {
  signup,
  signin,
  signout,
  verifyToken
} from '../controllers/auth.controller.js';
import { requireSignin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.get('/verify', requireSignin, verifyToken);

export default router;
