import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import TutorRegisterPage from './pages/TutorRegisterPage';
import StudentDashboard from './pages/student/StudentDashboard';
import ModulesPage from './pages/student/ModulesPage';
import ModuleDetailPage from './pages/student/ModuleDetailPage';
import TestPage from './pages/student/TestPage';
import ResultsPage from './pages/student/ResultsPage';
import CertificatePage from './pages/student/CertificatePage';
import ProfilePage from './pages/student/ProfilePage';
import TutorDashboard from './pages/tutor/TutorDashboard';
import TutorModulesPage from './pages/tutor/TutorModulesPage';
import ModuleManagementPage from './pages/tutor/ModuleManagementPage';
import TutorModuleDetailPage from './pages/tutor/TutorModuleDetailPage';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import MobileWarningBanner from './components/MobileWarningBanner';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <MobileWarningBanner />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register/student" element={<StudentRegisterPage onLogin={handleLogin} />} />
        <Route path="/register/tutor" element={<TutorRegisterPage onLogin={handleLogin} />} />

        {/* Student Protected Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute user={user} requiredRole="STUDENT">
              <StudentDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/modules"
          element={
            <ProtectedRoute user={user} requiredRole="STUDENT">
              <ModulesPage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/module/:id"
          element={
            <ProtectedRoute user={user} requiredRole="STUDENT">
              <ModuleDetailPage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/test/:moduleId"
          element={
            <ProtectedRoute user={user} requiredRole="STUDENT">
              <TestPage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/results"
          element={
            <ProtectedRoute user={user} requiredRole="STUDENT">
              <ResultsPage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/certificate"
          element={
            <ProtectedRoute user={user} requiredRole="STUDENT">
              <CertificatePage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute user={user} requiredRole="STUDENT">
              <ProfilePage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Tutor Protected Routes */}
        <Route
          path="/tutor/dashboard"
          element={
            <ProtectedRoute user={user} requiredRole="TUTOR">
              <TutorDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutor/modules"
          element={
            <ProtectedRoute user={user} requiredRole="TUTOR">
              <TutorModulesPage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutor/manage-modules"
          element={
            <ProtectedRoute user={user} requiredRole="TUTOR">
              <ModuleManagementPage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutor/module/:id"
          element={
            <ProtectedRoute user={user} requiredRole="TUTOR">
              <TutorModuleDetailPage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Super Admin Protected Routes */}
        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute user={user} requiredRole="SUPER_ADMIN">
              <SuperAdminDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
