import { ShoppingBag, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * BrandLogo component renders the official SwiftCart text + icon logo.
 * Supports light/dark color variants, responsive sizing, and subtle hover animations.
 */
export function BrandLogo({ variant = 'dark', size = 'normal', showTagline = true, className = '' }) {
  const isDark = variant === 'dark';

  const iconSizes = {
    small: { container: 'w-7 h-7 rounded-lg', bag: 15, spark: 10 },
    normal: { container: 'w-9 h-9 rounded-xl', bag: 19, spark: 12 },
    large: { container: 'w-11 h-11 rounded-2xl', bag: 24, spark: 15 }
  };

  const textSizes = {
    small: 'text-base',
    normal: 'text-xl',
    large: 'text-2xl sm:text-3xl'
  };

  const currentSize = iconSizes[size] || iconSizes.normal;
  const currentTextSize = textSizes[size] || textSizes.normal;

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group cursor-pointer select-none transition-all duration-300 ${className}`}
      aria-label="SwiftCart Home"
    >
      {/* Icon Container with Speed Spark */}
      <div className="relative">
        <div
          className={`${currentSize.container} bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-400/25 group-hover:scale-105 group-hover:-rotate-6 group-hover:shadow-amber-400/45 group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.6)] transition-all duration-300`}
        >
          <ShoppingBag size={currentSize.bag} className="stroke-[2.5]" />
        </div>
        <span className="absolute -top-1 -right-1 bg-slate-950 text-amber-400 rounded-full p-0.5 shadow-sm border border-amber-400/30">
          <Zap size={currentSize.spark} className="fill-amber-400 text-amber-400 animate-pulse" />
        </span>
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight leading-none ${currentTextSize}`}>
          <span className={isDark ? 'text-white group-hover:text-amber-300 transition-colors' : 'text-slate-900 group-hover:text-amber-600 transition-colors'}>
            Swift
          </span>
          <span className="bg-gradient-to-r from-amber-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Cart
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-extrabold tracking-widest text-amber-400 uppercase leading-none mt-1 opacity-90">
            Store 2026
          </span>
        )}
      </div>
    </Link>
  );
}
