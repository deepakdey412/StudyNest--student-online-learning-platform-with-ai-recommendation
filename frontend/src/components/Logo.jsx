import './Logo.css';

const Logo = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: '40px',
    md: '60px',
    lg: '80px',
    xl: '120px'
  };

  return (
    <div 
      className={`logo-container ${className}`}
      style={{ 
        width: sizeMap[size], 
        height: sizeMap[size] 
      }}
    >
      <img 
        src="/logo.jpeg" 
        alt="StudyNest Logo" 
        className="logo-image"
      />
    </div>
  );
};

export default Logo;
