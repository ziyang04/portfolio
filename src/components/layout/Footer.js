import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../../assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} Zi Yang — All Rights Reserved
        </p>

        <div className="footer-socials">
          <a
            href="https://github.com/ziyang04"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            aria-label="GitHub profile"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://linkedin.com/in/zi-yang-pang"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            aria-label="LinkedIn profile"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://www.instagram.com/_ziyang04/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            aria-label="Instagram profile"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
