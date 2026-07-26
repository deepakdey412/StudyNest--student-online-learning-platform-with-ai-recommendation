import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaIdCard, FaGraduationCap, FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '../components/Logo';
import authService from '../services/authService';
import './AuthPages.css';

const StudentRegisterPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    prn: '',
    semester: '',
    email: '',
    password: '',
    mobile: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.registerStudent({
        ...formData,
        semester: parseInt(formData.semester)
      });
      onLogin(response);
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0 auth-card my-5">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="d-flex justify-content-center mb-3">
                    <Logo size="lg" />
                  </div>
                  <h2 className="fw-bold">Student Registration</h2>
                  <p className="text-muted">Create your account to start learning</p>
                </div>

                {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label><FaUser className="me-2" />Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          minLength={2}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label><FaIdCard className="me-2" />Roll Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g., CS2024001"
                          value={formData.rollNo}
                          onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label><FaIdCard className="me-2" />PRN</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g., PRN2024001"
                          value={formData.prn}
                          onChange={(e) => setFormData({ ...formData, prn: e.target.value })}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label><FaGraduationCap className="me-2" />Semester</Form.Label>
                        <Form.Select
                          value={formData.semester}
                          onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                          required
                        >
                          <option value="">Select Semester</option>
                          <option value="2">Semester 2</option>
                          <option value="3">Semester 3</option>
                          <option value="4">Semester 4</option>
                          <option value="5">Semester 5</option>
                          <option value="6">Semester 6</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label><FaEnvelope className="me-2" />Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label><FaLock className="me-2" />Password</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 6 characters"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            minLength={6}
                          />
                          <Button 
                            variant="outline-secondary" 
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label><FaPhone className="me-2" />Mobile Number</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="10 digits"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          required
                          pattern="[0-9]{10}"
                          maxLength={10}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 mb-3 py-3 fw-bold" 
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? 'Creating Account...' : 'Register'}
                  </Button>
                </Form>

                <hr />

                <div className="text-center mt-3">
                  <p>Already have an account? <Link to="/login">Login here</Link></p>
                  <p className="mt-2">Want to register as a tutor? <Link to="/register/tutor">Register as Tutor</Link></p>
                  <Link to="/" className="text-decoration-none">← Back to Home</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentRegisterPage;
