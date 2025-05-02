import React from 'react';
import '../../assets/css/Extracurricular.css';

const Extracurricular = () => {
  const extracurriculars = [
    {
      id: 1,
      position: 'Undergraduate Teaching Assistant',
      company: 'HKUST Computer Science Department',
      location: 'Hong Kong',
      period: 'Jan 2025 - Present',
      description: '',
      responsibilities: [
        'Provided guidance on C++ syntax and programming logic to 510 students in the Programming with C++ course, while assisting them in comprehending core computer science concepts, including pointers, dynamic memory allocation, object-oriented programming, and data structures.'
      ]
    },
    {
      id: 2,
      position: 'Lead Webmaster',
      company: 'Hong Kong Malaysian Student Association',
      location: 'Hong Kong',
      period: 'Dec 2024 - Present',
      description: '',
      responsibilities: [
        'Led a team of 5 developers to revamp the web application by updating and creating profiles for board members, enhancing user information accessibility using ReactJS'
      ]
    },
    {
      id: 3,
      position: 'Internal Vice President',
      company: 'HKUST Southeast Asia Student Association',
      location: 'Hong Kong',
      period: 'Mar 2024 - Present',
      description: '',
      responsibilities: [
        'Led the coordination with the university administration, including event promotion, proposal development, and collaborative event organization, to successfully host a pre-university arrival program that engaged 60 incoming university students.',
        'Co-led the annual sports day, generating 1,000 HKD in revenue and enhancing community engagement among students.'
      ]
    }
  ];

  return (
    <section id="extracurricular" className="extracurricular-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-5">
            <h2 className="section-title">Extra-Curricular Activities</h2>
            <div className="section-divider"></div>
          </div>
        </div>

        <div className="vertical-timeline">
          {extracurriculars.map((activity) => (
            <div className="extracurricular-item" key={activity.id}>
              <div className="extracurricular-content">
                <div className="extracurricular-header">
                  <h3 className="role-title">{activity.position}</h3>
                  <span className="organization">{activity.company}</span>
                  <div className="d-flex justify-content-center">
                    <span className="period me-3">{activity.period}</span>
                    <span className="location">{activity.location}</span>
                  </div>
                </div>
                <div className="extracurricular-body">
                  {activity.description && <p>{activity.description}</p>}
                  {activity.responsibilities.length > 0 && (
                    <ul className="responsibilities">
                      {activity.responsibilities.map((responsibility, index) => (
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

export default Extracurricular;