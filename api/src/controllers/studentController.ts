import type { Request, Response } from 'express';
import { mockStudents } from '../data/mockStudents.js';

export function getAllStudents(_req: Request, res: Response): void {
  const students = mockStudents.map(({ activityRecords: _, ...basic }) => basic);
  res.json({ success: true, data: students });
}

export function getStudentById(req: Request, res: Response): void {
  const student = mockStudents.find((s) => s.id === req.params.id);

  if (!student) {
    res.status(404).json({ success: false, message: 'Student not found' });
    return;
  }

  res.json({ success: true, data: student });
}

export function getStudentByBarcode(req: Request, res: Response): void {
  const barcodeId = String(req.params.barcodeId).trim();
  const student = mockStudents.find(
    (s) => s.barcodeId.toLowerCase() === barcodeId.toLowerCase()
  );

  if (!student) {
    res.status(404).json({ success: false, message: 'No student found for this barcode' });
    return;
  }

  res.json({ success: true, data: student });
}

export function getStudentActivityRecords(req: Request, res: Response): void {
  const student = mockStudents.find((s) => s.id === req.params.id);

  if (!student) {
    res.status(404).json({ success: false, message: 'Student not found' });
    return;
  }

  res.json({ success: true, data: student.activityRecords });
}
