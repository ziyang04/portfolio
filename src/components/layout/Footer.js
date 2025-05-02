import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../../assets/css/Footer.css';

const Footer = () => {
return (
    <footer className="footer bg-dark text-white py-4" style={{ width: '100%' }}>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <p>© {new Date().getFullYear()} Zi Yang - All Rights Reserved</p>
                </div>
                <div className="col-md-6 text-end">
                    <div className="social-links">
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href="https://linkedin.com/in/zi-yang-pang" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="https://www.instagram.com/_ziyang04/" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);
};

export default Footer;