import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Hero.css';

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const fullText = "Unlock your potential. Build the future.";

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

        // Typing effect
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    };

    return (
        <div className="hero-container">
            {/* Background Video - Place your video in public/videos/hero-bg.mp4 */}
            <div className="hero-video-wrapper">
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/hero-poster.jpg"
                >
                    <source src="/images/bg.mp4" type="video/mp4" />
                    
                   
                </video>
                <div className="hero-video-overlay"></div>
            </div>

            {/* Fallback Background (shown if video doesn't load) */}
            <div className="hero-background">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>

            {/* Floating Particles */}
            <div className="particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>

            {/* Main Content */}
            <div className="hero-content">
                <img src="/images/KEC.png" alt="KEC" className="hero-logo" data-aos="fade-down" />
                <h1 data-aos="fade-up">Mobile App Development Club</h1>
                <p className="hero-subtitle">
                    Where Innovation Meets Excellence
                </p>
                <p className="hero-tagline">
                    {displayText}
                    <span className="typing-cursor"></span>
                </p>
                <div className="hero-btns">
                    
                    <button className="btn btn-outline btn-large" onClick={() => scrollToSection('about')}>
                        Learn More
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <span>Scroll</span>
                <div className="scroll-mouse"></div>
            </div>
        </div>
    );
};

export default Hero;
