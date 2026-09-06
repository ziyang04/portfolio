import React, { useState, useEffect, useCallback } from 'react';
import '../../assets/css/Navbar.css';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#extracurricular', label: 'Extra-Curricular' },
  { href: '#competitions', label: 'Competitions' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = () => {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);

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

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <a className="nav-brand" href="#home" onClick={closeMenu}>
          Zi Yang <span className="nav-brand-mark">✞</span>
        </a>

        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            onClick={toggleTheme}
            className="icon-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`} aria-hidden="true"></i>
          </button>

          <button
            type="button"
            className="icon-btn nav-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <i className={`fas fa-${menuOpen ? 'xmark' : 'bars'}`} aria-hidden="true"></i>
          </button>
        </div>
      </div>

      {menuOpen && <div className="nav-scrim" onClick={closeMenu} aria-hidden="true" />}
    </header>
  );
};

export default Navbar;
