import React from 'react';
import '../../assets/css/HomeAbout.css';

const HomeAbout = () => {
  // Prevent right-click on the profile image
  const preventRightClick = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <section id="home" className="hero">
      <div className="hero-glow" aria-hidden="true"></div>

      <div className="shell hero-grid">
        <div className="hero-body">
          <h1 className="hero-name">PANG, Zi Yang</h1>

          {/* Opening line — sits above the portrait on mobile */}
          <p className="hero-lede">
            I am a Final Year Computer Science student at HKUST. Academically, I rank in the top 1%
            of undergraduates with a GPA of 4.002/4.3.
          </p>

          {/* Introduction */}
          <div className="hero-intro">
            <p>
              Over the past 3 years, I have completed 4 internships, most recently as a Full-Stack AI
              Engineer building agentic systems on Google Cloud Platform, and held additional
              leadership roles as Lead Webmaster of HKMSA and a Teaching Assistant for C++. In
              addition, I have developed multiple personal projects demonstrating my skills in
              machine learning, frontend, and backend development.
            </p>
            <p>
              Right now, I am working part-time as a Full-Stack AI Engineer at Zonic Tech, building
              the next revolutionary AI video editing system for large-scale video production, and
              serving as a Teaching Assistant for an AI course, helping students grasp core AI
              concepts.
            </p>
            <p>
              Alongside this, I am actively developing new projects with the goal of creating
              meaningful, real-world impact for people. In my free time, you may find me hanging out
              with friends, playing badminton, or expanding my technical and financial knowledge.
            </p>
          </div>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View my work
              <i className="fas fa-arrow-down" aria-hidden="true"></i>
            </a>
            <a
              href={`${process.env.PUBLIC_URL}/resume.pdf`}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-file-arrow-down" aria-hidden="true"></i>
              Résumé
            </a>

            <div className="hero-socials">
              <a
                href="mailto:zypang04@gmail.com"
                className="icon-btn"
                aria-label="Email Zi Yang"
              >
                <i className="fas fa-envelope" aria-hidden="true"></i>
              </a>
              <a
                href="https://github.com/ziyang04"
                className="icon-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <i className="fab fa-github" aria-hidden="true"></i>
              </a>
              <a
                href="https://linkedin.com/in/zi-yang-pang"
                className="icon-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <i className="fab fa-linkedin-in" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Profile image with download prevention */}
        <div className="hero-portrait">
          <div className="portrait-frame">
            <img
              src={require('../../assets/img/DSC00351.JPG')}
              alt="Profile"
              onContextMenu={preventRightClick}
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
