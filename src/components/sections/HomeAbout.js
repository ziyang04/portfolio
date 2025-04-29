import React from 'react';
import '../../assets/css/HomeAbout.css';

const HomeAbout = () => {
  return (
    <section id="home" className="home-section">
      <div className="overlay"></div>
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-md-12 text-center">
            <h1 className="display-3 fw-bold">PANG, Zi Yang</h1>
            <h2 className="lead mb-4">Computer Science Student</h2>
            
            {/* Profile image added here */}
            <div className="profile-image-container">
              <div className="profile-image-placeholder">
                <img src={require('../../assets/img/DSC00351.JPG')} alt="Profile" className="img-fluid rounded-circle" />
              </div>
            </div>
            
            <div className="hero-buttons mt-4">
              <a href="#projects" className="btn btn-primary me-3">View Projects</a>
              <a href="#contact" className="btn btn-outline-secondary">Contact Me</a>
              <a href="#" className="btn btn-outline-primary ms-3">Download CV</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;