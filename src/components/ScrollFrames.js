import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ScrollFrames.css';

// Cache for preloaded images
const imageCache = new Map();

const ScrollFrames = () => {
    const containerRef = useRef(null);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [textVisible, setTextVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const lastFrameRef = useRef(1);
    const preloadedRef = useRef(false);

    // Total number of frames - use every 2nd frame for smoother network performance
    const totalFrames = 240;
    const frameStep = 2; // Skip every other frame for faster loading on slow networks
    const effectiveFrames = Math.ceil(totalFrames / frameStep);

    // Generate frame path with proper padding
    const getFramePath = useCallback((frameNum) => {
        const actualFrame = Math.min(frameNum, totalFrames);
        const paddedNum = String(actualFrame).padStart(3, '0');
        return `${process.env.PUBLIC_URL || ''}/frames/ezgif-frame-${paddedNum}.jpg`;
    }, []);

    // Preload all frames aggressively
    useEffect(() => {
        if (preloadedRef.current) return;
        preloadedRef.current = true;

        const preloadImage = (frameNum) => {
            return new Promise((resolve) => {
                if (imageCache.has(frameNum)) {
                    resolve();
                    return;
                }
                const img = new Image();
                img.src = getFramePath(frameNum);
                img.onload = () => {
                    imageCache.set(frameNum, img);
                    resolve();
                };
                img.onerror = () => resolve();
            });
        };

        // Load critical frames first (start, middle, end)
        const criticalFrames = [1, 60, 120, 180, 240];

        const loadInOrder = async () => {
            // Load critical frames immediately
            await Promise.all(criticalFrames.map(preloadImage));
            setIsLoading(false);

            // Then load all frames in batches
            const allFrames = [];
            for (let i = 1; i <= totalFrames; i += frameStep) {
                if (!criticalFrames.includes(i)) {
                    allFrames.push(i);
                }
            }

            // Load in small batches to avoid overwhelming network
            const batchSize = 10;
            for (let i = 0; i < allFrames.length; i += batchSize) {
                const batch = allFrames.slice(i, i + batchSize);
                await Promise.all(batch.map(preloadImage));
            }
        };

        loadInOrder();
    }, [getFramePath, frameStep]);

    // Scroll handler with frame snapping
    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const containerHeight = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

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
            const frameProgress = Math.min(progress / 0.85, 1);
            // Snap to frame step for smoother loading
            const rawFrame = Math.floor(frameProgress * effectiveFrames) * frameStep + 1;
            newFrame = Math.max(1, Math.min(totalFrames, rawFrame));
            showText = progress > 0.8;
        }

        // Only update if frame changed
        if (newFrame !== lastFrameRef.current) {
            lastFrameRef.current = newFrame;
            setCurrentFrame(newFrame);
        }
        setTextVisible(showText);
    }, [effectiveFrames, frameStep]);

    // Attach scroll listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <section className="scroll-frames-container" ref={containerRef}>
            <div className="scroll-frames-sticky">
                {/* Loading indicator */}
                {isLoading && (
                    <div className="scroll-loading">
                        <div className="loading-spinner"></div>
                    </div>
                )}

                {/* Frame Image */}
                <div className="frame-image-container">
                    <img
                        src={getFramePath(currentFrame)}
                        alt=""
                        className="frame-image"
                        loading="eager"
                        decoding="sync"
                        fetchpriority="high"
                    />
                </div>

                {/* Text Overlay */}
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
