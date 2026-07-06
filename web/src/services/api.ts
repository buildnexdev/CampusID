import axios from 'axios';
import type { ApiResponse, Student, StudentActivityRecords, StudentBasicInfo } from '../types/student';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});

export async function fetchStudentByBarcode(barcodeId: string): Promise<Student> {
  const { data } = await api.get<ApiResponse<Student>>(`/students/barcode/${encodeURIComponent(barcodeId)}`);
  if (!data.success || !data.data) {
    throw new Error(data.message || 'Student not found');
  }
  return data.data;
}

export async function fetchStudentById(id: string): Promise<Student> {
  const { data } = await api.get<ApiResponse<Student>>(`/students/${id}`);
  if (!data.success || !data.data) {
    throw new Error(data.message || 'Student not found');
  }
  return data.data;
}

export async function fetchStudentActivities(id: string): Promise<StudentActivityRecords> {
  const { data } = await api.get<ApiResponse<StudentActivityRecords>>(`/students/${id}/activities`);
  if (!data.success || !data.data) {
    throw new Error(data.message || 'Activity records not found');
  }
  return data.data;
}

export async function fetchAllStudents() {
  const { data } = await api.get<ApiResponse<Student[]>>('/students');
  return data.data ?? [];
}

export async function createStudent(studentData: Omit<StudentBasicInfo, 'id' | 'barcodeId'>): Promise<Student> {
  const { data } = await api.post<ApiResponse<Student>>('/students', studentData);
  if (!data.success || !data.data) {
    throw new Error(data.message || 'Failed to create student');
  }
  return data.data;
}

export async function addAchievement(
  studentId: string,
  achievementData: { title: string; description: string; date: string; level?: string; category: string }
): Promise<StudentActivityRecords> {
  const { data } = await api.post<ApiResponse<StudentActivityRecords>>(`/students/${studentId}/achievements`, achievementData);
  if (!data.success || !data.data) {
    throw new Error(data.message || 'Failed to add achievement');
  }
  return data.data;
}
