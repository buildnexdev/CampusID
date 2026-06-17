import { Link, Outlet } from 'react-router-dom';
import Menu from './Menu';

export default function Layout() {
  return (
    <div className="app-shell" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="app-header-full">
        <Link to="/" className="brand" style={{ color: 'white' }}>
          <span className="brand-mark" style={{ backgroundColor: 'white', color: '#4451c3' }}>KYE</span>
          <span className="brand-text" style={{ color: 'white', fontWeight: 'bold' }}>HR Portal</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/profile" style={{ marginRight: 20 }} className="brand">
            <span className="brand-mark" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Profile
            </span>
          </Link>
          <Link to="/logout" className="brand">
            <span className="brand-mark" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--error)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </span>
          </Link>
        </div>
      </header>

      <div className="app-body" style={{ position: 'relative' }}>
        <aside className="app-sidebar">
          <Menu />
          <div className="sidebar-footer">
            <div style={{ whiteSpace: 'nowrap' }}>KYE HR - Student Management System</div>
            <div style={{ opacity: 0.6, marginTop: 4 }}>Version: 1.0.0</div>
            <div style={{ opacity: 0.6 }}>Date: 17-Jun-2026</div>
          </div>
        </aside>

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
