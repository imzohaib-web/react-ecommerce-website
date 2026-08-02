import { motion, AnimatePresence } from 'framer-motion';

/**
 * HeroSlider component handles background image crossfading,
 * Ken Burns zoom effect on the active slide, and subtle dark overlay gradient.
 */
export function HeroSlider({ banners, currentIndex }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
      <AnimatePresence mode="popLayout">
        {banners.map((banner, index) => {
          if (index !== currentIndex) return null;

          return (
            <motion.div
              key={banner.id}
              className="absolute inset-0 w-full h-full bg-slate-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              {/* Ken Burns subtle zoom effect on active image */}
              <motion.img
                src={banner.image || banner.fallbackImage}
                alt={banner.alt || banner.title}
                className="w-full h-full object-cover object-center"
                initial={{ scale: 1.0 }}
                animate={{ scale: 1.07 }}
                transition={{ duration: 7, ease: 'linear' }}
                loading="eager"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Subtle dark overlay gradient for readability */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.30) 100%), linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)'
        }}
      />
    </div>
  );
}
