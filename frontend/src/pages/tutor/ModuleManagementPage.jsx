import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Badge, Nav } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaBook, FaFilePdf, FaVideo, FaLink } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import LoadingSpinner from '../../components/LoadingSpinner';
import moduleService from '../../services/moduleService';

const ModuleManagementPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentModule, setCurrentModule] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    semester: 2,
    description: '',
    imageUrl: '',
    pdfUrl: '',
    videoLink: '',
    externalLinks: ''
  });

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
      setLoading(true);
      const data = await moduleService.getAllModules();
      setModules(data);
    } catch (error) {
      setError('Failed to fetch modules');
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

  const handleOpenModal = (mode, module = null) => {
    setModalMode(mode);
    setCurrentModule(module);
    
    if (mode === 'edit' && module) {
      setFormData({
        name: module.name || '',
        code: module.code || '',
        semester: module.semester || 2,
        description: module.description || '',
        imageUrl: module.imageUrl || '',
        pdfUrl: module.pdfUrl || '',
        videoLink: module.videoLink || '',
        externalLinks: module.externalLinks || ''
      });
    } else {
      setFormData({
        name: '',
        code: '',
        semester: 2,
        description: '',
        imageUrl: '',
        pdfUrl: '',
        videoLink: '',
        externalLinks: ''
      });
    }
    
    setShowModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentModule(null);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'semester' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (modalMode === 'add') {
        await moduleService.createModule(formData);
        setSuccess('Module created successfully!');
      } else {
        await moduleService.updateModule(currentModule.id, formData);
        setSuccess('Module updated successfully!');
      }
      
      await fetchModules();
      handleCloseModal();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (moduleId, moduleName) => {
    if (window.confirm(`Are you sure you want to delete "${moduleName}"? This will also delete all associated questions.`)) {
      try {
        await moduleService.deleteModule(moduleId);
        setSuccess('Module deleted successfully!');
        await fetchModules();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete module');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="d-flex">
      <Sidebar role="TUTOR" onLogout={onLogout} user={user} />
      <TopBar user={user} />
      <div className="flex-grow-1" style={{ marginLeft: '260px', paddingTop: '60px' }}>
        <Container fluid className="p-4" style={{ maxWidth: '1400px' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold">Module Management</h2>
              <p className="text-muted">Create, edit, and manage course modules</p>
            </div>
            <Button 
              variant="primary" 
              onClick={() => handleOpenModal('add')}
              className="d-flex align-items-center gap-2"
            >
              <FaPlus /> Add New Module
            </Button>
          </div>

          {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}
          {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

          {/* Semester Filter Tabs */}
          <Nav variant="pills" className="mb-4">
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

          {/* Modules Grid */}
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
                    <Card className="border-0 shadow-sm h-100">
                      <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <Badge bg="primary">Semester {module.semester}</Badge>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleOpenModal('edit', module)}
                            >
                              <FaEdit />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleDelete(module.id, module.name)}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </div>
                        
                        <h5 className="fw-bold mb-2">{module.name}</h5>
                        <p className="text-muted small mb-3">{module.code}</p>
                        <p className="text-muted mb-3" style={{ minHeight: '60px', fontSize: '0.9rem' }}>
                          {module.description || 'No description available'}
                        </p>
                        
                        <div className="d-flex flex-column gap-2 small">
                          {module.pdfUrl && (
                            <div className="d-flex align-items-center text-success">
                              <FaFilePdf className="me-2" /> PDF Available
                            </div>
                          )}
                          {module.videoLink && (
                            <div className="d-flex align-items-center text-danger">
                              <FaVideo className="me-2" /> Video Available
                            </div>
                          )}
                          {module.externalLinks && (
                            <div className="d-flex align-items-center text-info">
                              <FaLink className="me-2" /> External Links
                            </div>
                          )}
                          <div className="d-flex align-items-center text-muted">
                            <FaBook className="me-2" /> {module.questionCount} Questions
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline-success" 
                          size="sm" 
                          className="w-100 mt-3"
                          onClick={() => navigate(`/tutor/module/${module.id}`)}
                        >
                          <FaBook className="me-2" /> Manage Questions
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <div className="text-center py-5">
              <FaBook size={64} className="text-muted mb-3" />
              <p className="text-muted">No modules found for this semester</p>
              <Button variant="primary" onClick={() => handleOpenModal('add')}>
                <FaPlus className="me-2" /> Add First Module
              </Button>
            </div>
          )}
        </Container>
      </div>

      {/* Add/Edit Module Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'add' ? 'Add New Module' : 'Edit Module'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Module Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Machine Learning"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Module Code *</Form.Label>
                  <Form.Control
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., CS601"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Semester *</Form.Label>
              <Form.Select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                required
              >
                <option value={2}>Semester 2</option>
                <option value={3}>Semester 3</option>
                <option value={4}>Semester 4</option>
                <option value={5}>Semester 5</option>
                <option value={6}>Semester 6</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of the module"
              />
            </Form.Group>

            <hr />
            <h6 className="mb-3">Learning Resources</h6>

            <Form.Group className="mb-3">
              <Form.Label>PDF URL</Form.Label>
              <Form.Control
                type="url"
                name="pdfUrl"
                value={formData.pdfUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/notes.pdf"
              />
              <Form.Text className="text-muted">
                Link to PDF study materials
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Video Link</Form.Label>
              <Form.Control
                type="url"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleInputChange}
                placeholder="https://youtube.com/watch?v=..."
              />
              <Form.Text className="text-muted">
                YouTube or other video platform link
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>External Links</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="externalLinks"
                value={formData.externalLinks}
                onChange={handleInputChange}
                placeholder="Additional resources (comma-separated URLs)"
              />
              <Form.Text className="text-muted">
                Comma-separated list of additional resource links
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {modalMode === 'add' ? 'Create Module' : 'Update Module'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ModuleManagementPage;
