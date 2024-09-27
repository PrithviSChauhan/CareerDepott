import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#1e3a8a', // Dark blue background
    color: 'white',
    padding: '40px 0',
    textAlign: 'center',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  };

  const sectionStyle = {
    flex: '1',
    padding: '0 15px',
    marginBottom: '20px',
  };

  const headingStyle = {
    fontSize: '18px',
    marginBottom: '15px',
  };

  const paragraphStyle = {
    fontSize: '14px',
    marginBottom: '20px',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  const hoverLinkStyle = {
    textDecoration: 'underline',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={sectionStyle}>
          <h4 style={headingStyle}>About Career Depott</h4>
          <p style={paragraphStyle}>
            Your go-to platform for career advice, job listings, and growth opportunities. We connect talent with the best employers.
          </p>
        </div>
        <div style={sectionStyle}>
          <h4 style={headingStyle}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="#" style={linkStyle}>Home</a></li>
            <li><a href="#" style={linkStyle}>Jobs</a></li>
            <li><a href="#" style={linkStyle}>Contact Us</a></li>
            <li><a href="#" style={linkStyle}>Privacy Policy</a></li>
          </ul>
        </div>
        <div style={sectionStyle}>
          <h4 style={headingStyle}>Follow Us</h4>
          <a href="#" style={linkStyle}>Facebook </a> | 
          <a href="#" style={linkStyle}> Twitter </a> | 
          <a href="#" style={linkStyle}> LinkedIn </a>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>&copy; 2024 Career Depott. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
