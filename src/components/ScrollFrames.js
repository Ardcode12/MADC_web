import React, { useEffect, useRef, useState } from 'react';
import './ScrollFrames.css';

const ScrollFrames = () => {
    const containerRef = useRef(null);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [textVisible, setTextVisible] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Total number of frames
    const totalFrames = 240;

    // Generate frame path with proper padding
    const getFramePath = (frameNum) => {
        const paddedNum = String(frameNum).padStart(3, '0');
        return `/frames/ezgif-frame-${paddedNum}.jpg`;
    };

    // Preload images for smooth animation
    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = [];
            for (let i = 1; i <= totalFrames; i++) {
                const img = new Image();
                img.src = getFramePath(i);
                imagePromises.push(
                    new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    })
                );
            }
            await Promise.all(imagePromises);
            setImagesLoaded(true);
        };
        preloadImages();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const containerHeight = containerRef.current.offsetHeight;
            const windowHeight = window.innerHeight;

            // Calculate scroll progress through the container
            const scrollStart = rect.top;
            const scrollRange = containerHeight - windowHeight;

            if (scrollStart > 0) {
                setCurrentFrame(1);
                setTextVisible(false);
            } else if (scrollStart <= -scrollRange) {
                setCurrentFrame(totalFrames);
                setTextVisible(true);
            } else {
                const progress = Math.abs(scrollStart) / scrollRange;
                // Use 85% of scroll for frames, last 15% for text
                const frameProgress = Math.min(progress / 0.85, 1);
                const frame = Math.max(1, Math.min(totalFrames, Math.floor(frameProgress * totalFrames) + 1));
                setCurrentFrame(frame);

                // Show text when we're past 80% scroll
                setTextVisible(progress > 0.8);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="scroll-frames-container" ref={containerRef}>
            <div className="scroll-frames-sticky">
                {/* Frame Image */}
                <div className="frame-image-container">
                    <img
                        src={getFramePath(currentFrame)}
                        alt=""
                        className="frame-image"
                    />
                </div>

                {/* Text Overlay - Slides in from left at the end */}
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
