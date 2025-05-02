import React, { useState, useEffect } from 'react';
import '../../assets/css/Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState('dark'); // Changed initial state to dark
  
  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Initialize theme from localStorage on component mount or use dark as default
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Set dark mode as default if no saved preference
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);
  
  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container">
        <a className="navbar-brand" href="#home">Zi Yang ✞</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#education">Education</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#experience">Experience</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#extracurricular">Extra-Curricular</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projects">Projects</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#skills">Skills</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
            <li className="nav-item">
              <button 
                onClick={toggleTheme} 
                className={`btn btn-sm ${theme === 'dark' ? 'btn-light' : 'btn-dark'} ms-2`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;