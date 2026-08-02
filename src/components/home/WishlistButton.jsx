import { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * WishlistButton component renders an interactive heart button
 * with subtle pulse effect on click.
 */
export function WishlistButton({ className = '' }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.8 }}
      onClick={toggleFavorite}
      aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
      className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md ${
        isFavorited
          ? 'bg-rose-500 text-white shadow-rose-500/30'
          : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-500'
      } ${className}`}
    >
      <Heart
        size={16}
        className={`transition-colors ${isFavorited ? 'fill-current' : ''}`}
      />
    </motion.button>
  );
}
