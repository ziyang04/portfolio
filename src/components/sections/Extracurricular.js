import React from 'react';
import '../../assets/css/Extracurricular.css';

const Extracurricular = () => {
  const extracurriculars = [
    {
      id: 2,
      position: 'Lead Webmaster',
      company: 'Hong Kong Malaysian Student Association',
      location: 'Hong Kong',
      period: 'Jan 2025 - Dec 2025',
      description: '',
      responsibilities: [
        'Led and collaborated in a 5-developer team to design and deploy an intuitive events page to showcase the organization’s annual events, significantly streamlining information access and enhancing user understanding of organizational initiatives, utilizing Next.js.',
        'Reviewed and debugged Next.js code authored by webmasters, managing Git workflows for clean merges and stable deployments.'
      ]
    },
    {
      id: 3,
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
      id: 4,
      position: 'Internal Vice President',
      company: 'HKUST Southeast Asia Student Association',
      location: 'Hong Kong',
      period: 'Mar 2024 - Mar 2025',
      description: '',
      responsibilities: [
        'Led the coordination with the university administration, including event promotion, proposal development, and collaborative event organization, to successfully host a pre-university arrival program that engaged 60 incoming university students.',
        'Co-led the annual sports day, generating 1,000 HKD in revenue and enhancing community engagement among students.'
      ]
    }
  ];

  return (
    <section id="extracurricular" className="section extracurricular-section">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow">Leadership</p>
          <h2 className="section-title">Extra-Curricular Activities</h2>
        </header>

        <div className="timeline">
          {extracurriculars.map((activity) => (
            <article className="timeline-item" key={activity.id}>
              <div className="timeline-head">
                <h3 className="timeline-role">{activity.position}</h3>
                <div className="meta">
                  <span>{activity.period}</span>
                  <span className="meta-dot" aria-hidden="true"></span>
                  <span>{activity.location}</span>
                </div>
              </div>

              <span className="timeline-org">{activity.company}</span>

              {activity.description && <p className="prose">{activity.description}</p>}

              {activity.responsibilities.length > 0 && (
                <ul className="bullets">
                  {activity.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Extracurricular;
