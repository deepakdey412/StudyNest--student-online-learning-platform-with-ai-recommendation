import { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Card, Badge } from 'react-bootstrap';
import { FaBook, FaQuestionCircle } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import LoadingSpinner from '../../components/LoadingSpinner';
import moduleService from '../../services/moduleService';
import '../student/StudentPages.css';

const TutorModulesPage = ({ user, onLogout }) => {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [loading, setLoading] = useState(true);

  const semesters = [
    { value: 'all', label: 'All Semesters' },
    { value: 2, label: 'Semester 2' },
    { value: 3, label: 'Semester 3' },
    { value: 4, label: 'Semester 4' },
    { value: 5, label: 'Semester 5' },
    { value: 6, label: 'Semester 6' }
  ];

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    filterModules();
  }, [selectedSemester, modules]);

  const fetchModules = async () => {
    try {
      const data = await moduleService.getAllModules();
      setModules(data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterModules = () => {
    if (selectedSemester === 'all') {
      setFilteredModules(modules);
    } else {
      setFilteredModules(modules.filter(m => m.semester === parseInt(selectedSemester)));
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="d-flex">
      <Sidebar role="TUTOR" onLogout={onLogout} user={user} />
      <TopBar user={user} />
      <div className="flex-grow-1" style={{ marginLeft: '260px', paddingTop: '60px' }}>
        <Container fluid className="p-4" style={{ maxWidth: '1400px' }}>
          <div className="mb-4">
            <h2 className="fw-bold">Module Management</h2>
            <p className="text-muted">View and manage all course modules</p>
          </div>

          {/* Semester Filter Tabs */}
          <Nav variant="pills" className="mb-4 semester-tabs">
            {semesters.map((sem) => (
              <Nav.Item key={sem.value}>
                <Nav.Link
                  active={selectedSemester === sem.value}
                  onClick={() => setSelectedSemester(sem.value)}
                  className="px-4"
                >
                  {sem.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {/* Modules List */}
          {filteredModules.length > 0 ? (
            <>
              <div className="mb-3">
                <h5 className="text-muted">
                  {selectedSemester === 'all' 
                    ? `Showing all ${filteredModules.length} modules` 
                    : `Semester ${selectedSemester} - ${filteredModules.length} modules`}
                </h5>
              </div>
              <Row className="g-4">
                {filteredModules.map((module) => (
                  <Col key={module.id} md={6} lg={4}>
                    <Card className="border-0 shadow-sm h-100 hover-card">
                      <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <Badge bg="primary">Semester {module.semester}</Badge>
                          <FaBook className="text-primary" size={24} />
                        </div>
                        <h5 className="fw-bold mb-2">{module.name}</h5>
                        <p className="text-muted small mb-3">{module.code}</p>
                        <p className="text-muted mb-3" style={{ minHeight: '60px' }}>
                          {module.description}
                        </p>
                        <div className="d-flex align-items-center text-muted small">
                          <FaQuestionCircle className="me-2" />
                          <span>10 Questions Available</span>
                        </div>
                      </Card.Body>
                    </Card>
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

export default TutorModulesPage;
