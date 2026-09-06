import React, { useState } from 'react';
import '../../assets/css/Projects.css';

// Projects shown before the visitor asks for more
const VISIBLE_COUNT = 3;

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);

  const projects = [
    {
      id: 9,
      title: 'MatesMarket (HKUST online marketplace)',
      description: 'Engineered a HKUST-exclusive second-hand trading platform using Next.js, TypeScript, Firebase, and TanStack Query, growing to over 150 users within one month of launch. Pitched and presented the application to university officials, securing their support and endorsement for the initiative.',
      role: 'Co-Founder & Full-Stack Developer',
      image: require('../../assets/img/matesmarket.png'),
      category: 'Web',
      technologies: ['Next.js', 'TypeScript', 'Firebase', 'TanStack Query'],
      liveLink: 'https://www.matesmarket.online',
      sourceLink: ''
    },
    {
      id: 1,
      title: 'All-in-One Digitized Learning Hub for Children, Parents, and Teachers',
      description: 'An interactive platform that facilitates learning for children, connects parents with each other and teachers through live chat, and serves as a centralized hub for teachers to manage homework. Featuring an AI-powered homework manager, it enhances collaboration and streamlines the educational experience for all users.',
      role: 'Full Stack Developer',
      image: require('../../assets/img/CodetoGive.png'),
      category: 'Web',
      technologies: ['React', 'TailwindCSS', 'Flask', 'Supabase', 'TypeScript','Python', 'PostgreSQL','Deepseek API'],
      liveLink: '',
      sourceLink: 'https://github.com/ziyang04/Code_to_Give_Project_CARE',
      fullImage: true
    },
    {
      id: 2,
      title: 'Campus Food Delivery App for University Students',
      description: 'A full-stack mobile application designed for university students to order food and have other student deliverers help deliver, featuring browsing, cart, and purchase functionalities. This project is fully developed and waiting to be launched as part of my startup.',
      role: 'Backend Engineer',
      image: require('../../assets/img/FoodMates.png'), // Use require to reference the image
      category: 'App',
      technologies: ['Flask', 'Firebase', 'Supabase', 'PostgreSQL', 'Python', 'SQL', 'Postman', 'Google Cloud Platform'],
      liveLink: '',
      sourceLink: '',
      fullImage: true // Add this flag for FoodMates image
    },
    {
      id: 3,
      title: 'AI-powered News Reporter Agent',
      description: (
        <>
          An LLM-based agentic system that automates the end-to-end workflow of researching and analyzing real-world news, then generates a consolidated PDF report and delivers it to users via email. Built using LangChain and LLM agents, the system employs an agentic workflow that orchestrates multiple tools to perform tasks that typically require 45–70 minutes of manual effort in just 8–13 seconds. The project was completed together with{' '}
          <a href="https://www.tonyyuyiding.com" target="_blank" rel="noopener noreferrer" className="inline-link">
            Tony Ding
          </a>
          .
        </>
      ),
      image: require('../../assets/img/news.png'), // Use require to reference the image
      category: 'AI',
      technologies: ['LangChain', 'Python', 'LLM Agents'],
      liveLink: '',
      sourceLink: '',
      fullImage: true // Add this flag for Pretraining image
    },
    {
      id: 4,
      title: 'Language Model Pretraining',
      description: 'Baby LLaMA2 Pretraining + Data Pipeline: An end-to-end implementation of a language model, building a data preprocessing pipeline from raw web data and pretraining a 42M-parameter LLaMA2 model from scratch.',
      image: require('../../assets/img/Pretraining.jpg'), // Use require to reference the image
      category: 'AI',
      technologies: ['Machine Learning', 'PyTorch', 'Transformers', 'Python', 'Bash'],
      liveLink: '',
      sourceLink: 'https://github.com/ziyang04/LLM_pretraining',
      fullImage: true // Add this flag for Pretraining image
    },
    {
      id: 5,
      title: 'Supervised Fine-Tuning for Small Language Model',
      description: 'Advanced supervised fine-tuning techniques for small language models, specifically targeting the SmolLM2-135M model with conversation-aware training strategies. Implemented sophisticated SFT methodologies to enhance model performance through targeted dataset curation and conversation-aware fine-tuning approaches.',
      image: require('../../assets/img/SFT.png'),
      category: 'AI',
      technologies: ['Machine Learning', 'PyTorch', 'Python', 'Bash'],
      liveLink: '',
      sourceLink: 'https://github.com/ziyang04/Supervised-Fine-Tuning-SFT-for-Language-Models',
      fullImage: true
    },
    {
      id: 6,
      title: 'Property Price Prediction Model',
      description: 'An AI-powered model leveraging the California Housing dataset to predict property prices using advanced regression techniques.',
      image: require('../../assets/img/Property.png'), // Use require to reference the image
      category: 'AI',
      technologies: ['Machine Learning', 'Scikit-learn', 'Keras', 'TensorFlow', 'Numpy', 'Python'],
      liveLink: '',
      sourceLink: 'https://github.com/ziyang04/MLP_project'
        },
        {
      id: 7,
      title: 'Image Classification Model',
      description: 'An AI-powered model utilizing convolutional neural networks (CNN) to classify and categorize various objects with an accuracy as high as 70.3%.',
      image: require('../../assets/img/dataset-cover.jpeg'), // Use require to reference the image
      category: 'AI',
      technologies: ['Machine Learning', 'PyTorch', 'Numpy', 'Python'],
      liveLink: '',
      sourceLink: 'https://github.com/ziyang04/CNN'
    },
    {
      id: 8,
      title: 'Portfolio Website',
      description: 'A personal portfolio showcasing my journey as a junior software engineer, highlighting innovation and design.',
      image: require('../../assets/img/portfolio.png'), 
      category: 'Web',
      technologies: ['React', 'Bootstrap', 'JavaScript', 'HTML', 'CSS'],
      liveLink: 'https://portfolio-5smz8x7qt-zi-yangs-projects-80f09863.vercel.app',
      sourceLink: 'https://github.com/ziyang04/portfolio'
    },
    {
      id: 10,
      title: 'Food Catering Website',
      description: 'A web platform streamlining event planning by enabling users to customize menus for large-scale occasions.',
      image: require('../../assets/img/catering.png'), // Use require to reference the image
      category: 'Web',
      technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
      liveLink: '',
      sourceLink: 'https://github.com/ziyang04/Catering-Website'
    },
    
    // Add more projects here as you develop them
  ];


  const categories = ['all', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  // Collapse back down whenever the category changes
  const selectFilter = (category) => {
    setFilter(category);
    setExpanded(false);
  };

  const visibleProjects = expanded
    ? filteredProjects
    : filteredProjects.slice(0, VISIBLE_COUNT);

  const hiddenCount = filteredProjects.length - VISIBLE_COUNT;

  return (
    <section id="projects" className="section projects-section">
      <div className="shell">
        <header className="section-head projects-head">
          <div>
            <p className="eyebrow">Projects</p>
            <h2 className="section-title">Things I've Built</h2>
          </div>

          {/* Segmented category filter */}
          <div className="project-filters" role="group" aria-label="Filter projects by category">
            {categories.map((category, index) => (
              <button
                type="button"
                key={index}
                className={`filter-btn ${filter === category ? 'is-active' : ''}`}
                onClick={() => selectFilter(category)}
                aria-pressed={filter === category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </header>

        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article className="card project-card" key={project.id}>
              <div className="project-media">
                {/* Display the actual project image, or a placeholder if none is set yet */}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className={project.fullImage ? 'is-contained' : ''}
                  />
                ) : (
                  <div className="project-media-placeholder">
                    <span>{project.title}</span>
                  </div>
                )}
              </div>

              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>

                {project.role && <p className="project-role">{project.role}</p>}

                <p className="project-description">{project.description}</p>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="project-tech">
                    {project.technologies.map((tech, index) => (
                      <span className="chip" key={index}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {(project.sourceLink || project.liveLink) && (
                <footer className="project-links">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
                      Live demo
                    </a>
                  )}
                  {project.sourceLink && (
                    <a
                      href={project.sourceLink}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github" aria-hidden="true"></i>
                      Source code
                    </a>
                  )}
                </footer>
              )}
            </article>
          ))}
        </div>

        {filteredProjects.length > VISIBLE_COUNT && (
          <div className="projects-more">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setExpanded((open) => !open)}
              aria-expanded={expanded}
            >
              {expanded ? 'Show less' : `Show ${hiddenCount} more`}
              <i
                className={`fas fa-chevron-down projects-more-chevron ${
                  expanded ? 'is-open' : ''
                }`}
                aria-hidden="true"
              ></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;