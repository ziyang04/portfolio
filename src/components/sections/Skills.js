import React from 'react';
import '../../assets/css/Skills.css';

const Skills = () => {
  // Technical skills categorized
  const frontendSkills = [
    'NextJS', 'React', 'Bootstrap', 'Jquery', 'JavaScript', 'TypeScript', 'HTML', 'CSS'
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
  const devTools = ['Firebase', 'Supabase', 'Google Cloud Platform', 'Microsoft Azure', 'Postman API', 'Git'];

  // Interests
  const interests = ['Badminton', 'Music'];

  // Groups rendered as a definition list: label on the left, chips on the right
  const skillGroups = [
    { label: 'Frontend', items: frontendSkills },
    { label: 'Backend', items: backendSkills },
    { label: 'Database', items: databaseSkills },
    { label: 'Developer Tools', items: devTools },
  ];

  return (
    <section id="skills" className="section skills-section">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow">Skills</p>
          <h2 className="section-title">Tools & Technologies</h2>
        </header>

        <dl className="skill-groups">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.label}>
              <dt className="skill-label">{group.label}</dt>
              <dd className="skill-items">
                {group.items.map((skill, index) => (
                  <span className="chip" key={index}>
                    {skill}
                  </span>
                ))}
              </dd>
            </div>
          ))}

          {/* Languages carry a proficiency level alongside the name */}
          <div className="skill-group" key="Languages">
            <dt className="skill-label">Languages</dt>
            <dd className="skill-items">
              {languages.map((lang, index) => (
                <span className="chip language-chip" key={index}>
                  {lang.name}
                  <span className="language-level">{lang.level}</span>
                </span>
              ))}
            </dd>
          </div>

          <div className="skill-group" key="Interests">
            <dt className="skill-label">Interests</dt>
            <dd className="skill-items">
              {interests.map((interest, index) => (
                <span className="chip" key={index}>
                  {interest}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Skills;
