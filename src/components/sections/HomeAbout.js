import React, { useState, useEffect } from 'react';
import '../../assets/css/HomeAbout.css';

const HomeAbout = () => {
  const phrases = ["Child of God...", "Year 2 Computer Science Student...", "Proud Malaysian..."];
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Prevent right-click on the profile image
  const preventRightClick = (e) => {
    e.preventDefault();
    return false;
  };
  
  useEffect(() => {
    const interval = 100; // typing speed in milliseconds
    const deletingInterval = 50; // deleting speed (faster than typing)
    const pauseTime = 1500; // time to pause after fully typing a phrase
    
    const type = () => {
      const currentPhraseText = phrases[currentIndex];
      
      if (isDeleting) {
        // Deleting phase
        setCurrentPhrase(currentPhraseText.substring(0, currentPhrase.length - 1));
        
        // When done deleting
        if (currentPhrase.length === 0) {
          setIsDeleting(false);
          // Move to next phrase
          setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      } else {
        // Typing phase
        setCurrentPhrase(currentPhraseText.substring(0, currentPhrase.length + 1));
        
        // When done typing
        if (currentPhrase === currentPhraseText) {
          // Pause before starting to delete
          setTimeout(() => setIsDeleting(true), pauseTime);
          return;
        }
      }
    };
    
    // Set timer for typing/deleting effect
    const timer = setTimeout(type, isDeleting ? deletingInterval : interval);
    
    return () => clearTimeout(timer);
  }, [currentPhrase, currentIndex, isDeleting, phrases]);

  return (
    <section id="home" className="home-section">
      <div className="overlay"></div>
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-md-12 text-center">
            <h1 className="display-3 fw-bold">PANG, Zi Yang</h1>
            <h2 className="lead mb-4">
              <span className="typing-text">{currentPhrase}</span>
            </h2>
            
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
            
            <div className="hero-buttons mt-4">
              <a href="#projects" className="btn btn-outline-secondary">View Projects</a>
              <a href="#contact" className="btn btn-outline-secondary">Contact Me</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;