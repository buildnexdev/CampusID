import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllStudents } from '../services/api';
import type { StudentBasicInfo } from '../types/student';

export default function StudentDirectoryPage() {
  const [students, setStudents] = useState<StudentBasicInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllStudents()
      .then(setStudents)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load students'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page student-directory-page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Student Directory</h1>
          <p>Browse through the complete list of registered students.</p>
        </div>
        <Link to="/add-student" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Student
        </Link>
      </div>

      {loading && <div className="alert alert-info">Loading students...</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {!loading && !error && students.length === 0 ? (
        <div className="alert alert-info">No students registered yet. Click "Add Student" to create one.</div>
      ) : (
        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {students.map((student) => (
            <Link key={student.id} to={`/students/${student.id}`} className="feature-card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <div className="student-avatar" style={{ width: '48px', height: '48px', fontSize: '1.2rem', flexShrink: 0 }}>
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{student.name}</h3>
                  <span className="student-id" style={{ fontSize: '0.8rem' }}>{student.barcodeId}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.875rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Roll No:</span>
                  <span style={{ fontWeight: 500 }}>{student.rollNo}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Dept:</span>
                  <span style={{ fontWeight: 500 }}>{student.department}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Year:</span>
                  <span style={{ fontWeight: 500 }}>{student.year}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '6px', marginTop: '4px' }}>
                  <span style={{ color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{student.email}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
