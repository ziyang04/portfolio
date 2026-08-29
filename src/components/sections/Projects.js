import React, { useState } from 'react';
import '../../assets/css/Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
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
      id: 9,
      title: 'MatesMarket',
      description: 'An online marketplace built for the HKUST community, developed and deployed from the ground up with a modular Flask backend on Azure that follows the Model-View-Controller (MVC) design pattern for maintainability. Pitched and presented to university officials, securing their support and endorsement for the initiative.',
      image: require('../../assets/img/matesmarket.png'),
      category: 'Web',
      technologies: ['Flask', 'Microsoft Azure', 'REST API', 'MVC', 'Python'],
      liveLink: 'https://www.matesmarket.online',
      sourceLink: ''
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
                {/* Display the actual project image, or a placeholder if none is set yet */}
                {project.image ? (
                  <img src={project.image} alt={project.title} className={project.fullImage ? 'full-image' : ''} />
                ) : (
                  <div className="project-image-placeholder">
                    <span>{project.title}</span>
                  </div>
                )}
                <div className="project-overlay">
                  <div className="project-links">
                    {project.sourceLink && (
                      <a href={project.sourceLink} className="btn btn-sm btn-outline-light" target="_blank" rel="noopener noreferrer">Source Code</a>
                    )}
                    {project.liveLink && (
                      <a
                          href={project.liveLink}
                          className="btn btn-sm btn-outline-light"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                          Live Demo
                      </a>
                  )}</div>
                </div>
              </div>
              <div className="project-info">
                <h4>{project.title}</h4>
                {project.role && <p className="project-role"><strong>Role:</strong> {project.role}</p>}
                <p>{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="technologies-container">
                    <span className="technologies-label">Technologies I worked with</span>
                    <div className="project-tech">
                      {project.technologies.map((tech, index) => (
                        <span className="tech-tag" key={index}>{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;