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
                I’m an incoming penultimate-year Computer Science student at HKUST.
                Over the past two years, I have gained substantial experience, currently serving as a Full-Stack AI Engineer intern while also completing two previous internships where I contributed to diverse full-stack projects. 
                I have worked on multiple personal projects that showcase my skills in machine learning, frontend and backend development. 
                My academic performance places me in the top 1% of undergraduates, with a GPA of 3.96. 
                Beyond academics, I actively participate in extracurricular activities that strengthen my leadership and collaborative skills. 
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;