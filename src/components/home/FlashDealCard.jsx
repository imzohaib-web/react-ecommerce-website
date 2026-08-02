import { useState } from 'react';
import { Star, ShoppingBag, Check, Truck, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatMoney } from '../../utils/money';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { WishlistButton } from './WishlistButton';
import { DiscountBadge } from './DiscountBadge';
import { ProgressBar } from './ProgressBar';

/**
 * FlashDealCard component renders a premium, highly responsive product card.
 * Features hover zoom, wishlist toggle, stock progress bar, and gradient action button.
 */
export function FlashDealCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { setQuickViewProduct } = useProducts();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product.id || product.name, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const formattedSalePrice = formatMoney(product.priceCents);
  const formattedOriginalPrice = product.originalPriceCents
    ? formatMoney(product.originalPriceCents)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white text-slate-900 rounded-2xl p-4 border border-slate-200/80 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group relative cursor-pointer min-w-[270px] sm:min-w-0 snap-center"
      onClick={() => setQuickViewProduct(product)}
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-square bg-gradient-to-b from-slate-50 to-slate-100/70 rounded-xl overflow-hidden p-4 flex items-center justify-center mb-3.5 border border-slate-100">
        {/* Discount Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <DiscountBadge discountPercent={product.discountPercent || 45} />
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <WishlistButton />
        </div>

        {/* Free Shipping / Stock Tag */}
        {product.freeShipping && (
          <div className="absolute bottom-2.5 left-2.5 z-10 inline-flex items-center gap-1 bg-slate-900/80 backdrop-blur-md text-amber-300 font-bold text-[10px] px-2.5 py-0.5 rounded-md border border-white/10">
            <Truck size={12} className="text-amber-400" />
            <span>Free Express Shipping</span>
          </div>
        )}

        {/* Quick View Hover Trigger overlay */}
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
          <span className="bg-white text-slate-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye size={14} className="text-amber-500" /> Quick View
          </span>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category Label */}
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 mb-1 block">
            {product.category || 'Deal'}
          </span>

          {/* Product Name */}
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 line-clamp-2 leading-snug hover:text-amber-600 transition-colors mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  fill={i < Math.floor(product.rating?.stars || 4.5) ? '#f59e0b' : 'none'}
                  color="#f59e0b"
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-600">
              {product.rating?.stars || 4.5}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              ({product.rating?.count || 120})
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-3.5">
            <span className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              ${formattedSalePrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-xs sm:text-sm text-slate-400 line-through font-medium">
                ${formattedOriginalPrice}
              </span>
            )}
          </div>

          {/* Stock Progress Bar */}
          <div className="mb-4">
            <ProgressBar
              claimedPercent={product.claimedPercent || 75}
              stockLeft={product.stockLeft}
              tag={product.tag}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-extrabold text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-md active:scale-95 ${
            isAdded
              ? 'bg-emerald-500 text-white shadow-emerald-500/25'
              : 'bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-amber-400/25 hover:shadow-lg hover:shadow-amber-400/35 hover:scale-[1.02]'
          }`}
        >
          {isAdded ? (
            <>
              <Check size={16} /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag size={16} /> Claim Deal
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
