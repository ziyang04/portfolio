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
        'CGPA: 4.003/4.3 | 5x Dean\'s List',
        'HKUST Full Scholarship Admission Holder'
      ],
      courses: [
        'COMP5621 Computer Networks',
        'COMP3711 Design and Analysis of Algorithms',
        'COMP3511 Operating Systems',
        'COMP3311 Database Management Systems',
        'COMP3111 Software Engineering',
        'COMP2012 Object Oriented Programming & Data Structures',
        'COMP2611 Computer Organization',
        'COMP2211 Exploring Artificial Intelligence',
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
                  <div className="d-flex justify-content-center">
                    <span className="period me-3">{edu.period}</span>
                    <span className="location">{edu.location}</span>
                  </div>
                </div>
                <div className="education-body">
                  {edu.description && (
                    <p className="education-description">{edu.description}</p>
                  )}
                  <ul className="highlights">
                    {processHighlights(edu.highlights).map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                    
                    {edu.courses.length > 0 && (
                      <li>
                        <div className="modules-dropdown-header" onClick={() => toggleModules(index)} 
                             style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                          <strong style={{ textAlign: 'center' }}>Relevant Courses:</strong>
                          <span className={`dropdown-arrow ${expandedModulesIndex === index ? 'expanded' : ''}`}
                                style={{ position: 'absolute', right: 10 }}>
                            <i className={`fas fa-chevron-${expandedModulesIndex === index ? 'up' : 'down'}`}></i>
                          </span>
                        </div>
                        
                        {expandedModulesIndex === index && (
                          <div className="modules-grid">
                            {edu.courses.map((course, idx) => (
                              <div key={idx} className="module-item">
                                <span className="module-name">{course}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </li>
                    )}
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