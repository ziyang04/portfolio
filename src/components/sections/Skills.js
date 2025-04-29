import React from 'react';
import '../../assets/css/Skills.css';

const Skills = () => {
  // Technical skills categorized
  const frontendSkills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 85 },
  ];

  const backendSkills = [
    { name: 'Flask', level: 80 },
    { name: '.NET', level: 75 },
    { name: 'Python', level: 85 },
    { name: 'C#', level: 80 },
    { name: 'C++', level: 90 },
  ];
  
  const databaseSkills = [
    { name: 'MySQL', level: 85 },
    { name: 'SQLite', level: 80 },
    { name: 'PostgreSQL', level: 75 },
    { name: 'FireStore', level: 80 },
    { name: 'SQL', level: 85 },
    { name: 'NoSQL', level: 75 },
  ];

  const languages = [
    { name: 'English', level: 'Native' },
    { name: 'Mandarin', level: 'Fluent' },
    { name: 'Cantonese', level: 'Fluent' },
    { name: 'Malay', level: 'Fluent' },
    { name: 'Hakka', level: 'Basic' },
  ];

  // Developer tools
  const devTools = ['Firebase', 'Supabase', 'Postman API'];
  
  // Interests
  const interests = ['Badminton – Representative of the Computer Science Department of HKUST'];

  return (
    <section id="skills" className="skills-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-5">
            <h2 className="section-title">Skills</h2>
            <div className="section-divider"></div>
          </div>
        </div>

        {/* Frontend Skills */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-6">
            <h3 className="skills-subsection-title text-center mb-4">Frontend</h3>
            <div className="skills-container">
              {frontendSkills.map((skill, index) => (
                <div className="skill-item mb-4" key={index}>
                  <div className="skill-name-level">
                    <h5>{skill.name}</h5>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Skills */}
          <div className="col-lg-6">
            <h3 className="skills-subsection-title text-center mb-4">Backend</h3>
            <div className="skills-container">
              {backendSkills.map((skill, index) => (
                <div className="skill-item mb-4" key={index}>
                  <div className="skill-name-level">
                    <h5>{skill.name}</h5>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Database Skills */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-6">
            <h3 className="skills-subsection-title text-center mb-4">Database</h3>
            <div className="skills-container">
              {databaseSkills.map((skill, index) => (
                <div className="skill-item mb-4" key={index}>
                  <div className="skill-name-level">
                    <h5>{skill.name}</h5>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="col-lg-6">
            <h3 className="skills-subsection-title text-center mb-4">Languages</h3>
            <div className="skills-container">
              {languages.map((lang, index) => (
                <div className="skill-item language-item mb-4" key={index}>
                  <div className="skill-name-level">
                    <h5>{lang.name}</h5>
                    <span className="skill-level">{lang.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Developer Tools */}
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <h3 className="skills-subsection-title text-center mb-4">Developer Tools</h3>
            <div className="tech-icons">
              {devTools.map((tool, index) => (
                <div className="tech-icon" key={index}>{tool}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <h3 className="skills-subsection-title text-center mb-4">Interests</h3>
            <div className="interests-container text-center">
              {interests.map((interest, index) => (
                <div className="interest-item" key={index}>{interest}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;