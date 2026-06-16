import type { StudentBasicInfo } from '../types/student';

interface StudentDetailsCardProps {
  student: StudentBasicInfo;
}

export default function StudentDetailsCard({ student }: StudentDetailsCardProps) {
  return (
    <section className="student-card">
      <div className="student-card-header">
        <div className="student-avatar">{student.name.charAt(0)}</div>
        <div>
          <h2>{student.name}</h2>
          <p className="student-id">{student.barcodeId}</p>
        </div>
      </div>
      <div className="student-details-grid">
        <DetailItem label="Roll No" value={student.rollNo} />
        <DetailItem label="Department" value={student.department} />
        <DetailItem label="Year" value={student.year} />
        <DetailItem label="Email" value={student.email} />
        <DetailItem label="Phone" value={student.phone} />
      </div>
    </section>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-item">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}
