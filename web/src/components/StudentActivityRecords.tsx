import { useState } from 'react';
import type { StudentActivityRecords } from '../types/student';
import { addAchievement } from '../services/api';

interface StudentActivityRecordsProps {
  records: StudentActivityRecords;
  studentId: string;
  onUpdateRecords: (updatedRecords: StudentActivityRecords) => void;
}

export default function StudentActivityRecordsView({ records, studentId, onUpdateRecords }: StudentActivityRecordsProps) {
  const [modalCategory, setModalCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    level: '',
    incident: '',
    action: '',
    status: 'resolved',
  });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const openModal = (category: string) => {
    setModalCategory(category);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      level: '',
      incident: '',
      action: '',
      status: 'resolved',
    });
    setModalError(null);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalCategory) return;

    if (modalCategory === 'disciplinary') {
      if (!formData.incident || !formData.action || !formData.date || !formData.status) {
        setModalError('Please fill in all required fields.');
        return;
      }
    } else {
      if (!formData.title || !formData.description || !formData.date) {
        setModalError('Please fill in all required fields.');
        return;
      }
    }

    setModalLoading(true);
    setModalError(null);

    try {
      const updatedRecords = await addAchievement(studentId, {
        ...formData,
        category: modalCategory,
      });
      onUpdateRecords(updatedRecords);
      setModalCategory(null);
    } catch (err) {
      setModalError(err instanceof Error ? err.message : 'Failed to add record');
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="activity-records">
      <section className="activity-section highlight-section">
        <h3>Attendance</h3>
        <div className="attendance-meter">
          <div
            className="attendance-fill"
            style={{ width: `${Math.min(records.attendancePercentage, 100)}%` }}
          />
        </div>
        <p className="attendance-value">{records.attendancePercentage}%</p>
      </section>

      <div id="sports">
        <ActivityList
          title="Sports Achievements"
          items={records.sportsAchievements}
          emptyText="No sports achievements recorded"
          onAddClick={() => openModal('sports')}
        />
      </div>

      <div id="achievements">
        <ActivityList
          title="Educational Achievements"
          items={records.educationalAchievements}
          emptyText="No educational achievements recorded"
          onAddClick={() => openModal('educational')}
        />
      </div>

      <section className="activity-section">
        <h3>Semester-wise Marklist</h3>
        {records.semesterMarklist.length === 0 ? (
          <p className="empty-text">No marklist available</p>
        ) : (
          records.semesterMarklist.map((sem) => (
            <div key={sem.semester} className="marklist-block">
              <div className="marklist-header">
                <strong>Semester {sem.semester}</strong>
                <span>SGPA: {sem.sgpa}</span>
              </div>
              <table className="marks-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {sem.subjects.map((subject) => (
                    <tr key={subject.name}>
                      <td>{subject.name}</td>
                      <td>
                        {subject.marks}/{subject.maxMarks}
                      </td>
                      <td>{subject.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </section>

      <section className="activity-section">
        <h3>Absentee Record</h3>
        {records.absenteeRecords.length === 0 ? (
          <p className="empty-text">No absences recorded</p>
        ) : (
          <ul className="record-list">
            {records.absenteeRecords.map((record, index) => (
              <li key={`${record.date}-${index}`}>
                <strong>{record.date}</strong>
                {record.subject && <span> — {record.subject}</span>}
                {record.reason && <p>{record.reason}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>

      <ActivityList
        title="Academic Activities"
        items={records.academicActivities}
        emptyText="No academic activities recorded"
        onAddClick={() => openModal('academic')}
      />

      <DisciplinarySection
        records={records.disciplinaryRecords}
        onAddClick={() => openModal('disciplinary')}
      />

      <ActivityList
        title="Co-curricular Activities"
        items={records.coCurricularActivities}
        emptyText="No co-curricular activities recorded"
        onAddClick={() => openModal('coCurricular')}
      />

      {modalCategory && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
        }}>
          <div className="scanner-panel" style={{
            width: '90%',
            maxWidth: '450px',
            margin: '0 auto',
            animation: 'slideUp 0.3s ease-out',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>
                Add {modalCategory === 'sports' ? 'Sports Achievement' :
                   modalCategory === 'educational' ? 'Educational Achievement' :
                   modalCategory === 'academic' ? 'Academic Activity' :
                   modalCategory === 'disciplinary' ? 'Disciplinary Record' : 'Co-curricular Activity'}
              </h3>
              <button
                onClick={() => setModalCategory(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleModalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {modalCategory === 'disciplinary' ? (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, textAlign: 'left' }}>Incident *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Late submission of lab reports"
                      value={formData.incident}
                      onChange={(e) => setFormData({ ...formData, incident: e.target.value })}
                      style={{ padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, textAlign: 'left' }}>Action Taken *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Verbal warning issued"
                      value={formData.action}
                      onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                      style={{ padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, textAlign: 'left' }}>Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        style={{ padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.95rem' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, textAlign: 'left' }}>Status *</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        style={{ padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.95rem', backgroundColor: 'white' }}
                        required
                      >
                        <option value="resolved">Resolved</option>
                        <option value="pending">Pending</option>
                        <option value="warning">Warning</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, textAlign: 'left' }}>Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gold Medal in High Jump"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      style={{ padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, textAlign: 'left' }}>Description *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Represented college at state athletics meet"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      style={{ padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, textAlign: 'left' }}>Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        style={{ padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.95rem' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, textAlign: 'left' }}>Level (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. State, College"
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        style={{ padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.95rem' }}
                      />
                    </div>
                  </div>
                </>
              )}

              {modalError && <div className="alert alert-error" style={{ margin: '0.5rem 0 0', padding: '0.5rem' }}>{modalError}</div>}

              <button
                type="submit"
                disabled={modalLoading}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  fontSize: '0.95rem',
                }}
              >
                {modalLoading ? 'Adding...' : modalCategory === 'disciplinary' ? 'Add Record' : 'Add Achievement'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ActivityList({
  title,
  items,
  emptyText,
  onAddClick,
}: {
  title: string;
  items: { title: string; description: string; date: string; level?: string }[];
  emptyText: string;
  onAddClick?: () => void;
}) {
  return (
    <section className="activity-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        {onAddClick && (
          <button
            onClick={onAddClick}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.8rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <p className="empty-text">{emptyText}</p>
      ) : (
        <ul className="record-list">
          {items.map((item) => (
            <li key={`${item.title}-${item.date}`}>
              <strong>{item.title}</strong>
              {item.level && <span className="badge">{item.level}</span>}
              <p>{item.description}</p>
              <time>{item.date}</time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function DisciplinarySection({
  records,
  onAddClick,
}: {
  records: { date: string; incident: string; action: string; status: string }[];
  onAddClick?: () => void;
}) {
  return (
    <section className="activity-section disciplinary-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>Disciplinary Records</h3>
        {onAddClick && (
          <button
            onClick={onAddClick}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.8rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add
          </button>
        )}
      </div>
      {records.length === 0 ? (
        <p className="empty-text positive">No disciplinary records</p>
      ) : (
        <ul className="record-list">
          {records.map((record, index) => (
            <li key={`${record.date}-${index}`} className="disciplinary-item">
              <div className="disciplinary-header">
                <strong>{record.date}</strong>
                <span className={`status-badge status-${record.status}`}>{record.status}</span>
              </div>
              <p>{record.incident}</p>
              <p className="action-text">Action: {record.action}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
