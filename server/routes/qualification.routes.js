import express from 'express';
import {
  createQualification,
  getAllQualifications,
  getQualificationById,
  updateQualification,
  deleteQualification
} from '../controllers/qualification.controller.js';

const router = express.Router();

router.post('/', createQualification);
router.get('/', getAllQualifications);
router.get('/:id', getQualificationById);
router.put('/:id', updateQualification);
router.delete('/:id', deleteQualification);

export default router;
