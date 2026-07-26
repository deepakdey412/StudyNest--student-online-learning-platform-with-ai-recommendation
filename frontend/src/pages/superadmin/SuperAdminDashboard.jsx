import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Alert, Tabs, Tab } from 'react-bootstrap';
import { FaUserCheck, FaUserClock, FaUserTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import LoadingSpinner from '../../components/LoadingSpinner';
import superAdminService from '../../services/superAdminService';

const SuperAdminDashboard = ({ user, onLogout }) => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      const data = await superAdminService.getAllTutors();
      setTutors(data);
    } catch (error) {
      setError('Failed to fetch tutors');
      console.error('Error fetching tutors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (tutorId) => {
    try {
      setError('');
      setSuccess('');
      await superAdminService.approveTutor(tutorId, 'APPROVED');
      setSuccess('Tutor approved successfully!');
      fetchTutors();
    } catch (error) {
      setError('Failed to approve tutor');
      console.error('Error approving tutor:', error);
    }
  };

  const handleReject = async (tutorId) => {
    try {
      setError('');
      setSuccess('');
      await superAdminService.approveTutor(tutorId, 'REJECTED');
      setSuccess('Tutor rejected successfully!');
      fetchTutors();
    } catch (error) {
      setError('Failed to reject tutor');
      console.error('Error rejecting tutor:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  const pendingTutors = tutors.filter(t => t.approvalStatus === 'PENDING');
  const approvedTutors = tutors.filter(t => t.approvalStatus === 'APPROVED');
  const rejectedTutors = tutors.filter(t => t.approvalStatus === 'REJECTED');

  const stats = [
    {
      icon: FaUserClock,
      title: 'Pending Approval',
      value: pendingTutors.length,
      color: 'warning',
      bgColor: '#FFF3CD'
    },
    {
      icon: FaUserCheck,
      title: 'Approved Tutors',
      value: approvedTutors.length,
      color: 'success',
      bgColor: '#D1E7DD'
    },
    {
      icon: FaUserTimes,
      title: 'Rejected Tutors',
      value: rejectedTutors.length,
      color: 'danger',
      bgColor: '#F8D7DA'
    },
    {
      icon: FaUserCheck,
      title: 'Total Tutors',
      value: tutors.length,
      color: 'primary',
      bgColor: '#CFE2FF'
    }
  ];

  const renderTutorTable = (tutorList) => (
    <Table responsive hover className="align-middle">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Status</th>
          <th>Registered On</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tutorList.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center text-muted py-4">
              No tutors found
            </td>
          </tr>
        ) : (
          tutorList.map((tutor) => (
            <tr key={tutor.id}>
              <td>{tutor.id}</td>
              <td className="fw-semibold">{tutor.name}</td>
              <td>{tutor.email}</td>
              <td>{tutor.mobileNo}</td>
              <td>
                <Badge 
                  bg={
                    tutor.approvalStatus === 'APPROVED' ? 'success' : 
                    tutor.approvalStatus === 'REJECTED' ? 'danger' : 
                    'warning'
                  }
                >
                  {tutor.approvalStatus}
                </Badge>
              </td>
              <td>{new Date(tutor.createdAt).toLocaleDateString()}</td>
              <td>
                {tutor.approvalStatus === 'PENDING' && (
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => handleApprove(tutor.id)}
                    >
                      <FaCheckCircle className="me-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleReject(tutor.id)}
                    >
                      <FaTimesCircle className="me-1" />
                      Reject
                    </Button>
                  </div>
                )}
                {tutor.approvalStatus === 'APPROVED' && (
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleReject(tutor.id)}
                  >
                    <FaTimesCircle className="me-1" />
                    Revoke
                  </Button>
                )}
                {tutor.approvalStatus === 'REJECTED' && (
                  <Button
                    size="sm"
                    variant="outline-success"
                    onClick={() => handleApprove(tutor.id)}
                  >
                    <FaCheckCircle className="me-1" />
                    Approve
                  </Button>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );

  return (
    <div className="d-flex">
      <Sidebar role="SUPER_ADMIN" onLogout={onLogout} user={user} />
      <div style={{ flex: 1, marginLeft: '260px' }}>
        <TopBar user={user} />
        <Container fluid className="p-4" style={{ marginTop: '60px' }}>
          <div className="mb-4">
            <h2 className="mb-1">Super Admin Dashboard</h2>
            <p className="text-muted">Manage tutor approvals and registrations</p>
            
            {/* Testing Note */}
            <div className="alert alert-info mt-3" style={{
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderLeft: '4px solid #3b82f6',
              borderRadius: '8px',
              padding: '12px 16px'
            }}>
              <div className="d-flex align-items-start">
                <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>ℹ️</span>
                <div>
                  <strong style={{ color: '#1e40af' }}>Testing Purpose Only</strong>
                  <p className="mb-0 mt-1" style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    This admin account is provided for demonstration and testing purposes. 
                    In production, admin credentials should be securely managed and not pre-filled.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
          {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

          {/* Stats Cards */}
          <Row className="mb-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Col key={index} xs={12} sm={6} lg={3} className="mb-3">
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-3 p-3 me-3"
                          style={{ backgroundColor: stat.bgColor }}
                        >
                          <Icon size={28} className={`text-${stat.color}`} />
                        </div>
                        <div>
                          <p className="text-muted mb-1 small">{stat.title}</p>
                          <h3 className="mb-0">{stat.value}</h3>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {/* Tutors Table */}
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3"
              >
                <Tab 
                  eventKey="pending" 
                  title={
                    <span>
                      Pending Approval 
                      {pendingTutors.length > 0 && (
                        <Badge bg="warning" className="ms-2">{pendingTutors.length}</Badge>
                      )}
                    </span>
                  }
                >
                  {renderTutorTable(pendingTutors)}
                </Tab>
                <Tab 
                  eventKey="approved" 
                  title={
                    <span>
                      Approved 
                      <Badge bg="success" className="ms-2">{approvedTutors.length}</Badge>
                    </span>
                  }
                >
                  {renderTutorTable(approvedTutors)}
                </Tab>
                <Tab 
                  eventKey="rejected" 
                  title={
                    <span>
                      Rejected 
                      <Badge bg="danger" className="ms-2">{rejectedTutors.length}</Badge>
                    </span>
                  }
                >
                  {renderTutorTable(rejectedTutors)}
                </Tab>
                <Tab 
                  eventKey="all" 
                  title={
                    <span>
                      All Tutors 
                      <Badge bg="primary" className="ms-2">{tutors.length}</Badge>
                    </span>
                  }
                >
                  {renderTutorTable(tutors)}
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
