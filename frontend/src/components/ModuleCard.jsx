import { Card, Badge, Button } from 'react-bootstrap';
import { FaBook, FaVideo, FaFilePdf, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ModuleCard.css';

const ModuleCard = ({ module, role, userSemester }) => {
  const navigate = useNavigate();

  const isEligible = !userSemester || userSemester >= module.semester;

  const handleStartTest = () => {
    if (!isEligible) {
      alert(`You are not eligible for this test. This module is for Semester ${module.semester}, but you are in Semester ${userSemester}.`);
      return;
    }
    navigate(`/student/test/${module.id}`);
  };

  const handleViewModule = () => {
    navigate(`/student/module/${module.id}`);
  };

  return (
    <Card className="module-card h-100 shadow-sm card-hover" style={{ 
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb'
    }}>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Card.Title className="mb-2">{module.name}</Card.Title>
            <Badge bg="primary" className="me-2">
              Semester {module.semester}
            </Badge>
            <Badge bg="info">10 Questions</Badge>
          </div>
          <FaBook size={30} className="text-primary" />
        </div>

        <Card.Text 
          className="text-muted mb-3" 
          style={{ 
            minHeight: '80px',
            maxHeight: '80px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {module.description || 'Complete module with study materials and practice tests.'}
        </Card.Text>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {module.videoLink && (
            <Button
              variant="outline-danger"
              size="sm"
              href={module.videoLink}
              target="_blank"
              className="d-flex align-items-center"
            >
              <FaVideo className="me-1" /> Video
            </Button>
          )}
          {module.pdfUrl && (
            <Button
              variant="outline-success"
              size="sm"
              href={module.pdfUrl}
              target="_blank"
              className="d-flex align-items-center"
            >
              <FaFilePdf className="me-1" /> PDF
            </Button>
          )}
          {module.externalLinks && (
            <Button
              variant="outline-info"
              size="sm"
              href={module.externalLinks}
              target="_blank"
              className="d-flex align-items-center"
            >
              <FaExternalLinkAlt className="me-1" /> Resources
            </Button>
          )}
        </div>

        <div className="d-grid gap-2 mt-auto">
          {role === 'STUDENT' && (
            <>
              <Button variant="primary" onClick={handleViewModule}>
                View Module
              </Button>
              {isEligible ? (
                <Button 
                  variant="success" 
                  onClick={handleStartTest}
                >
                  <FaPlay className="me-2" />
                  Start Test
                </Button>
              ) : (
                <div className="position-relative">
                  <Button 
                    variant="secondary" 
                    onClick={handleStartTest}
                    className="w-100"
                    disabled
                  >
                    🔒 Locked - Semester {module.semester}
                  </Button>
                  <small className="text-muted d-block text-center mt-1">
                    Available when you reach Sem {module.semester}
                  </small>
                </div>
              )}
            </>
          )}
          {role === 'TUTOR' && (
            <Button variant="primary" onClick={() => navigate(`/tutor/module/${module.id}`)}>
              View Questions
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ModuleCard;
