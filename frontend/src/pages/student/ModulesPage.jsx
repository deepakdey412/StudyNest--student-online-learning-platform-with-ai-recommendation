import { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import ModuleCard from '../../components/ModuleCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import moduleService from '../../services/moduleService';
import './StudentPages.css';

const ModulesPage = ({ user, onLogout }) => {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [loading, setLoading] = useState(true);
  const [userSemester, setUserSemester] = useState(null);

  const semesters = [
    { value: 'all', label: 'All Semesters' },
    { value: 2, label: 'Semester 2' },
    { value: 3, label: 'Semester 3' },
    { value: 4, label: 'Semester 4' },
    { value: 5, label: 'Semester 5' },
    { value: 6, label: 'Semester 6' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterModules();
  }, [selectedSemester, modules]);

  const fetchData = async () => {
    try {
      const [modulesData, profileData] = await Promise.all([
        moduleService.getAllModules(),
        (await import('../../services/studentService')).default.getProfile()
      ]);
      setModules(modulesData);
      setUserSemester(profileData.semester);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterModules = () => {
    let filtered = [...modules];

    // Show ALL modules but only eligible ones will have active test button
    // Filter only by selected semester tab
    if (selectedSemester !== 'all') {
      filtered = filtered.filter(m => m.semester === parseInt(selectedSemester));
    }

    setFilteredModules(filtered);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="d-flex">
      <Sidebar role="STUDENT" onLogout={onLogout} user={user} />
      <TopBar user={user} />
      <div className="flex-grow-1" style={{ marginLeft: '260px', paddingTop: '60px' }}>
        <Container fluid className="p-4" style={{ maxWidth: '1400px' }}>
          <div className="mb-4">
            <h2 className="fw-bold">Explore Modules</h2>
            <p className="text-muted">
              Browse all modules across semesters
              {userSemester && (
                <span className="ms-2">
                  <span className="badge bg-info">
                    Your Semester: {userSemester} - You can take tests up to Semester {userSemester}
                  </span>
                </span>
              )}
            </p>
          </div>

          {/* Semester Filter Tabs */}
          <Nav variant="pills" className="mb-4 semester-tabs">
            {semesters.map((sem) => {
              return (
                <Nav.Item key={sem.value}>
                  <Nav.Link
                    active={selectedSemester === sem.value}
                    onClick={() => setSelectedSemester(sem.value)}
                    className="px-4"
                  >
                    {sem.label}
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>

          {/* Modules Grid */}
          {filteredModules.length > 0 ? (
            <>
              <Row className="g-4">
                {filteredModules.map((module) => (
                  <Col key={module.id} md={6} lg={4}>
                    <ModuleCard module={module} role="STUDENT" userSemester={userSemester} />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">No modules found for this semester</p>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default ModulesPage;
