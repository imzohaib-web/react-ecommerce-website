import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

/**
 * HeroContent component renders animated badge, heading, subtitle, and CTA buttons.
 * Re-animates smoothly using Framer Motion on slide index changes.
 */
export function HeroContent({ currentBanner, currentIndex }) {
  const handleScrollTo = (targetId) => {
    if (!targetId) return;
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 700, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="max-w-2xl text-center md:text-left flex flex-col items-center md:items-start"
        >
          {/* Glassmorphism Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-amber-300 text-xs font-extrabold tracking-wider uppercase shadow-md mb-4 sm:mb-6"
          >
            <Sparkles size={14} className="text-amber-400 animate-pulse" />
            <span>{currentBanner.badge || 'MEGA SHOPPING FESTIVAL'}</span>
          </motion.div>

          {/* Main Heading: Fade + Slide Up */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
              exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
            }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-md mb-3 sm:mb-5"
          >
            {currentBanner.title}
          </motion.h1>

          {/* Paragraph: Fade */}
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5, delay: 0.25 } },
              exit: { opacity: 0, transition: { duration: 0.2 } }
            }}
            className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal drop-shadow max-w-xl mb-6 sm:mb-8"
          >
            {currentBanner.subtitle}
          </motion.p>

          {/* CTA Buttons: Scale In */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.4 } },
              exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
            }}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={() => handleScrollTo(currentBanner.primaryLink)}
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-7 py-3.5 rounded-xl shadow-lg shadow-amber-400/25 flex items-center justify-center gap-2.5 hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm sm:text-base group"
            >
              <span>{currentBanner.primaryBtnText || 'Shop Now'}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {currentBanner.secondaryBtnText && (
              <button
                type="button"
                onClick={() => handleScrollTo(currentBanner.secondaryLink)}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/30 backdrop-blur-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm sm:text-base"
              >
                <Zap size={16} className="text-amber-400" />
                <span>{currentBanner.secondaryBtnText}</span>
              </button>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
