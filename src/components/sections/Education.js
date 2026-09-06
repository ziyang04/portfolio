import React, { useState } from 'react';
import '../../assets/css/Education.css';

const Education = () => {
  const [expandedModulesIndex, setExpandedModulesIndex] = useState(null);

  // Toggle modules dropdown for specific education item
  const toggleModules = (index) => {
    if (expandedModulesIndex === index) {
      setExpandedModulesIndex(null);
    } else {
      setExpandedModulesIndex(index);
    }
  };

  // Process highlights to split items with pipe characters into separate list items
  // and format them with proper structure
  const processHighlights = (highlights) => {
    const processedHighlights = [];

    highlights.forEach(highlight => {
      // Check if the highlight contains pipe characters
      if (highlight.includes('|')) {
        // Split by pipe and trim whitespace
        const splitHighlights = highlight.split('|').map(item => item.trim());
        // Add each split item to the array with appropriate formatting
        processedHighlights.push(...splitHighlights.map(item => formatHighlight(item)).filter(Boolean));
      } else {
        // Add the highlight with formatting if not null
        const formatted = formatHighlight(highlight);
        if (formatted) {
          processedHighlights.push(formatted);
        }
      }
    });

    return processedHighlights;
  };

  // Format a highlight by adding structure to it
  const formatHighlight = (highlight) => {
    // Format GPA/CGPA entries
    if (highlight.startsWith('CGPA:')) {
      return <><strong>CGPA:</strong> {highlight.substring(5).trim()}</>;
    }

    // Format awards
    if (highlight.startsWith('Awards:')) {
      return <><strong>Awards:</strong> {highlight.substring(7).trim()}</>;
    }

    // Format Top entries
    if (highlight.startsWith('Top')) {
      return <><strong>Achievement:</strong> {highlight}</>;
    }

    // Format Dean's List
    if (highlight.includes('Dean\'s List')) {
      return <><strong>Recognition:</strong> {highlight}</>;
    }

    // Format scholarship info
    if (highlight.includes('Scholarship')) {
      return <><strong>Scholarship:</strong> {highlight}</>;
    }

    // Format A-Level subjects
    if (highlight.includes('(A*)') || highlight.includes('(A)')) {
      return <><strong>A-Level Results:</strong> {highlight}</>;
    }

    // Format ranked entries
    if (highlight.includes('Ranked')) {
      return <><strong>Class Ranking:</strong> {highlight}</>;
    }

    // Return the highlight as is if no special formatting applies
    return highlight;
  };

  // Education data
  const educationItems = [
    {
      degree: 'BEng Computer Science + Extended Major in Artificial Intelligence',
      institution: 'The Hong Kong University of Science and Technology (HKUST)',
      location: 'Hong Kong',
      period: 'Sep 2023 – June 2027',
      description: 'First Class Honours (Expected)',
      highlights: [
        'CGPA: 4.002/4.3 | Top 1% of HKUST Undergraduates | 6x Dean\'s List',
        'HKUST Full Scholarship Admission Holder'
      ],
      courses: [
        'COMP5621 Computer Networks',
        'COMP4651 Cloud Computing and Big Data Systems',
        'COMP4332 Big Data Mining and Management',
        'COMP4211 Machine Learning',
        'COMP3711 Design and Analysis of Algorithms',
        'COMP3511 Operating Systems',
        'COMP3311 Database Management Systems',
        'COMP3111 Software Engineering',
        'COMP2611 Computer Organization',
        'COMP2211 Exploring Artificial Intelligence',
        'COMP2012 Object Oriented Programming & Data Structures',
        'COMP2011 Programming with C++',
        'COMP1021 Introduction to Computer Science',
        'MATH2411 Applied Statistics',
        'MATH2111 Matrix Algebra and Applications',
        'MATH1014 Calculus II',
        'FINA2203 Fundamentals of Business Finance',
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
      ],
      courses: []
    }
  ];

  return (
    <section id="education" className="section education-section">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow">Education</p>
          <h2 className="section-title">Academic Background</h2>
        </header>

        <div className="education-list">
          {educationItems.map((edu, index) => (
            <article className="card entry-card" key={index}>
              <div className="entry-icon" aria-hidden="true">
                <i className="fas fa-graduation-cap"></i>
              </div>

              <div className="entry-main">
                <div className="entry-head">
                  <h3 className="entry-title">{edu.degree}</h3>
                  <div className="meta">
                    <span>{edu.period}</span>
                    <span className="meta-dot" aria-hidden="true"></span>
                    <span>{edu.location}</span>
                  </div>
                </div>

                <div className="entry-subtitle">{edu.institution}</div>

                {edu.description && (
                  <span className="chip chip-accent education-badge">{edu.description}</span>
                )}

                <ul className="bullets education-highlights">
                  {processHighlights(edu.highlights).map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>

                {edu.courses.length > 0 && (
                  <div className="modules">
                    <button
                      type="button"
                      className="modules-trigger"
                      onClick={() => toggleModules(index)}
                      aria-expanded={expandedModulesIndex === index}
                    >
                      <span>Relevant Courses</span>
                      <span className="modules-count">{edu.courses.length}</span>
                      <i
                        className={`fas fa-chevron-down modules-chevron ${
                          expandedModulesIndex === index ? 'is-open' : ''
                        }`}
                        aria-hidden="true"
                      ></i>
                    </button>

                    {expandedModulesIndex === index && (
                      <div className="modules-grid">
                        {edu.courses.map((course, idx) => (
                          <span className="chip module-item" key={idx}>
                            {course}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
