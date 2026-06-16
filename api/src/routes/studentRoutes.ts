import { Router } from 'express';
import {
  getAllStudents,
  getStudentById,
  getStudentByBarcode,
  getStudentActivityRecords,
} from '../controllers/studentController.js';

const router = Router();

router.get('/', getAllStudents);
router.get('/barcode/:barcodeId', getStudentByBarcode);
router.get('/:id/activities', getStudentActivityRecords);
router.get('/:id', getStudentById);

export default router;
