import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import Logo from '../components/Logo';
import authService from '../services/authService';
import './AuthPages.css';

const TutorRegisterPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.mobileNo.length !== 10) {
      setError('Mobile number must be 10 digits');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authService.registerTutor(registerData);
      
      // Tutor registration successful but pending approval
      // Don't call onLogin, just show message and redirect
      alert('✅ Registration successful!\n\nYour tutor account has been created and is pending approval.\n\nPlease wait for Super Admin approval before logging in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="auth-page">
      <Container className="py-5">
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0 auth-card">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="d-flex justify-content-center mb-3">
                    <Logo size="lg" />
                  </div>
                  <h2 className="fw-bold">Tutor Registration</h2>
                  <p className="text-muted">Join as a tutor and manage modules</p>
                </div>

                {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label><FaUser className="me-2" />Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label><FaPhone className="me-2" />Mobile Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="mobileNo"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.mobileNo}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label><FaEnvelope className="me-2" />Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label><FaLock className="me-2" />Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Create a password (min 6 characters)"
                      value={formData.password}
                      onChange={handleChange}
                      minLength="6"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label><FaLock className="me-2" />Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button 
                    variant="secondary" 
                    type="submit" 
                    className="w-100 mb-3 py-3 fw-bold" 
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? 'Registering...' : 'Register as Tutor'}
                  </Button>
                </Form>

                <hr />

                <div className="text-center mt-4">
                  <p>Already have an account? <Link to="/login">Login here</Link></p>
                  <p>Want to register as a student? <Link to="/register/student">Register as Student</Link></p>
                </div>

                <div className="text-center mt-3">
                  <Link to="/" className="text-decoration-none">
                    ← Back to Home
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TutorRegisterPage;
