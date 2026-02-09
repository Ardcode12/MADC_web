import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ScrollFrames.css';

const ScrollFrames = () => {
    const containerRef = useRef(null);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [textVisible, setTextVisible] = useState(false);
    const rafRef = useRef(null);
    const lastFrameRef = useRef(1);

    const totalFrames = 240;

    // Simple frame path generator
    const getFramePath = useCallback((frameNum) => {
        const num = Math.max(1, Math.min(totalFrames, frameNum));
        return `/frames/ezgif-frame-${String(num).padStart(3, '0')}.jpg`;
    }, []);

    // Preload critical frames on mount
    useEffect(() => {
        const criticalFrames = [1, 40, 80, 120, 160, 200, 240];
        criticalFrames.forEach(num => {
            const img = new Image();
            img.src = getFramePath(num);
        });
    }, [getFramePath]);

    // Main scroll handler
    const handleScroll = useCallback(() => {
        // Cancel any pending animation frame
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const containerHeight = containerRef.current.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollRange = containerHeight - windowHeight;

            let frame = 1;
            let showText = false;

            if (rect.top >= 0) {
                // Before the container
                frame = 1;
            } else if (rect.top <= -scrollRange) {
                // Past the container
                frame = totalFrames;
                showText = true;
            } else {
                // Inside the container - calculate progress
                const scrolled = -rect.top;
                const progress = scrolled / scrollRange;
                const frameProgress = Math.min(progress / 0.85, 1);
                frame = Math.floor(frameProgress * (totalFrames - 1)) + 1;
                showText = progress > 0.8;
            }

            // Only update if frame actually changed
            if (frame !== lastFrameRef.current) {
                lastFrameRef.current = frame;
                setCurrentFrame(frame);
            }
            setTextVisible(showText);
        });
    }, []);

    // Set up scroll listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

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
                <div className="frame-image-container">
                    <img
                        src={getFramePath(currentFrame)}
                        alt=""
                        className="frame-image"
                    />
                </div>

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
