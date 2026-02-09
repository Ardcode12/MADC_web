import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ScrollFrames.css';

const ScrollFrames = () => {
    const containerRef = useRef(null);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [textVisible, setTextVisible] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const animationFrameRef = useRef(null);
    const lastFrameRef = useRef(1);

    // Total number of frames
    const totalFrames = 240;

    // Generate frame path with proper padding
    const getFramePath = (frameNum) => {
        const paddedNum = String(frameNum).padStart(3, '0');
        return `/frames/ezgif-frame-${paddedNum}.jpg`;
    };

    // Preload key frames for performance
    useEffect(() => {
        const preloadKeyFrames = async () => {
            const keyFrames = [1, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240];
            const imagePromises = keyFrames.map(i => {
                const img = new Image();
                img.src = getFramePath(i);
                return new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            });
            await Promise.all(imagePromises);
            setImagesLoaded(true);

            // Load remaining frames in background
            for (let i = 1; i <= totalFrames; i++) {
                if (!keyFrames.includes(i)) {
                    const img = new Image();
                    img.src = getFramePath(i);
                }
            }
        };
        preloadKeyFrames();
    }, []);

    // Scroll handler using requestAnimationFrame
    const handleScroll = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const containerHeight = containerRef.current.offsetHeight;
            const windowHeight = window.innerHeight;

            // Calculate scroll progress through the container
            const scrollStart = rect.top;
            const scrollRange = containerHeight - windowHeight;

            let newFrame = 1;
            let showText = false;

            if (scrollStart > 0) {
                newFrame = 1;
                showText = false;
            } else if (scrollStart <= -scrollRange) {
                newFrame = totalFrames;
                showText = true;
            } else {
                const progress = Math.abs(scrollStart) / scrollRange;
                // Use 85% of scroll for frames, last 15% for text
                const frameProgress = Math.min(progress / 0.85, 1);
                newFrame = Math.max(1, Math.min(totalFrames, Math.floor(frameProgress * totalFrames) + 1));
                showText = progress > 0.8;
            }

            // Update frame
            if (newFrame !== lastFrameRef.current) {
                lastFrameRef.current = newFrame;
                setCurrentFrame(newFrame);
            }
            setTextVisible(showText);
        });
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [handleScroll]);

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
