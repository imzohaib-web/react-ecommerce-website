import { useState, useEffect, useCallback, useRef } from 'react';
import { banners } from '../../data/banners';
import { HeroSlider } from './HeroSlider';
import { HeroContent } from './HeroContent';
import { HeroNavigation } from './HeroNavigation';
import { HeroDots } from './HeroDots';

/**
 * HeroSection is the main hero header component for the ecommerce homepage.
 * Features an automated background slider, smooth fade transitions, Framer Motion text animations,
 * pause-on-hover, preloaded banner images, and full responsiveness.
 */
export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Preload all banner images for instantaneous transitions
  useEffect(() => {
    banners.forEach((banner) => {
      if (banner.image) {
        const img = new Image();
        img.src = banner.image;
      }
      if (banner.fallbackImage) {
        const imgFallback = new Image();
        imgFallback.src = banner.fallbackImage;
      }
    });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  const handleSelectDot = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Automatic slide rotation every 5 seconds (5000ms) unless hovered/paused
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, handleNext]);

  const currentBanner = banners[currentIndex] || banners[0];

  return (
    <section
      className="relative w-full h-[40vh] min-h-[400px] md:h-[50vh] md:min-h-[450px] lg:h-[70vh] lg:min-h-[500px] max-h-[750px] overflow-hidden rounded-b-2xl sm:rounded-b-3xl bg-slate-950 shadow-2xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Homepage Hero Carousel"
    >
      {/* Background Images Slider */}
      <HeroSlider banners={banners} currentIndex={currentIndex} />

      {/* Hero Content (Animated Text, Badge, Buttons) */}
      <HeroContent currentBanner={currentBanner} currentIndex={currentIndex} />

      {/* Prev / Next Navigation Arrows */}
      <HeroNavigation onPrev={handlePrev} onNext={handleNext} />

      {/* Pagination Dots */}
      <HeroDots
        total={banners.length}
        currentIndex={currentIndex}
        onSelectDot={handleSelectDot}
      />
    </section>
  );
}
