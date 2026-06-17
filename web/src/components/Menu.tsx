import { useNavigate, useLocation } from 'react-router-dom';

export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleItemClick = (path: string, hash?: string) => {
        if (hash) {
            const isStudentPage = location.pathname.startsWith('/students');
            if (isStudentPage) {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', `#${hash}`);
                }
            } else {
                // Navigate to default student STU001 and set hash
                navigate(`/students/STU001#${hash}`);
            }
        } else {
            navigate(path);
        }
    };

    const menuItems = [
        // {
        //   id: 'dashboard',
        //   label: 'Dashboard',
        //   path: '/',
        //   isActive: location.pathname === '/',
        //   icon: (
        //     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        //       <rect x="3" y="3" width="7" height="9" />
        //       <rect x="14" y="3" width="7" height="5" />
        //       <rect x="14" y="12" width="7" height="9" />
        //       <rect x="3" y="16" width="7" height="5" />
        //     </svg>
        //   ),
        // },
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
            id: 'student-details',
            label: 'Student Details',
            path: '/students/STU001',
            hash: 'student-details',
            isActive: location.pathname.startsWith('/students') && (location.hash === '#student-details' || !location.hash),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            ),
        },
        {
            id: 'achievements',
            label: 'Achievements',
            path: '/students/STU001',
            hash: 'achievements',
            isActive: location.pathname.startsWith('/students') && location.hash === '#achievements',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
            ),
        },
        {
            id: 'sports',
            label: 'Sports Achievements',
            path: '/students/STU001',
            hash: 'sports',
            isActive: location.pathname.startsWith('/students') && location.hash === '#sports',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M6 12A6 6 0 0 1 12 6" />
                    <path d="M12 18A6 6 0 0 1 18 12" />
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
