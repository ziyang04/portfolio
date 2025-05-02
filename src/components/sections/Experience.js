import React from 'react';
import '../../assets/css/Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      position: 'Incoming Full Stack AI Engineer Intern',
      company: 'Zonic Tech',
      location: 'Hong Kong',
      period: 'June 2025 - Aug 2025',
      description: 'In charge of backend and API development, AI tool building, integration of video understanding modules, and assisting in real-world deployment and optimization of AI agent workflows.',
      responsibilities: []
    },
    {
      id: 2,
      position: 'Analyst Programmer Intern',
      company: 'Comptify Analytics',
      location: 'Hong Kong',
      period: 'June 2024 - Aug 2024',
      description: '',
      responsibilities: [
        'Spearheaded the development of an SMTP-based email verification tool using Python that identified 60% of invalid email addresses from the online-collected contact list, allowing the company to focus marketing efforts on the remaining 40% of potential clients.',
        'Initiated the development of a full-stack director remuneration analytics platform using .NET framework and C#, integrating jQuery, HTML, Bootstrap and MySQL, leveraging market data to analyse compensation trends and deliver strategic recommendations for clients to optimise their executive pay strategies.',
        'Proposed and executed the launching of a customizable comparison tool enabling clients, comprised of over 1,000 multinational companies, to benchmark their executive compensation against publicly listed companies of their choice, boosting company\'s revenue via a subscription-based model.'
      ]
    },
    {
      id: 3,
      position: 'Frontend Developer Intern',
      company: 'Zonic Tech',
      location: 'Hong Kong',
      period: 'Dec 2023 - Jan 2024',
      description: '',
      responsibilities: [
        'Reconstructed the front-end of the website using ReactJS, enhancing user experience through the implementation of an intuitive user interface and the integration of key features utilizing React Material UI & React Storybook.',
        'Contributed to the development process by participating in code reviews, offering constructive feedback for code optimisation.'
      ]
    }
  ];

  return (
    <section id="experience" className="experience-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-5">
            <h2 className="section-title">Work Experience</h2>
            <div className="section-divider"></div>
          </div>
        </div>

        <div className="vertical-timeline">
          {experiences.map((exp) => (
            <div className="experience-item" key={exp.id}>
              <div className="experience-content">
                <div className="experience-header">
                  <h3 className="job-title">{exp.position}</h3>
                  <span className="company">{exp.company}</span>
                  <div className="d-flex justify-content-center">
                    <span className="period me-3">{exp.period}</span>
                    <span className="location">{exp.location}</span>
                  </div>
                </div>
                <div className="experience-body">
                  {exp.description && <p>{exp.description}</p>}
                  {exp.responsibilities.length > 0 && (
                    <ul className="responsibilities">
                      {exp.responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;