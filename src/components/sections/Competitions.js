import React from 'react';
import '../../assets/css/Competitions.css';

const Competitions = () => {
  const competitions = [
    {
      id: 1,
      name: 'Morgan Stanley Code To Give Hackathon',
      location: 'Hong Kong',
      period: 'Aug 2025',
      highlights: [
        'Led a 6-developer team to build a digitised learning hub for children, parents, and teachers using React, Flask, and PostgreSQL.',
        'Engineered a real-time chat system using React and Supabase to facilitate instant advice-sharing for a community of parents.'
      ]
    }
  ];

  return (
    <section id="competitions" className="section competitions-section">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow">Competitions</p>
          <h2 className="section-title">Hackathons & Competitions</h2>
        </header>

        <div className="competitions-list">
          {competitions.map((competition) => (
            <article className="card entry-card" key={competition.id}>
              <div className="entry-icon" aria-hidden="true">
                <i className="fas fa-trophy"></i>
              </div>

              <div className="entry-main">
                <div className="entry-head">
                  <h3 className="entry-title">{competition.name}</h3>
                  <div className="meta">
                    <span>{competition.period}</span>
                    <span className="meta-dot" aria-hidden="true"></span>
                    <span>{competition.location}</span>
                  </div>
                </div>

                <ul className="bullets competitions-highlights">
                  {competition.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Competitions;
