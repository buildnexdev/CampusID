export interface StudentBasicInfo {
  id: string;
  barcodeId: string;
  rollNo: string;
  name: string;
  department: string;
  year: string;
  email: string;
  phone: string;
  photoUrl?: string;
}

export interface SemesterMark {
  semester: number;
  subjects: { name: string; marks: number; maxMarks: number; grade: string }[];
  sgpa: number;
}

export interface AbsenteeRecord {
  date: string;
  reason?: string;
  subject?: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  level?: string;
}

export interface DisciplinaryRecord {
  date: string;
  incident: string;
  action: string;
  status: 'resolved' | 'pending' | 'warning';
}

export interface StudentActivityRecords {
  attendancePercentage: number;
  sportsAchievements: Achievement[];
  educationalAchievements: Achievement[];
  semesterMarklist: SemesterMark[];
  absenteeRecords: AbsenteeRecord[];
  academicActivities: Achievement[];
  disciplinaryRecords: DisciplinaryRecord[];
  coCurricularActivities: Achievement[];
}

export interface Student extends StudentBasicInfo {
  activityRecords: StudentActivityRecords;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
