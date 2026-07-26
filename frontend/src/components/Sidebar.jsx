import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, ClipboardList, Award, User, GraduationCap, LogOut, Settings, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Sidebar = ({ role, onLogout, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const studentLinks = [
    { path: '/student/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/student/modules', icon: BookOpen, label: 'Modules' },
    { path: '/student/results', icon: ClipboardList, label: 'Results' },
    { path: '/student/certificate', icon: Award, label: 'Certificate' },
    { path: '/student/profile', icon: User, label: 'Profile' }
  ];

  const tutorLinks = [
    { path: '/tutor/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/tutor/modules', icon: GraduationCap, label: 'Modules' },
    { path: '/tutor/manage-modules', icon: Settings, label: 'Manage Modules' }
  ];

  const superAdminLinks = [
    { path: '/superadmin/dashboard', icon: Home, label: 'Dashboard' }
  ];

  const links = role === 'STUDENT' ? studentLinks : role === 'SUPER_ADMIN' ? superAdminLinks : tutorLinks;

  const styles = {
    hamburger: {
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      zIndex: 1100,
      backgroundColor: '#1E293B',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '0.75rem',
      cursor: 'pointer',
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: isMobile && isOpen ? 'block' : 'none',
    },
    sidebar: {
      width: '260px',
      backgroundColor: '#1E293B',
      borderRight: '1px solid #334155',
      padding: '0',
      minHeight: '100vh',
      position: 'fixed',
      top: '0',
      left: isMobile ? (isOpen ? '0' : '-260px') : '0',
      bottom: '0',
      overflowY: 'auto',
      zIndex: 1050,
      display: 'flex',
      flexDirection: 'column',
      transition: 'left 0.3s ease',
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1.5rem 1rem',
      borderBottom: '1px solid #334155',
      cursor: 'pointer',
      backgroundColor: '#1E293B',
    },
    logoText: {
      color: '#fff',
      fontWeight: 700,
      fontSize: '1.25rem',
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      padding: '1.5rem 1rem',
      flex: 1,
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.875rem 1rem',
      borderRadius: '8px',
      textDecoration: 'none',
      color: '#94A3B8',
      fontWeight: 500,
      transition: 'all 0.25s ease',
      cursor: 'pointer',
    },
    linkActive: {
      background: 'linear-gradient(135deg, #6B4CE6 0%, #8B6FF6 100%)',
      color: '#fff',
      fontWeight: 600,
      boxShadow: '0 4px 15px rgba(107, 76, 230, 0.25)',
    },
    logoutSection: {
      padding: '1rem',
      borderTop: '1px solid #334155',
      marginTop: 'auto',
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.875rem 1rem',
      borderRadius: '8px',
      backgroundColor: 'transparent',
      color: '#EF4444',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      border: 'none',
      width: '100%',
      fontSize: '1rem',
    },
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button style={styles.hamburger} onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      <div style={styles.overlay} onClick={closeSidebar} />

      {/* Sidebar */}
      <div style={styles.sidebar}>
      <div style={styles.logoSection} onClick={() => navigate('/')}>
        <span style={styles.logoText}>StudyNest</span>
      </div>
      
      <nav style={styles.nav}>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.link,
                ...(isActive ? styles.linkActive : {}),
              }}
              onClick={closeSidebar}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#334155';
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#94A3B8';
                }
              }}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={styles.logoutSection}>
        <button
          style={styles.logoutButton}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#7F1D1D';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#EF4444';
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
