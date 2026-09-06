import React from 'react';
import '../../assets/css/Contact.css';

const CONTACT_ITEMS = [
  {
    icon: 'fas fa-map-marker-alt',
    label: 'Location',
    value: 'Hong Kong',
  },
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    value: 'zypang04@gmail.com',
    href: 'mailto:zypang04@gmail.com',
  },
  {
    icon: 'fas fa-phone-alt',
    label: 'Phone',
    value: '+852 95799468',
    href: 'tel:+85295799468',
  },
  {
    icon: 'fab fa-linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/zi-yang-pang/',
    href: 'https://linkedin.com/in/zi-yang-pang/',
    external: true,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="shell contact-grid">
        <header className="section-head contact-intro">
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-lede">
            Feel free to contact me for any work opportunities or collaborations.
          </p>
          <a href="mailto:zypang04@gmail.com" className="btn btn-primary contact-cta">
            <i className="fas fa-envelope" aria-hidden="true"></i>
            Send me an email
          </a>
        </header>

        <ul className="contact-items">
          {CONTACT_ITEMS.map((item) => {
            const content = (
              <>
                <span className="contact-icon" aria-hidden="true">
                  <i className={item.icon}></i>
                </span>
                <span className="contact-text">
                  <span className="contact-label">{item.label}</span>
                  <span className="contact-value">{item.value}</span>
                </span>
              </>
            );

            return (
              <li className="contact-item" key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="contact-link"
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {content}
                  </a>
                ) : (
                  <div className="contact-link is-static">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Contact;
