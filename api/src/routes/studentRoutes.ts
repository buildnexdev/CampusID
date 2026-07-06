import { Router } from 'express';
import {
  getAllStudents,
  getStudentById,
  getStudentByBarcode,
  getStudentActivityRecords,
  createStudent,
  addStudentAchievement,
} from '../controllers/studentController.js';

const router = Router();

router.get('/', getAllStudents);
router.post('/', createStudent);
router.get('/barcode/:barcodeId', getStudentByBarcode);
router.get('/:id/activities', getStudentActivityRecords);
router.post('/:id/achievements', addStudentAchievement);
router.get('/:id', getStudentById);

export default router;
