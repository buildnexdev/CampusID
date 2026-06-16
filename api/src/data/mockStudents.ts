import type { Student } from '../types/student.js';

export const mockStudents: Student[] = [
  {
    id: 'STU001',
    barcodeId: 'KYE-STU-2024-001',
    rollNo: 'CS21001',
    name: 'Arjun Mehta',
    department: 'Computer Science',
    year: '3rd Year',
    email: 'arjun.mehta@kye.edu',
    phone: '+91 98765 43210',
    photoUrl: '',
    activityRecords: {
      attendancePercentage: 87.5,
      sportsAchievements: [
        {
          title: 'Inter-College Cricket Championship',
          description: 'Winner - Team Captain',
          date: '2024-03-15',
          level: 'State',
        },
        {
          title: 'Annual Sports Day - 100m Sprint',
          description: 'Gold Medal',
          date: '2023-11-20',
          level: 'College',
        },
      ],
      educationalAchievements: [
        {
          title: 'Hackathon Winner',
          description: 'First place at KYE Tech Fest 2024',
          date: '2024-02-10',
          level: 'College',
        },
        {
          title: 'Dean\'s List',
          description: 'Academic excellence - Semester 4',
          date: '2023-12-01',
        },
      ],
      semesterMarklist: [
        {
          semester: 5,
          sgpa: 8.6,
          subjects: [
            { name: 'Data Structures', marks: 88, maxMarks: 100, grade: 'A' },
            { name: 'Operating Systems', marks: 82, maxMarks: 100, grade: 'A' },
            { name: 'Database Management', marks: 90, maxMarks: 100, grade: 'A+' },
          ],
        },
        {
          semester: 4,
          sgpa: 8.2,
          subjects: [
            { name: 'Computer Networks', marks: 78, maxMarks: 100, grade: 'B+' },
            { name: 'Software Engineering', marks: 85, maxMarks: 100, grade: 'A' },
            { name: 'Discrete Mathematics', marks: 80, maxMarks: 100, grade: 'A' },
          ],
        },
      ],
      absenteeRecords: [
        { date: '2024-09-12', reason: 'Medical leave', subject: 'Operating Systems' },
        { date: '2024-08-05', reason: 'Family emergency' },
      ],
      academicActivities: [
        {
          title: 'Research Paper Presentation',
          description: 'Presented on ML in Healthcare at KYE Symposium',
          date: '2024-01-18',
        },
        {
          title: 'Industry Internship',
          description: 'Summer internship at TechCorp Solutions',
          date: '2024-06-30',
        },
      ],
      disciplinaryRecords: [],
      coCurricularActivities: [
        {
          title: 'Coding Club Lead',
          description: 'Organized weekly coding sessions for juniors',
          date: '2023-08-01',
        },
        {
          title: 'NSS Volunteer',
          description: 'Community service - Blood donation camp',
          date: '2024-04-22',
        },
      ],
    },
  },
  {
    id: 'STU002',
    barcodeId: 'KYE-STU-2024-002',
    rollNo: 'ME21045',
    name: 'Priya Sharma',
    department: 'Mechanical Engineering',
    year: '2nd Year',
    email: 'priya.sharma@kye.edu',
    phone: '+91 91234 56789',
    activityRecords: {
      attendancePercentage: 92.3,
      sportsAchievements: [
        {
          title: 'Badminton Singles',
          description: 'Silver Medal - Inter-Department',
          date: '2024-01-25',
          level: 'College',
        },
      ],
      educationalAchievements: [
        {
          title: 'Science Exhibition',
          description: 'Best Innovation Award for Solar-Powered Device',
          date: '2024-03-08',
        },
      ],
      semesterMarklist: [
        {
          semester: 3,
          sgpa: 9.1,
          subjects: [
            { name: 'Thermodynamics', marks: 92, maxMarks: 100, grade: 'A+' },
            { name: 'Engineering Mechanics', marks: 88, maxMarks: 100, grade: 'A' },
            { name: 'Manufacturing Processes', marks: 85, maxMarks: 100, grade: 'A' },
          ],
        },
      ],
      absenteeRecords: [
        { date: '2024-10-02', reason: 'Approved leave', subject: 'Thermodynamics' },
      ],
      academicActivities: [
        {
          title: 'CAD Workshop',
          description: 'Completed advanced SolidWorks certification',
          date: '2024-05-15',
        },
      ],
      disciplinaryRecords: [
        {
          date: '2024-02-14',
          incident: 'Late submission of lab report (3 instances)',
          action: 'Verbal warning issued',
          status: 'resolved',
        },
      ],
      coCurricularActivities: [
        {
          title: 'Drama Club Member',
          description: 'Performed in annual cultural fest',
          date: '2024-02-28',
        },
      ],
    },
  },
];
