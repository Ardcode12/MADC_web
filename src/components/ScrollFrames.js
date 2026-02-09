import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ScrollFrames.css';

const ScrollFrames = () => {
    const containerRef = useRef(null);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [textVisible, setTextVisible] = useState(false);
    const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
    const lastFrameRef = useRef(1);

    // Total number of frames
    const totalFrames = 240;

    // Generate frame path with proper padding
    const getFramePath = useCallback((frameNum) => {
        const paddedNum = String(frameNum).padStart(3, '0');
        return `${process.env.PUBLIC_URL || ''}/frames/ezgif-frame-${paddedNum}.jpg`;
    }, []);

    // Preload frames - prioritize first frame, then key frames
    useEffect(() => {
        // Load first frame immediately
        const firstImg = new Image();
        firstImg.src = getFramePath(1);
        firstImg.onload = () => setFirstFrameLoaded(true);
        firstImg.onerror = () => setFirstFrameLoaded(true); // Continue even on error

        // Preload key frames in background
        const keyFrames = [30, 60, 90, 120, 150, 180, 210, 240];
        keyFrames.forEach(i => {
            const img = new Image();
            img.src = getFramePath(i);
        });

        // Load all frames in background after a delay
        const timer = setTimeout(() => {
            for (let i = 1; i <= totalFrames; i++) {
                if (i !== 1 && !keyFrames.includes(i)) {
                    const img = new Image();
                    img.src = getFramePath(i);
                }
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [getFramePath]);

    // Scroll handler - works immediately
    const handleScroll = useCallback(() => {
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
    }, []);

    // Attach scroll listener immediately
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial calculation
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
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
                        loading="eager"
                        decoding="async"
                    />
                </div>

                {/* Text Overlay - Slides in from left at the end */}
                <div className={`text-overlay ${textVisible ? 'visible' : ''}`}>
                    <div className="text-slide-container">
                        <img src={`${process.env.PUBLIC_URL || ''}/images/img.png`} alt="MADC" className="scroll-logo" />
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
