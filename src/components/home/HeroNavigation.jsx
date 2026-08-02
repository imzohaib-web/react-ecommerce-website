import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * HeroNavigation component renders sleek prev/next arrow buttons
 * overlayed on the sides of the hero slider.
 */
export function HeroNavigation({ onPrev, onNext }) {
  return (
    <div className="absolute inset-y-0 inset-x-3 sm:inset-x-6 flex items-center justify-between pointer-events-none z-30">
      {/* Previous Slide Button */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous slide"
        className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/40 hover:bg-slate-900/80 border border-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg group cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Next Slide Button */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/40 hover:bg-slate-900/80 border border-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg group cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
