/**
 * HeroDots component renders interactive pagination dots at the bottom center of the Hero.
 * Highlights the active index with a smooth expanded pill style.
 */
export function HeroDots({ total, currentIndex, onSelectDot }) {
  return (
    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10 shadow-lg">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === currentIndex;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelectDot(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              isActive
                ? 'w-7 sm:w-8 bg-amber-400 shadow-sm shadow-amber-400/50'
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        );
      })}
    </div>
  );
}
