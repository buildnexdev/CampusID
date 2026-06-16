import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="page home-page">
      <section className="hero">
        <p className="eyebrow">KYE HR Portal</p>
        <h1>Student Management & Activity Tracking</h1>
        <p className="hero-text">
          Scan student ID cards to instantly view profiles, attendance, achievements,
          marklists, and complete activity records.
        </p>
        <div className="hero-actions">
          <Link to="/scanner" className="btn btn-primary">
            Open Barcode Scanner
          </Link>
        </div>
      </section>

      <section className="features-grid">
        <FeatureCard
          title="Barcode Scanner"
          description="Scan ID card barcodes to fetch roll number, department, year, and full student profile."
        />
        <FeatureCard
          title="Attendance Tracking"
          description="View attendance percentage and detailed absentee records semester-wise."
        />
        <FeatureCard
          title="Achievements"
          description="Sports, educational, academic, and co-curricular achievements in one place."
        />
        <FeatureCard
          title="Academic Records"
          description="Semester-wise marklists with SGPA, grades, and disciplinary history."
        />
      </section>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
