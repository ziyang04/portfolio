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

        <div className="row">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p className="mb-4">Feel free to contact me for any work opportunities or collaborations.</p>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Hong Kong</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>zypang04@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+852 95799468</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fab fa-linkedin"></i>
                </div>
                <div>
                  <h4>LinkedIn</h4>
                  <p><a href="https://linkedin.com/in/zi-yang-pang/" target="_blank" rel="noopener noreferrer">linkedin.com/in/zi-yang-pang/</a></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-7">
            <div className="contact-form">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-group">
                      <input type="text" className="form-control" id="name" placeholder="Your Name" />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-group">
                      <input type="email" className="form-control" id="email" placeholder="Your Email" />
                    </div>
                  </div>
                </div>
                
                <div className="form-group mb-4">
                  <input type="text" className="form-control" id="subject" placeholder="Subject" />
                </div>
                
                <div className="form-group mb-4">
                  <textarea className="form-control" id="message" rows="5" placeholder="Your Message"></textarea>
                </div>
                
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;