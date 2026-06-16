import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentDetailsCard from '../components/StudentDetailsCard';
import StudentActivityRecordsView from '../components/StudentActivityRecords';
import { fetchStudentById } from '../services/api';
import type { Student } from '../types/student';

export default function StudentProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchStudentById(id)
      .then(setStudent)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load student'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <div className="alert alert-info">Loading student profile...</div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="page">
        <div className="alert alert-error">{error || 'Student not found'}</div>
        <Link to="/scanner" className="btn btn-secondary">
          Back to Scanner
        </Link>
      </div>
    );
  }

  return (
    <div className="page student-profile-page">
      <div className="page-header">
        <Link to="/scanner" className="back-link">
          ← Scan another ID
        </Link>
        <h1>Student Profile</h1>
      </div>

      <StudentDetailsCard student={student} />
      <StudentActivityRecordsView records={student.activityRecords} />
    </div>
  );
}
