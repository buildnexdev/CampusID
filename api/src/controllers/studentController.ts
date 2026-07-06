import type { Request, Response } from 'express';
import { mockStudents } from '../data/mockStudents.js';
import type { Student } from '../types/student.js';

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

export function createStudent(req: Request, res: Response): void {
  const { rollNo, name, department, year, email, phone, photoUrl } = req.body;

  if (!rollNo || !name || !department || !year || !email || !phone) {
    res.status(400).json({ success: false, message: 'Missing required student fields' });
    return;
  }

  const nextNum = mockStudents.length + 1;
  const id = `STU${String(nextNum).padStart(3, '0')}`;
  const barcodeId = `KYE-STU-2026-${String(nextNum).padStart(3, '0')}`;

  const newStudent: Student = {
    id,
    barcodeId,
    rollNo,
    name,
    department,
    year,
    email,
    phone,
    photoUrl: photoUrl || '',
    activityRecords: {
      attendancePercentage: 100,
      sportsAchievements: [],
      educationalAchievements: [],
      semesterMarklist: [],
      absenteeRecords: [],
      academicActivities: [],
      disciplinaryRecords: [],
      coCurricularActivities: [],
    },
  };

  mockStudents.push(newStudent);
  res.status(201).json({ success: true, data: newStudent });
}

export function addStudentAchievement(req: Request, res: Response): void {
  const student = mockStudents.find((s) => s.id === req.params.id);

  if (!student) {
    res.status(404).json({ success: false, message: 'Student not found' });
    return;
  }

  const { title, description, date, level, category, incident, action, status } = req.body;

  if (!category) {
    res.status(400).json({ success: false, message: 'Missing achievement or disciplinary category' });
    return;
  }

  if (category === 'disciplinary') {
    if (!date || !incident || !action || !status) {
      res.status(400).json({ success: false, message: 'Missing required disciplinary fields' });
      return;
    }
    const disciplinaryRecord = { date, incident, action, status };
    student.activityRecords.disciplinaryRecords.push(disciplinaryRecord);
  } else {
    if (!title || !description || !date) {
      res.status(400).json({ success: false, message: 'Missing required achievement fields' });
      return;
    }

    const achievement = { title, description, date, level };

    switch (category) {
      case 'sports':
        student.activityRecords.sportsAchievements.push(achievement);
        break;
      case 'educational':
        student.activityRecords.educationalAchievements.push(achievement);
        break;
      case 'academic':
        student.activityRecords.academicActivities.push(achievement);
        break;
      case 'coCurricular':
        student.activityRecords.coCurricularActivities.push(achievement);
        break;
      default:
        res.status(400).json({ success: false, message: 'Invalid achievement category' });
        return;
    }
  }

  res.status(201).json({ success: true, data: student.activityRecords });
}
