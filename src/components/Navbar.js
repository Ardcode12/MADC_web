import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    closeMobileMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Show navbar background after 50px scroll
      if (scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide navbar during scroll frames section
      if (location.pathname === '/' && scrollY > viewportHeight * 0.8 && scrollY < viewportHeight * 5.5) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      // Update active section based on scroll position
      const sections = ['contact', 'gallery', 'team', 'events', 'about'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navItems = [
    { id: 'home', label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { id: 'about', label: 'About', action: () => scrollToSection('about') },
    { id: 'team', label: 'Team', action: () => scrollToSection('team') },
    { id: 'gallery', label: 'Gallery', action: () => scrollToSection('gallery') },
    { id: 'contact', label: 'Contact', action: () => scrollToSection('contact') }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'active' : ''} ${hidden ? 'navbar-hidden' : ''}`}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" onClick={() => { closeMobileMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src="/images/img.png" alt="MADC" className="navbar-logo-img" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-links ${activeSection === item.id ? 'highlight' : ''}`}
                onClick={item.action}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="nav-btn">
            
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
