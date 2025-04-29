import React from 'react';
import '../../assets/css/Education.css';

const Education = () => {
  // Education data
  const educationItems = [
    {
      degree: 'BEng Computer Science + Extended Major in Artificial Intelligence',
      institution: 'The Hong Kong University of Science and Technology (HKUST)',
      location: 'Hong Kong',
      period: 'Sep 2023 – June 2027',
      description: 'First Class Honours (Expected)',
      highlights: [
        'CGPA: 3.943/4.3 | Top 1% of HKUST Undergraduates | 3x Dean\'s List',
        'HKUST Full Scholarship Admission Holder',
        'Relevant Modules: DBMS (A+), Programming with C++ (A+), OOP & Data Structures (A), Applied Statistics (A), Calculus II (A)'
      ]
    },
    {
      degree: 'A-Levels',
      institution: 'Methodist College Kuala Lumpur',
      location: 'Malaysia',
      period: 'Jan 2022 – June 2023',
      description: '',
      highlights: [
        'Computer Science (A*), Further Mathematics (A*), Mathematics(A*), Physics (A*)',
        'Awards: Top in Malaysia in A-Levels Mathematics | Ranked 1st in Computer Science and Mathematics within the cohort'
      ]
    }
  ];

  return (
    <section id="education" className="education-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-5">
            <h2 className="section-title">Education</h2>
            <div className="section-divider"></div>
          </div>
        </div>

        <div className="education-timeline">
          {educationItems.map((edu, index) => (
            <div className="education-item" key={index}>
              <div className="education-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="education-content">
                <div className="education-header">
                  <h3 className="degree">{edu.degree}</h3>
                  <div className="institution">{edu.institution}</div>
                  <div className="education-meta">
                    <span>{edu.period}</span>
                    <span>{edu.location}</span>
                  </div>
                  {edu.description && <p className="mt-2">{edu.description}</p>}
                </div>
                <div className="education-body">
                  <ul className="highlights">
                    {edu.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;