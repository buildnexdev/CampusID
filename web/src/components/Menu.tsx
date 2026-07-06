import { useNavigate, useLocation } from 'react-router-dom';

export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();

    // Dynamically get the active student ID from pathname if on a student profile page
    const pathParts = location.pathname.split('/');
    const isStudentProfilePage = pathParts[1] === 'students' && pathParts[2] && pathParts[2] !== '';
    const activeStudentId = isStudentProfilePage ? pathParts[2] : 'STU001';

    const handleItemClick = (path: string, hash?: string) => {
        if (hash) {
            if (isStudentProfilePage) {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', `#${hash}`);
                }
            } else {
                navigate(`/students/${activeStudentId}#${hash}`);
            }
        } else {
            navigate(path);
        }
    };

    const menuItems = [
        {
            id: 'scanner',
            label: 'Barcode Scanner',
            path: '/scanner',
            isActive: location.pathname === '/scanner',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                    <line x1="7" y1="12" x2="17" y2="12" />
                </svg>
            ),
        },
        {
            id: 'directory',
            label: 'Student Directory',
            path: '/students',
            isActive: location.pathname === '/students',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
        },
        {
            id: 'add-student',
            label: 'Add Student',
            path: '/add-student',
            isActive: location.pathname === '/add-student',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="16" y1="11" x2="22" y2="11" />
                </svg>
            ),
        },
        {
            id: 'student-details',
            label: 'Student Details',
            path: `/students/${activeStudentId}`,
            hash: 'student-details',
            isActive: isStudentProfilePage && (location.hash === '#student-details' || !location.hash),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            ),
        },
    ];

    return (
        <div className="sidebar-menu-list">
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleItemClick(item.path, item.hash)}
                    className={`sidebar-menu-item ${item.isActive ? 'active' : ''}`}
                >
                    {item.icon}
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
    );
}
