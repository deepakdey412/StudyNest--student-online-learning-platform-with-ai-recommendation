import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  BarChart2, 
  Calendar, 
  UserPlus, 
  Search, 
  PlayCircle, 
  Menu, 
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  Award,
  LogOut,
  User
} from 'lucide-react';
import Logo from '../components/Logo';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [user, setUser] = useState(null);

  console.log('LandingPage rendering...');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fraunces:wght@700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Handle scroll for sticky navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Navigate to dashboard
  const goToDashboard = () => {
    if (user) {
      let dashboardPath = '/student/dashboard';
      if (user.role === 'SUPER_ADMIN') {
        dashboardPath = '/superadmin/dashboard';
      } else if (user.role === 'TUTOR') {
        dashboardPath = '/tutor/dashboard';
      }
      navigate(dashboardPath);
    }
  };

  // Testimonials data - Engineering students from Sem 2-6
  const testimonials = [
    {
      name: "Rahul Verma",
      semester: "Semester 2",
      branch: "Computer Engineering",
      quote: "StudyNest helped me understand Digital Electronics and C Programming concepts clearly. The MCQ tests are really helpful!",
      avatar: "https://i.pravatar.cc/64?img=12"
    },
    {
      name: "Priya Sharma",
      semester: "Semester 3",
      branch: "Computer Engineering",
      quote: "Data Structures became so much easier with StudyNest. The practice questions are exactly what we need for exams.",
      avatar: "https://i.pravatar.cc/64?img=47"
    },
    {
      name: "Amit Patel",
      semester: "Semester 4",
      branch: "Computer Engineering",
      quote: "Operating Systems and Computer Networks modules are comprehensive. I improved my scores by 35% this semester!",
      avatar: "https://i.pravatar.cc/64?img=33"
    },
    {
      name: "Sneha Kulkarni",
      semester: "Semester 5",
      branch: "Computer Engineering",
      quote: "Theory of Computation and Compiler Design were tough, but StudyNest made them manageable. Great platform!",
      avatar: "https://i.pravatar.cc/64?img=21"
    },
    {
      name: "Vikram Singh",
      semester: "Semester 6",
      branch: "Computer Engineering",
      quote: "Completed all tests and got my certificate! Machine Learning and Cloud Computing modules are excellent.",
      avatar: "https://i.pravatar.cc/64?img=15"
    },
    {
      name: "Anjali Desai",
      semester: "Semester 3",
      branch: "Computer Engineering",
      quote: "DBMS and OOP concepts are explained so well. The test results help me track my weak areas.",
      avatar: "https://i.pravatar.cc/64?img=28"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const styles = {
    body: {
      fontFamily: "'DM Sans', sans-serif",
      margin: 0,
      padding: 0,
      scrollBehavior: 'smooth',
    },
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      boxShadow: isScrolled ? '0 4px 24px rgba(0, 0, 0, 0.08)' : 'none',
      transition: 'all 0.3s ease',
      padding: '1rem 2rem',
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      color: isScrolled ? '#111827' : '#fff',
      fontWeight: 700,
      fontSize: '1.5rem',
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    navLink: {
      color: isScrolled ? '#111827' : '#fff',
      textDecoration: 'none',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'color 0.25s ease',
    },
    navButtons: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
    },
    button: {
      padding: '0.75rem 1.5rem',
      borderRadius: '9999px',
      fontWeight: 600,
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      textDecoration: 'none',
      display: 'inline-block',
      border: 'none',
    },
    buttonPrimary: {
      backgroundColor: '#0EA5E9',
      color: '#fff',
    },
    buttonOutline: {
      backgroundColor: 'transparent',
      color: isScrolled ? '#0EA5E9' : '#fff',
      border: `2px solid ${isScrolled ? '#0EA5E9' : '#fff'}`,
    },
    hero: {
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(135deg, rgba(107, 76, 230, 0.92) 0%, rgba(139, 111, 246, 0.85) 100%), url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#fff',
      padding: '2rem',
    },
    heroContent: {
      maxWidth: '800px',
    },
    eyebrow: {
      display: 'inline-block',
      backgroundColor: 'rgba(233, 213, 255, 0.25)',
      color: '#fff',
      padding: '0.5rem 1.5rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: 500,
      marginBottom: '2rem',
    },
    heroHeadline: {
      fontFamily: "'Fraunces', serif",
      fontSize: '4rem',
      fontWeight: 700,
      marginBottom: '1.5rem',
      lineHeight: 1.1,
    },
    heroSubtext: {
      fontSize: '1.25rem',
      fontWeight: 300,
      marginBottom: '2.5rem',
      opacity: 0.95,
    },
    heroButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '3rem',
    },
    trustStats: {
      display: 'flex',
      gap: '3rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      fontSize: '0.95rem',
      opacity: 0.9,
    },
    section: {
      padding: '5rem 2rem',
    },
    sectionHeading: {
      textAlign: 'center',
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '3rem',
      color: '#111827',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    featureCard: {
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(124,58,237,0.08)',
      textAlign: 'center',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      cursor: 'pointer',
    },
    stepsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      maxWidth: '1000px',
      margin: '0 auto',
      gap: '2rem',
      flexWrap: 'wrap',
    },
    step: {
      flex: 1,
      textAlign: 'center',
      minWidth: '250px',
    },
    stepNumber: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#0EA5E9',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      fontWeight: 700,
      margin: '0 auto 1rem',
    },
    testimonialsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    testimonialCarousel: {
      maxWidth: '900px',
      margin: '0 auto',
      position: 'relative',
      padding: '0 80px',
    },
    testimonialCard: {
      backgroundColor: '#fff',
      padding: '3rem 2.5rem',
      borderRadius: '20px',
      textAlign: 'center',
      minHeight: '320px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 10px 40px rgba(124,58,237,0.12)',
      border: '1px solid #E0F2FE',
    },
    carouselButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: '#fff',
      color: '#0EA5E9',
      border: '2px solid #0EA5E9',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      zIndex: 10,
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    carouselButtonLeft: {
      left: '0',
    },
    carouselButtonRight: {
      right: '0',
    },
    carouselDots: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '2rem',
    },
    dot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#D1D5DB',
      cursor: 'pointer',
      transition: 'all 0.25s ease',
    },
    dotActive: {
      backgroundColor: '#0EA5E9',
      width: '30px',
      borderRadius: '5px',
    },
    stars: {
      display: 'flex',
      gap: '0.25rem',
      marginBottom: '1rem',
    },
    ctaSection: {
      background: 'linear-gradient(135deg, #0EA5E9, #0EA5E9)',
      color: '#fff',
      textAlign: 'center',
      padding: '5rem 2rem',
    },
    footer: {
      backgroundColor: '#111827',
      color: '#fff',
      padding: '3rem 2rem 1rem',
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem',
    },
    socialIcons: {
      display: 'flex',
      gap: '1rem',
    },
    mobileMenuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      color: isScrolled ? '#111827' : '#fff',
      cursor: 'pointer',
    },
  };

  // Logo SVG Component
  const Logo = ({ color = '#0EA5E9' }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4L8 10V18C8 22.4183 11.5817 26 16 26C20.4183 26 24 22.4183 24 18V10L16 4Z" fill={color} opacity="0.2"/>
      <path d="M16 4L8 10V18C8 22.4183 11.5817 26 16 26C20.4183 26 24 22.4183 24 18V10L16 4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 12L12 14.5V19C12 20.6569 13.3431 22 15 22H17C18.6569 22 20 20.6569 20 19V14.5L16 12Z" fill={color}/>
      <circle cx="16" cy="8" r="2" fill="#7DD3FC"/>
    </svg>
  );

  // Social Media Icons
  const InstagramIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );

  const GithubIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const LinkedinIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );

  return (
    <div style={styles.body}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <a href="#home" style={styles.logo} onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <Logo size="sm" />
            <span>StudyNest</span>
          </a>
          
          <ul style={{ ...styles.navLinks, display: isMobileMenuOpen ? 'flex' : 'none' }} className="nav-links-desktop">
            <li><a style={styles.navLink} onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a style={styles.navLink} onClick={() => scrollToSection('features')}>Features</a></li>
            <li><a style={styles.navLink} onClick={() => scrollToSection('about')}>About</a></li>
            <li><a style={styles.navLink} onClick={() => scrollToSection('contact')}>Contact</a></li>
            {user && (
              <li><a style={styles.navLink} onClick={goToDashboard}>My Dashboard</a></li>
            )}
          </ul>

          <div style={styles.navButtons}>
            {user ? (
              <>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: isScrolled ? '#F0F9FF' : 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '9999px',
                    border: `1px solid ${isScrolled ? '#BAE6FD' : 'rgba(255, 255, 255, 0.3)'}`,
                    cursor: 'pointer'
                  }}
                  onClick={goToDashboard}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#0EA5E9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}>
                    <User size={18} />
                  </div>
                  <span style={{ 
                    color: isScrolled ? '#1E293B' : '#fff', 
                    fontWeight: 600,
                    fontSize: '0.95rem'
                  }}>
                    {user.name}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  style={{ 
                    ...styles.button, 
                    ...styles.buttonOutline,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ ...styles.button, ...styles.buttonOutline }}>Login</Link>
                <Link to="/register/student" style={{ ...styles.button, ...styles.buttonPrimary }}>Sign Up</Link>
              </>
            )}
          </div>

          <button style={styles.mobileMenuButton} className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.eyebrow}>Trusted by 10,000+ students</div>
          <h1 style={styles.heroHeadline}>Build Your Future with Smart Learning</h1>
          <p style={styles.heroSubtext}>
            Connect with expert tutors and learn in a structured, personalized way
          </p>
          <div style={styles.heroButtons}>
            <Link to="/register/student" style={{ ...styles.button, backgroundColor: '#fff', color: '#0EA5E9' }}>
              Get Started
            </Link>
            <a href="#features" style={{ ...styles.button, backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff' }} onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>
              Explore Features
            </a>
          </div>
          <div style={styles.trustStats}>
            <div><strong>500+</strong> Tutors</div>
            <div><strong>10K+</strong> Students</div>
            <div><strong>4.9</strong> Rating</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ ...styles.section, backgroundColor: '#fff' }}>
        <h2 style={styles.sectionHeading}>Everything You Need to Succeed</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,58,237,0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(124,58,237,0.08)'; }}>
            <BookOpen size={48} color="#0EA5E9" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Personalized Learning</h3>
            <p style={{ color: '#6B7280', lineHeight: 1.6 }}>Tailored lesson plans that adapt to your pace and goals.</p>
          </div>

          <div style={styles.featureCard} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,58,237,0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(124,58,237,0.08)'; }}>
            <GraduationCap size={48} color="#0EA5E9" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Expert Tutors</h3>
            <p style={{ color: '#6B7280', lineHeight: 1.6 }}>Learn from verified professionals across every subject.</p>
          </div>

          <div style={styles.featureCard} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,58,237,0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(124,58,237,0.08)'; }}>
            <BarChart2 size={48} color="#0EA5E9" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Progress Tracking</h3>
            <p style={{ color: '#6B7280', lineHeight: 1.6 }}>Visual dashboards to monitor your learning milestones.</p>
          </div>

          <div style={styles.featureCard} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,58,237,0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(124,58,237,0.08)'; }}>
            <Calendar size={48} color="#0EA5E9" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Flexible Scheduling</h3>
            <p style={{ color: '#6B7280', lineHeight: 1.6 }}>Book sessions anytime that fits your lifestyle.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" style={{ ...styles.section, backgroundColor: '#F0F9FF' }}>
        <h2 style={styles.sectionHeading}>How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Step 1 */}
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(14,165,233,0.1)', textAlign: 'center', position: 'relative', border: '2px solid #E0F2FE' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#0EA5E9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, margin: '0 auto 1rem' }}>1</div>
            <UserPlus size={40} color="#0EA5E9" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', color: '#111827' }}>Register</h3>
            <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '0.95rem' }}>Sign up as a student with your name, PRN, roll number, and semester details</p>
          </div>

          {/* Step 2 */}
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(14,165,233,0.1)', textAlign: 'center', position: 'relative', border: '2px solid #E0F2FE' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#0EA5E9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, margin: '0 auto 1rem' }}>2</div>
            <Search size={40} color="#0EA5E9" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', color: '#111827' }}>Browse Modules</h3>
            <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '0.95rem' }}>Explore 25 modules across semesters 2-6 covering all engineering subjects</p>
          </div>

          {/* Step 3 */}
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(14,165,233,0.1)', textAlign: 'center', position: 'relative', border: '2px solid #E0F2FE' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#0EA5E9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, margin: '0 auto 1rem' }}>3</div>
            <PlayCircle size={40} color="#0EA5E9" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', color: '#111827' }}>Take Tests</h3>
            <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '0.95rem' }}>Attempt 10 MCQ questions for each module to test your knowledge</p>
          </div>

          {/* Step 4 */}
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(14,165,233,0.1)', textAlign: 'center', position: 'relative', border: '2px solid #E0F2FE' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#0EA5E9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, margin: '0 auto 1rem' }}>4</div>
            <BarChart2 size={40} color="#0EA5E9" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', color: '#111827' }}>Score & Pass</h3>
            <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '0.95rem' }}>Score at least 6/10 in each test to pass and track your progress</p>
          </div>

          {/* Step 5 */}
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(14,165,233,0.1)', textAlign: 'center', position: 'relative', border: '2px solid #E0F2FE' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#0EA5E9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, margin: '0 auto 1rem' }}>5</div>
            <BookOpen size={40} color="#0EA5E9" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', color: '#111827' }}>Complete Semester</h3>
            <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '0.95rem' }}>Finish all 5 modules of your semester to become eligible for certificate</p>
          </div>

          {/* Step 6 */}
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(14,165,233,0.1)', textAlign: 'center', position: 'relative', border: '2px solid #E0F2FE' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#0EA5E9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, margin: '0 auto 1rem' }}>6</div>
            <Award size={40} color="#0EA5E9" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', color: '#111827' }}>Get Certificate</h3>
            <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '0.95rem' }}>Download your professional certificate from the dashboard as PDF</p>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ ...styles.section, backgroundColor: '#F9FAFB' }}>
        <h2 style={styles.sectionHeading}>What Our Students Say</h2>
        <div style={styles.testimonialCarousel}>
          <button 
            style={{ ...styles.carouselButton, ...styles.carouselButtonLeft }}
            onClick={prevTestimonial}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0EA5E9';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#0EA5E9';
            }}
          >
            <ChevronLeft size={28} />
          </button>

          <div style={styles.testimonialCard}>
            <div>
              <div style={styles.stars}>
                {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="#FCD34D" color="#FCD34D" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: '#374151', margin: '1.5rem 0', lineHeight: 1.8, fontSize: '1.15rem' }}>
                "{testimonials[currentTestimonial].quote}"
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginTop: '1.5rem' }}>
              <img 
                src={testimonials[currentTestimonial].avatar} 
                alt={testimonials[currentTestimonial].name} 
                style={{ width: '70px', height: '70px', borderRadius: '50%', border: '4px solid #0EA5E9' }} 
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#111827' }}>{testimonials[currentTestimonial].name}</div>
                <div style={{ fontSize: '0.95rem', color: '#0EA5E9', fontWeight: 600, marginTop: '0.25rem' }}>{testimonials[currentTestimonial].semester}</div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.15rem' }}>{testimonials[currentTestimonial].branch}</div>
              </div>
            </div>
          </div>

          <button 
            style={{ ...styles.carouselButton, ...styles.carouselButtonRight }}
            onClick={nextTestimonial}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0EA5E9';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#0EA5E9';
            }}
          >
            <ChevronRight size={28} />
          </button>

          <div style={styles.carouselDots}>
            {testimonials.map((_, index) => (
              <div
                key={index}
                style={{
                  ...styles.dot,
                  ...(index === currentTestimonial ? styles.dotActive : {})
                }}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" style={styles.ctaSection}>
        <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>Ready to Start Learning?</h2>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.95 }}>
          Join thousands of students already growing with StudyNest.
        </p>
        <Link to="/register/student" style={{ ...styles.button, backgroundColor: '#fff', color: '#0EA5E9', fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
          Start Learning Today
        </Link>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Logo color="#fff" />
                <span style={{ fontWeight: 700, fontSize: '1.5rem' }}>StudyNest</span>
              </div>
              <p style={{ color: '#9CA3AF', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                A comprehensive learning platform for engineering students. Master your subjects, track your progress, and earn certificates.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a 
                  href="https://www.instagram.com/deepax.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#9CA3AF', transition: 'color 0.25s ease' }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#E1306C'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                >
                  <InstagramIcon />
                </a>
                <a 
                  href="https://github.com/deepakdey412" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#9CA3AF', transition: 'color 0.25s ease' }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                >
                  <GithubIcon />
                </a>
                <a 
                  href="https://www.linkedin.com/in/deepakdey/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#9CA3AF', transition: 'color 0.25s ease' }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#0A66C2'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                >
                  <LinkedinIcon />
                </a>
              </div>
            </div>

            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <a href="#features" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.25s ease' }} onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                    Features
                  </a>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <a href="#about" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.25s ease' }} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                    How It Works
                  </a>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <a href="#contact" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.25s ease' }} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>For Students</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <Link to="/register/student" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.25s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                    Student Registration
                  </Link>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <Link to="/login" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.25s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                    Student Login
                  </Link>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <Link to="/register/tutor" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.25s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                    Tutor Registration
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ paddingTop: '2rem', borderTop: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: '#9CA3AF', fontSize: '0.875rem', margin: 0 }}>
              © 2025 StudyNest. All rights reserved.
            </p>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>
              Made with ❤️ for Engineering Students
            </p>
          </div>
        </div>
      </footer>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .nav-links-desktop {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

