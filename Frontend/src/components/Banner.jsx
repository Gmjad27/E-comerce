import React, { useEffect, useRef, useState } from "react";


export default function Banner({
    images = [],
    interval = 3000,
    pauseOnHover = true,
    showDots = true,
    className = "",
}) {
    const [index, setIndex] = useState(0);
    const timerRef = useRef(null);
    const pausedRef = useRef(false);
    const containerRef = useRef(null);
    const length = images.length;

    const next = () => setIndex((prev) => (prev + 1) % length);
    const prev = () => setIndex((prev) => (prev - 1 + length) % length);

    useEffect(() => {
        if (length <= 1) return;

        const start = () => {
            stop();
            timerRef.current = setInterval(() => {
                if (!pausedRef.current) next();
            }, interval);
        };

        const stop = () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };

        start();
        return stop;
    }, [length, interval]);

    // Pause on hover
    useEffect(() => {
        const node = containerRef.current;
        if (!node || !pauseOnHover) return;

        const onEnter = () => (pausedRef.current = true);
        const onLeave = () => (pausedRef.current = false);

        node.addEventListener("mouseenter", onEnter);
        node.addEventListener("mouseleave", onLeave);
        return () => {
            node.removeEventListener("mouseenter", onEnter);
            node.removeEventListener("mouseleave", onLeave);
        };
    }, [pauseOnHover]);

    if (length === 0) return null;

    return (
        <div
            className={`banner-container ${className}`}
            ref={containerRef}
            tabIndex={0}
        >
            <div
                className="banner-track"
                style={{
                    transform: `translateX(-${index * 100}%)`,
                }}
            >
                {images.map((img, i) => (
                    <div key={i} className="banner-slide">
                        <img
                            src={img.src || img}
                            alt={img.alt || `Slide ${i + 1}`}
                            className="banner-image"
                        />
                        <div className="details">

                            <h1>{img.title}</h1>
                            <p>{img.subtitle}</p>
                            <button>{img.buttonText}</button>
                        </div>
                    </div>

                ))}

            </div>

            {/* Navigation buttons */}
            <button className="banner-btn prev" onClick={prev}>
                ‹
            </button>
            <button className="banner-btn next" onClick={next}>
                ›
            </button>

            {/* Dots */}
            {showDots && (
                <div className="banner-dots">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            className={`dot ${i === index ? "active" : ""}`}
                            onClick={() => setIndex(i)}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
}
