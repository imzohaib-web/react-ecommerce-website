import { Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { flashDealsData } from '../../data/flashDeals';
import { FlashDealCard } from './FlashDealCard';
import { CountdownTimer } from './CountdownTimer';

/**
 * FlashDealsSection component renders the complete 24-Hour Flash Deals section.
 * Features a soft dark gradient background, countdown timer, header with badge,
 * "View All Flash Deals ->" button, and responsive grid/carousel layout.
 */
export function FlashDealsSection() {
  const handleViewAll = () => {
    const catalog = document.querySelector('#catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 900, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      id="flash-deals"
      className="mb-14 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 border border-slate-800/80 text-white shadow-2xl overflow-hidden relative"
    >
      {/* Background ambient glowing spheres */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10 relative z-10">
        <div className="max-w-2xl">
          {/* Small Glowing Badge */}
          <div className="inline-flex items-center gap-1.5 bg-amber-400/10 text-amber-400 border border-amber-400/25 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-sm backdrop-blur-md">
            <Zap size={14} className="text-amber-400 fill-amber-400 animate-pulse" />
            <span>Limited Time Clearance</span>
          </div>

          {/* Title & View All Button Row */}
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              24-Hour Flash Deals
            </h2>

            <button
              type="button"
              onClick={handleViewAll}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors group cursor-pointer"
            >
              <span>View All Flash Deals</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Grab exclusive discounts on fashion, footwear, electronics, and home essentials before they're gone.
          </p>
        </div>

        {/* Countdown Timer (Right) */}
        <CountdownTimer />
      </div>

      {/* Product Cards: Desktop (4 Grid), Tablet (2 Grid), Mobile (Horizontal Swipe Carousel) */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible relative z-10 scrollbar-none">
        {flashDealsData.map((product, index) => (
          <FlashDealCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
