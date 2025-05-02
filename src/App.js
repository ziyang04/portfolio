import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import HomeAbout from './components/sections/HomeAbout';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Extracurricular from './components/sections/Extracurricular';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <section id="home">
          <HomeAbout />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="extracurricular">
          <Extracurricular />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
