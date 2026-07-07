import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createStudent } from '../services/api';

export default function AddStudentPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    department: '',
    year: '1st Year',
    email: '',
    phone: '',
    photoUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNo || !formData.department || !formData.year || !formData.email || !formData.phone) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const createdStudent = await createStudent(formData);
      // Redirect to the newly created student profile
      navigate(`/students/${createdStudent.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page add-student-page">
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <Link to="/students" className="back-link">
          ← Back to Directory
        </Link>
        <h1>Add New Student</h1>
        <p>Register a new student profile in the system.</p>
      </div>

      <div className="scanner-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
        {error && <div className="alert alert-error">{error}</div>}
        {loading && <div className="alert alert-info">Registering student...</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label htmlFor="name" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>
              Full Name <span style={{ color: 'var(--error)' }}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Rohit Kumar"
              value={formData.name}
              onChange={handleChange}
              style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem', width: '100%' }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="rollNo" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>
                Roll Number <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                placeholder="e.g. CS22005"
                value={formData.rollNo}
                onChange={handleChange}
                style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem', width: '100%' }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="year" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>
                Academic Year <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem', backgroundColor: 'white', width: '100%', cursor: 'pointer' }}
                required
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label htmlFor="department" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>
              Department <span style={{ color: 'var(--error)' }}>*</span>
            </label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="e.g. Computer Science"
              value={formData.department}
              onChange={handleChange}
              style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem', width: '100%' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>
              Email Address <span style={{ color: 'var(--error)' }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. rohit.kumar@buildnex.edu"
              value={formData.email}
              onChange={handleChange}
              style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem', width: '100%' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label htmlFor="phone" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>
              Phone Number <span style={{ color: 'var(--error)' }}>*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="e.g. +91 99999 88888"
              value={formData.phone}
              onChange={handleChange}
              style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem', width: '100%' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label htmlFor="photoUrl" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>
              Photo URL (Optional)
            </label>
            <input
              type="text"
              id="photoUrl"
              name="photoUrl"
              placeholder="e.g. https://example.com/avatar.jpg"
              value={formData.photoUrl}
              onChange={handleChange}
              style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '1rem', width: '100%' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.875rem',
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-dark)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
          >
            Create Student Profile
          </button>
        </form>
      </div>
    </div>
  );
}
