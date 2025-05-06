import React from 'react';
import '../../assets/css/Skills.css';

const Skills = () => {
  // Technical skills categorized
  const frontendSkills = [
    'React', 'Bootstrap', 'Jquery', 'JavaScript', 'TypeScript', 'HTML', 'CSS'
  ];

  const backendSkills = [
    'Flask', '.NET', 'Python', 'C#', 'C++'
  ];
  
  const databaseSkills = [
    'MySQL', 'SQLite', 'PostgreSQL', 'FireStore', 'SQL', 'NoSQL'
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
  const interests = ['Badminton', 'Music'];

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
        <div className="row justify-content-center mb-4">
          <div className="col-lg-12">
            <h3 className="skills-subsection-title text-center mb-3">Frontend</h3>
            <div className="skills-line-container">
              {frontendSkills.map((skill, index) => (
                <div className="skill-button" key={index}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Backend Skills */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-12">
            <h3 className="skills-subsection-title text-center mb-3">Backend</h3>
            <div className="skills-line-container">
              {backendSkills.map((skill, index) => (
                <div className="skill-button" key={index}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Database Skills */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-12">
            <h3 className="skills-subsection-title text-center mb-3">Database</h3>
            <div className="skills-line-container">
              {databaseSkills.map((skill, index) => (
                <div className="skill-button" key={index}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-12">
            <h3 className="skills-subsection-title text-center mb-3">Languages</h3>
            <div className="skills-line-container">
              {languages.map((lang, index) => (
                <div className="language-button" key={index}>
                  <span className="language-name">{lang.name}</span>
                  <span className="language-level">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Developer Tools */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-12">
            <h3 className="skills-subsection-title text-center mb-3">Developer Tools</h3>
            <div className="skills-line-container">
              {devTools.map((tool, index) => (
                <div className="skill-button" key={index}>
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="row justify-content-center mt-4">
          <div className="col-lg-12">
            <h3 className="skills-subsection-title text-center mb-3">Interests</h3>
            <div className="skills-line-container">
              {interests.map((interest, index) => (
                <div className="interest-button" key={index}>
                  {interest}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;