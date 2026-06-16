import type { StudentActivityRecords } from '../types/student';

interface StudentActivityRecordsProps {
  records: StudentActivityRecords;
}

export default function StudentActivityRecordsView({ records }: StudentActivityRecordsProps) {
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

      <ActivityList title="Sports Achievements" items={records.sportsAchievements} emptyText="No sports achievements recorded" />
      <ActivityList title="Educational Achievements" items={records.educationalAchievements} emptyText="No educational achievements recorded" />

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

      <ActivityList title="Academic Activities" items={records.academicActivities} emptyText="No academic activities recorded" />
      <DisciplinarySection records={records.disciplinaryRecords} />
      <ActivityList title="Co-curricular Activities" items={records.coCurricularActivities} emptyText="No co-curricular activities recorded" />
    </div>
  );
}

function ActivityList({
  title,
  items,
  emptyText,
}: {
  title: string;
  items: { title: string; description: string; date: string; level?: string }[];
  emptyText: string;
}) {
  return (
    <section className="activity-section">
      <h3>{title}</h3>
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
}: {
  records: { date: string; incident: string; action: string; status: string }[];
}) {
  return (
    <section className="activity-section disciplinary-section">
      <h3>Disciplinary Records</h3>
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
