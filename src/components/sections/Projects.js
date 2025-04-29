import React, { useState } from 'react';
import '../../assets/css/Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: 'Food Catering Website',
      description: 'A comprehensive web-based food catering platform that streamlined the event planning process by enabling users to effortlessly select customized menu options for large-scale occasions.',
      image: 'project1.jpg',
      category: 'web',
      technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
      liveLink: '#',
      sourceLink: 'https://github.com/ziyang04/Catering-Website'
    }
    // Add more projects here as you develop them
  ];

  const categories = ['all', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="projects-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-5">
            <h2 className="section-title">Projects</h2>
            <div className="section-divider"></div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="project-filters">
              {categories.map((category, index) => (
                <button 
                  key={index}
                  className={`filter-btn ${filter === category ? 'active' : ''}`}
                  onClick={() => setFilter(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                {/* Use an actual image in production or keep placeholder */}
                <div className="project-placeholder">
                  <span>{project.title}</span>
                </div>
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.sourceLink} className="btn btn-sm btn-outline-light" target="_blank" rel="noopener noreferrer">Source Code</a>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span className="tech-tag" key={index}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;