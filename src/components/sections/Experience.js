import React from 'react';
import '../../assets/css/Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      position: 'Full-Stack AI Engineer Intern',
      company: 'Zonic Tech',
      location: 'Hong Kong',
      period: 'June 2026 - Present',
      description: '',
      responsibilities: [
        'Owned the entire architectural migration of the AI agent from Vercel and video-analysis from Azure into independent, containerized Google Cloud Run services orchestrated via GCP Pub/Sub and Eventarc, consolidating a fragmented multi-cloud architecture onto Google Cloud Platform, eliminating serverless timeouts and greatly reducing infrastructure cost.',
        'Built the company’s video-editing AI agent on the Claude Agent SDK, engineering the skill library and custom tool suite that let it semantically search and retrieve analyzed footage information from Upstash Vector and Redis, then create edits autonomously.',
        'Scaled agent execution onto Cloud Run Jobs, extending max runtime by 45x to support our clients to process long-form footage.',
        'Secured interest from prospective clients and investors by pitching at an exhibition, receiving positive feedback and trial requests.'
      ]
    },
    {
      id: 2,
      position: 'AI Engineer Intern',
      company: 'Zonic Tech',
      location: 'Hong Kong',
      period: 'June 2025 - Sep 2025',
      description: '',
      responsibilities: [
        'Engineered an AI-powered video editing system that integrates OpenAI’s Large Language Model (LLM) and Retrieval-Augmented Generation with Upstash Vector and Redis for dynamic data retrieval, leveraging LangChain to create an agentic AI workflow that helps users automate the video editing experience and deliver personalized results, enhancing user efficiency and engagement.',
        'Partnered with the CEO to deliver an engaging pitch to potential enterprise clients and investors, showcasing the company’s groundbreaking video understanding model and its innovative applications in AI video editing, resulting in enthusiastic feedback.',
        'Optimised the parameters passed to PySceneDetect’s detect function, achieving a 56% increase in scene detection accuracy.',
        'Built a custom AI state management system using nested React context architecture to replace Vercel’s AI SDK RSC in the company’s codebase, achieving approximately 60% faster client-side updates by shifting state handling to the client-side.'
      ]
    },
    {
      id: 3,
      position: 'Analyst Programmer Intern',
      company: 'Comptify Analytics',
      location: 'Hong Kong',
      period: 'June 2024 - Aug 2024',
      description: '',
      responsibilities: [
        'Spearheaded the development of an SMTP-based email verification tool using Python that identified 60% of invalid email addresses from the online-collected contact list, allowing the company to focus marketing efforts on the remaining 40% of potential clients.',
        'Engineered a full-stack director remuneration analytics platform that leverages market data to analyze compensation trends and deliver data-driven recommendations, empowering over 1,000 existing multinational enterprise clients to access executive pay insights and optimize their pay strategies, generating average fees of USD2,300 each, using .NET, MySQL, jQuery, and Bootstrap.'
      ]
    },
    {
      id: 4,
      position: 'Frontend Developer Intern',
      company: 'Zonic Tech',
      location: 'Hong Kong',
      period: 'Dec 2023 - Jan 2024',
      description: '',
      responsibilities: [
        'Reconstructed the front-end of the website using ReactJS, enhancing user experience through the implementation of an intuitive user interface and the integration of key features utilizing React Material UI & React Storybook.',
        'Contributed to the development process by participating in code reviews, offering constructive feedback for code optimisation.'
      ]
    }
  ];

  return (
    <section id="experience" className="experience-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-5">
            <h2 className="section-title">Work Experience</h2>
            <div className="section-divider"></div>
          </div>
        </div>

        <div className="vertical-timeline">
          {experiences.map((exp) => (
            <div className="experience-item" key={exp.id}>
              <div className="experience-content">
                <div className="experience-header">
                  <h3 className="job-title">{exp.position}</h3>
                  <span className="company">{exp.company}</span>
                  <div className="d-flex justify-content-center">
                    <span className="period me-3">{exp.period}</span>
                    <span className="location">{exp.location}</span>
                  </div>
                </div>
                <div className="experience-body">
                  {exp.description && <p>{exp.description}</p>}
                  {exp.responsibilities.length > 0 && (
                    <ul className="responsibilities">
                      {exp.responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;