'use client';

import { useState, useEffect } from 'react';

const points = [
  {
    number: 1,
    title: 'Own Your Digital Reputation',
    description:
      'Track, analyze, and elevate how the world sees you online. Repute helps you manage your presence across platforms — all from one powerful dashboard.',
    icon: '📊',
  },
  {
    number: 2,
    title: 'Your Brand. Your Data. One Place.',
    description:
      'Connect your social and content platforms to see real-time insights about your growth, engagement, and reach — without switching tabs.',
    icon: '🚀',
  },
  {
    number: 3,
    title: 'Turn Presence into Impact',
    description:
      'Repute transforms your social metrics into meaningful insights that help you grow your influence and showcase your personal brand effectively.',
    icon: '✨',
  },
];

export function ValueCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % points.length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentPoint = points[currentIndex];

  return (
    <div className="text-center">
      <div
        className={`max-w-[70%] mx-auto relative z-10 transition-all duration-500 ${
          isTransitioning
            ? 'opacity-0 translate-y-4'
            : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-myprimary-gray/90 mb-4 leading-tight">
          {currentPoint.title}
        </h2>

        {/* Description */}
        <p className="text-base text-myprimary-gray/70 leading-relaxed">
          {currentPoint.description}
        </p>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-3 mt-8">
        {points.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-2 h-2 bg-myprimary'
                : 'w-2 h-2 bg-myprimary-gray/50 '
            }`}
            aria-label={`Go to point ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
