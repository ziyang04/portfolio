import React from 'react';
import '../../assets/css/Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-5">
            <h2 className="section-title">Contact Me</h2>
            <div className="section-divider"></div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-info">
              <h3 className="text-center">Get In Touch</h3>
              <p className="text-center mb-5">Feel free to contact me for any work opportunities or collaborations.</p>
              
              <div className="contact-items-container">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Location</h4>
                    <p>Hong Kong</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <p>zypang04@gmail.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Phone</h4>
                    <p>+852 95799468</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fab fa-linkedin"></i>
                  </div>
                  <div className="contact-details">
                    <h4>LinkedIn</h4>
                    <p><a href="https://linkedin.com/in/zi-yang-pang/" target="_blank" rel="noopener noreferrer">linkedin.com/in/zi-yang-pang/</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;