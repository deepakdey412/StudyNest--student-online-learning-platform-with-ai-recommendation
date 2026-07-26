import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '../components/Logo';
import authService from '../services/authService';
import './AuthPages.css';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData);
      onLogin(response);
      
      // Redirect based on role
      if (response.role === 'SUPER_ADMIN') {
        navigate('/superadmin/dashboard');
      } else if (response.role === 'STUDENT') {
        navigate('/student/dashboard');
      } else {
        navigate('/tutor/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    setFormData({ email: 'admin@studynest.com', password: 'admin123' });
  };

  return (
    <div className="auth-page">
      <Container className="py-5">
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 auth-card">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="d-flex justify-content-center mb-3">
                    <Logo size="lg" />
                  </div>
                  <h2 className="fw-bold">Welcome Back!</h2>
                  <p className="text-muted">Login to continue learning</p>
                </div>

                {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label><FaEnvelope className="me-2" />Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label><FaLock className="me-2" />Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="form-control-lg"
                      />
                      <Button 
                        variant="outline-secondary" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="px-3"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 mb-3 py-3 fw-bold" 
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>

                  <Button 
                    variant="outline-danger" 
                    type="button" 
                    className="w-100 mb-3 py-2 fw-bold" 
                    onClick={handleAdminLogin}
                    size="lg"
                  >
                    🔐 Login as Admin
                  </Button>
                </Form>

                <hr />

                <div className="text-center mt-4">
                  <p className="mb-3">Don't have an account?</p>
                  <div className="d-grid gap-2">
                    <Button as={Link} to="/register/student" variant="outline-primary">
                      Register as Student
                    </Button>
                    <Button as={Link} to="/register/tutor" variant="outline-secondary">
                      Register as Tutor
                    </Button>
                  </div>
                </div>

                <div className="text-center mt-4">
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

export default LoginPage;
