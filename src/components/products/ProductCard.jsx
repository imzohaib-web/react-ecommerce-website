import { useState } from 'react';
import { ShoppingBag, Eye, Star, Check, Heart, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatMoney } from '../../utils/money';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';

export function ProductCard({ product }) {
  const { addToCart, buyNow } = useCart();
  const { setQuickViewProduct, wishlist, toggleWishlist } = useProducts();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const isWishlisted = wishlist.includes(product.id);

  // Derive Brand
  const getBrand = (p) => {
    if (p.category === 'Sports & Outdoors' || p.keywords?.includes('sports')) return 'Aura Sport';
    if (p.category === 'Fashion Accessories') return 'Aura Luxe';
    if (p.category === 'Home & Kitchen') return 'Aura Home';
    if (p.category === 'Shoes & Footwear') return 'Aura Motion';
    return 'Aura Essentials';
  };

  const brandName = getBrand(product);

  // Infer Color Options
  const availableColors = (() => {
    const nameLower = product.name.toLowerCase();
    if (nameLower.includes('black') || nameLower.includes('gray') || nameLower.includes('white')) {
      return [
        { name: 'Black', hex: '#000000' },
        { name: 'Gray', hex: '#64748b' },
        { name: 'White', hex: '#ffffff' }
      ];
    }
    if (nameLower.includes('teal') || nameLower.includes('pink') || nameLower.includes('blue') || nameLower.includes('beige')) {
      return [
        { name: 'Teal', hex: '#0d9488' },
        { name: 'Pink', hex: '#ec4899' },
        { name: 'Beige', hex: '#d97706' }
      ];
    }
    return [
      { name: 'Standard', hex: '#3b82f6' },
      { name: 'Dark Mode', hex: '#0f172a' }
    ];
  })();

  // Infer Size Options
  const isApparelOrShoes =
    product.category === 'Clothing & Apparel' ||
    product.category === 'Shoes & Footwear' ||
    product.keywords?.includes('socks') ||
    product.keywords?.includes('tshirts') ||
    product.keywords?.includes('shoes');

  const availableSizes = isApparelOrShoes
    ? product.category === 'Shoes & Footwear'
      ? ['8', '9', '10', '11']
      : ['S', 'M', 'L', 'XL']
    : null;

  // Stock status logic
  const isLowStock = product.rating.count < 100;
  const stockText = isLowStock ? 'Low Stock - 3 left' : 'In Stock';

  // Slashed price & discount percentage
  const discountPercent = 20; // 20% OFF
  const originalPriceCents = Math.round(product.priceCents / (1 - discountPercent / 100));

  // Image Zoom Magnifier Handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    const colorVal = selectedColor || availableColors[0]?.name;
    const sizeVal = availableSizes ? (selectedSize || availableSizes[0]) : null;

    addToCart(product.id, quantity, colorVal, sizeVal);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const handleBuyNow = () => {
    const colorVal = selectedColor || availableColors[0]?.name;
    const sizeVal = availableSizes ? (selectedSize || availableSizes[0]) : null;

    buyNow(product.id, quantity, colorVal, sizeVal);
  };

  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group relative">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between p-3.5 pb-2 z-10">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 border border-amber-300 uppercase tracking-wider px-2 py-0.5 rounded-md">
            {brandName}
          </span>
          {product.category && (
            <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
              {product.category}
            </span>
          )}
        </div>

        <button
          type="button"
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-rose-50 border-rose-200 text-rose-500 scale-105'
              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50'
          }`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Wishlist"
          title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
        >
          <Heart size={15} fill={isWishlisted ? '#f43f5e' : 'none'} />
        </button>
      </div>

      {/* Image Stage & Zoom Lens */}
      <div
        className="relative w-full h-52 bg-slate-50 overflow-hidden cursor-pointer flex items-center justify-center"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setQuickViewProduct(product)}
      >
        {/* Floating Discount Badge */}
        <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-full shadow-md z-10">
          -{discountPercent}% OFF
        </span>

        {/* Product Image */}
        <div className="w-full h-full p-4 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain transition-transform duration-200 ease-out pointer-events-none"
            style={
              isZoomed
                ? {
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    transform: 'scale(1.8)'
                  }
                : { transform: 'scale(1)' }
            }
            loading="lazy"
          />
        </div>

        {/* Hover Quick View Button */}
        <button
          type="button"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg transition-all duration-300 hover:bg-amber-400 hover:text-slate-950 z-10"
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
        >
          <Eye size={14} /> Quick View
        </button>
      </div>

      {/* Content & Details */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating & Stock */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md text-[11px]">
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span className="font-extrabold text-amber-900">{product.rating.stars}</span>
            <span className="text-amber-700/80">({product.rating.count})</span>
          </div>

          <div
            className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
              isLowStock
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
          >
            {isLowStock ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
            <span>{stockText}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-bold text-sm text-slate-900 hover:text-amber-500 transition-colors line-clamp-2 min-h-[2.6rem] mb-3 cursor-pointer"
          onClick={() => setQuickViewProduct(product)}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Pricing Row */}
        <div className="flex items-baseline justify-between gap-2 mb-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold text-slate-950 tracking-tight">
              ${formatMoney(product.priceCents)}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ${formatMoney(originalPriceCents)}
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
            Save ${formatMoney(originalPriceCents - product.priceCents)}
          </span>
        </div>

        {/* Swatches Container */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 space-y-2 mb-4">
          {/* Colors */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 min-w-[36px]">Color:</span>
            <div className="flex items-center gap-1.5">
              {availableColors.map((color) => {
                const isSelected = (selectedColor || availableColors[0].name) === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                      isSelected ? 'ring-2 ring-amber-400 scale-125 border-slate-950' : 'border-slate-300 hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  />
                );
              })}
            </div>
          </div>

          {/* Sizes */}
          {availableSizes && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 min-w-[36px]">Size:</span>
              <div className="flex items-center gap-1">
                {availableSizes.map((sz) => {
                  const isSelected = (selectedSize || availableSizes[0]) === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-400'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                      }`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Actions Bar */}
        <div className="mt-auto flex items-center gap-2">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="px-2 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 bg-white cursor-pointer outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Quantity"
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <div className="flex-1 grid grid-cols-2 gap-1.5">
            <button
              type="button"
              className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isAdded
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md'
              }`}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : (
                <>
                  <ShoppingBag size={14} /> Add
                </>
              )}
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md shadow-amber-400/20 hover:shadow-lg hover:shadow-amber-400/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              onClick={handleBuyNow}
            >
              <Zap size={13} fill="#0f172a" /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
