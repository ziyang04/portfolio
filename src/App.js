import React from 'react';
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
import Competitions from './components/sections/Competitions';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        {/* Each component renders its own <section id="..."> landmark */}
        <HomeAbout />
        <Education />
        <Experience />
        <Extracurricular />
        <Competitions />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
