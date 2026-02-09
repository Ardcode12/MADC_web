import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ScrollFrames.css';

const ScrollFrames = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [textVisible, setTextVisible] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const rafRef = useRef(null);

    // Handle video loaded
    const handleVideoLoaded = useCallback(() => {
        setVideoLoaded(true);
        // Set initial frame
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
    }, []);

    // Main scroll handler - scrub through video
    const handleScroll = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
            if (!containerRef.current || !videoRef.current || !videoLoaded) return;

            const rect = containerRef.current.getBoundingClientRect();
            const containerHeight = containerRef.current.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollRange = containerHeight - windowHeight;
            const videoDuration = videoRef.current.duration;

            let progress = 0;
            let showText = false;

            if (rect.top >= 0) {
                // Before the container
                progress = 0;
            } else if (rect.top <= -scrollRange) {
                // Past the container
                progress = 1;
                showText = true;
            } else {
                // Inside the container
                const scrolled = -rect.top;
                progress = scrolled / scrollRange;
                showText = progress > 0.85;
            }

            // Set video time based on scroll progress
            const targetTime = progress * videoDuration * 0.85; // Use 85% of video
            videoRef.current.currentTime = Math.min(targetTime, videoDuration);

            setTextVisible(showText);
        });
    }, [videoLoaded]);

    // Set up scroll listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [handleScroll]);

    return (
        <section className="scroll-frames-container" ref={containerRef}>
            <div className="scroll-frames-sticky">
                {/* Loading indicator */}
                {!videoLoaded && (
                    <div className="scroll-loading">
                        <div className="loading-spinner"></div>
                    </div>
                )}

                {/* Video element for scrubbing */}
                <div className="frame-image-container">
                    <video
                        ref={videoRef}
                        className="frame-video"
                        src="/scroll-animation.mp4"
                        muted
                        playsInline
                        preload="auto"
                        onLoadedData={handleVideoLoaded}
                    />
                </div>

                {/* Text Overlay */}
                <div className={`text-overlay ${textVisible ? 'visible' : ''}`}>
                    <div className="text-slide-container">
                        <img src="/images/img.png" alt="MADC" className="scroll-logo" />
                        <h2 className="slide-text slide-text-1">Mobile</h2>
                        <h2 className="slide-text slide-text-2">App</h2>
                        <h2 className="slide-text slide-text-3">Development</h2>
                        <h2 className="slide-text slide-text-4">Club</h2>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScrollFrames;
