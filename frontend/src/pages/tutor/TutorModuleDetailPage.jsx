import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form, Alert, Badge, Accordion, Row, Col } from 'react-bootstrap';
import { FaArrowLeft, FaEdit, FaSave, FaTimes, FaBook } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import LoadingSpinner from '../../components/LoadingSpinner';
import moduleService from '../../services/moduleService';
import api from '../../services/api';

const TutorModuleDetailPage = ({ user, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    questionText: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: ''
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [moduleData, questionsData] = await Promise.all([
        moduleService.getModuleById(id),
        api.get(`/questions/module/${id}/with-answers`)
      ]);
      
      setModule(moduleData);
      setQuestions(questionsData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load module data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (question) => {
    setEditingId(question.id);
    setEditForm({
      questionText: question.questionText,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      correctAnswer: question.correctAnswer
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({
      questionText: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: ''
    });
  };

  const handleUpdate = async (questionId) => {
    try {
      await api.put(`/questions/${questionId}`, editForm);
      setSuccess('Question updated successfully!');
      setEditingId(null);
      fetchData(); // Refresh questions
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating question:', error);
      setError('Failed to update question');
      setTimeout(() => setError(''), 3000);
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
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="mb-3"
              onClick={() => navigate('/tutor/manage-modules')}
            >
              <FaArrowLeft className="me-2" /> Back to Modules
            </Button>
            
            <h2 className="fw-bold">{module?.name}</h2>
            <div className="d-flex gap-2 align-items-center">
              <Badge bg="primary">Semester {module?.semester}</Badge>
              <Badge bg="info">{module?.code}</Badge>
              <Badge bg="success">{questions.length} Questions</Badge>
            </div>
            <p className="text-muted mt-2">{module?.description}</p>
          </div>

          {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
          {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

          <h5 className="mb-3"><FaBook className="me-2" />Manage Questions</h5>
          
          <Accordion>
            {questions.map((question, index) => (
              <Accordion.Item key={question.id} eventKey={String(index)}>
                <Accordion.Header>
                  <div className="d-flex w-100 align-items-center justify-content-between pe-3">
                    <span>Question {index + 1}</span>
                    {editingId !== question.id && (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(question);
                        }}
                      >
                        <FaEdit />
                      </Button>
                    )}
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {editingId === question.id ? (
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Question Text *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={editForm.questionText}
                          onChange={(e) => setEditForm({ ...editForm, questionText: e.target.value })}
                        />
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Option 1 *</Form.Label>
                            <Form.Control
                              type="text"
                              value={editForm.option1}
                              onChange={(e) => setEditForm({ ...editForm, option1: e.target.value })}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Option 2 *</Form.Label>
                            <Form.Control
                              type="text"
                              value={editForm.option2}
                              onChange={(e) => setEditForm({ ...editForm, option2: e.target.value })}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Option 3 *</Form.Label>
                            <Form.Control
                              type="text"
                              value={editForm.option3}
                              onChange={(e) => setEditForm({ ...editForm, option3: e.target.value })}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Option 4 *</Form.Label>
                            <Form.Control
                              type="text"
                              value={editForm.option4}
                              onChange={(e) => setEditForm({ ...editForm, option4: e.target.value })}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Correct Answer *</Form.Label>
                        <Form.Select
                          value={editForm.correctAnswer}
                          onChange={(e) => setEditForm({ ...editForm, correctAnswer: e.target.value })}
                        >
                          <option value="">Select correct answer</option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                          <option value="option4">Option 4</option>
                        </Form.Select>
                      </Form.Group>

                      <div className="d-flex gap-2">
                        <Button 
                          variant="success" 
                          onClick={() => handleUpdate(question.id)}
                        >
                          <FaSave className="me-2" /> Save Changes
                        </Button>
                        <Button 
                          variant="secondary" 
                          onClick={handleCancel}
                        >
                          <FaTimes className="me-2" /> Cancel
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    <div>
                      <h6 className="mb-3">{question.questionText}</h6>
                      <div className="mb-3">
                        <div className={`p-2 mb-2 rounded ${question.correctAnswer === 'option1' ? 'bg-success bg-opacity-10 border border-success' : 'bg-light'}`}>
                          <strong>A.</strong> {question.option1} {question.correctAnswer === 'option1' && <Badge bg="success" className="ms-2">Correct</Badge>}
                        </div>
                        <div className={`p-2 mb-2 rounded ${question.correctAnswer === 'option2' ? 'bg-success bg-opacity-10 border border-success' : 'bg-light'}`}>
                          <strong>B.</strong> {question.option2} {question.correctAnswer === 'option2' && <Badge bg="success" className="ms-2">Correct</Badge>}
                        </div>
                        <div className={`p-2 mb-2 rounded ${question.correctAnswer === 'option3' ? 'bg-success bg-opacity-10 border border-success' : 'bg-light'}`}>
                          <strong>C.</strong> {question.option3} {question.correctAnswer === 'option3' && <Badge bg="success" className="ms-2">Correct</Badge>}
                        </div>
                        <div className={`p-2 mb-2 rounded ${question.correctAnswer === 'option4' ? 'bg-success bg-opacity-10 border border-success' : 'bg-light'}`}>
                          <strong>D.</strong> {question.option4} {question.correctAnswer === 'option4' && <Badge bg="success" className="ms-2">Correct</Badge>}
                        </div>
                      </div>
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </div>
    </div>
  );
};

export default TutorModuleDetailPage;
