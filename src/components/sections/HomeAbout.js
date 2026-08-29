import React from 'react';
import '../../assets/css/HomeAbout.css';

const HomeAbout = () => {
  // Prevent right-click on the profile image
  const preventRightClick = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <section id="home" className="home-section">
      <div className="overlay"></div>
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-md-12 text-center">
            <h1 className="display-3 fw-bold">PANG, Zi Yang</h1>
            
            {/* Profile image with download prevention */}
            <div className="profile-image-container">
              <div className="profile-image-placeholder">
                <img 
                  src={require('../../assets/img/DSC00351.JPG')} 
                  alt="Profile" 
                  className="img-fluid rounded-circle" 
                  onContextMenu={preventRightClick}
                  draggable="false"
                />
              </div>
            </div>
            
            {/* Introduction paragraph */}
            <div className="introduction-container">
              <p className="introduction-text">
                <span className="intro-first-line">I am a final-year Computer Science student at HKUST. </span>
                <span className="intro-extended-content">
                  Over the past 3 years, I have completed 4 internships, most recently as a Full-Stack AI Engineer building agentic systems on Google Cloud Platform, and held additional leadership roles as Technical Lead for the Morgan Stanley Code To Give Hackathon, Lead Webmaster of HKMSA, and a Teaching Assistant for C++.
                  In addition, I have developed multiple personal projects demonstrating my skills in machine learning, frontend, and backend development.
                  Academically, I rank in the top 1% of undergraduates with a GPA of 4.002.
                  Currently, I am actively developing new projects with the goal of creating meaningful, real-world impact for people.
                </span>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
