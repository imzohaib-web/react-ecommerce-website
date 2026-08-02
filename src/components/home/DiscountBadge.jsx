import { Sparkles } from 'lucide-react';

/**
 * DiscountBadge component displays a stylized discount percentage badge.
 */
export function DiscountBadge({ discountPercent }) {
  return (
    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md shadow-rose-900/20 tracking-wider">
      <Sparkles size={11} className="animate-pulse" />
      <span>-{discountPercent}% OFF</span>
    </span>
  );
}
