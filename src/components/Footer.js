import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const scrollToSection = (sectionId) => {
        if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="footer-container">
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>Quick Links</h2>
                        <button onClick={() => scrollToSection('home')}>Home</button>
                        <button onClick={() => scrollToSection('about')}>About Us</button>
                        <button onClick={() => scrollToSection('team')}>Our Team</button>
                        <button onClick={() => scrollToSection('gallery')}>Gallery</button>
                        <button onClick={() => scrollToSection('contact')}>Contact</button>
                    </div>
                    <div className="footer-link-items">
                        <h2>Resources</h2>
                        <button onClick={() => scrollToSection('events')}>Events</button>
                        <button onClick={() => scrollToSection('about')}>About MADC</button>
                        <button onClick={() => scrollToSection('team')}>Meet the Team</button>
                        <button onClick={() => scrollToSection('contact')}>Get in Touch</button>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>Get Involved</h2>
                        <button onClick={() => scrollToSection('contact')}>Join the Club</button>
                        <button onClick={() => scrollToSection('contact')}>Become a Mentor</button>
                        <button onClick={() => scrollToSection('contact')}>Partner With Us</button>
                        <button onClick={() => scrollToSection('events')}>Upcoming Events</button>
                    </div>
                    <div className="footer-link-items">
                        <h2>Connect</h2>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
                        <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
                    </div>
                </div>
            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <button className="social-logo" onClick={() => scrollToSection('home')}>
                            <img src="/images/img.png" alt="MADC" className="footer-logo-img" />
                        </button>
                    </div>
                    <small className="website-rights">MADC © {new Date().getFullYear()} | All Rights Reserved</small>
                    <div className="social-icons">
                        <a className="social-icon-link facebook" href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                            <FaFacebook />
                        </a>
                        <a className="social-icon-link instagram" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a className="social-icon-link linkedin" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a className="social-icon-link twitter" href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a className="social-icon-link github" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Footer;
