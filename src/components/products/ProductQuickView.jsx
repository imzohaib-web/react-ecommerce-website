import { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';
import { formatMoney } from '../../utils/money';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';

export function ProductQuickView() {
  const { quickViewProduct, setQuickViewProduct } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct.id, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setQuickViewProduct(null)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Stage */}
          <div className="bg-slate-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="max-h-72 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right Column: Info */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block bg-amber-100 text-amber-900 font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border border-amber-300">
                {quickViewProduct.category || 'General'}
              </span>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 leading-tight">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-900">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span>{quickViewProduct.rating.stars}</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  ({quickViewProduct.rating.count} customer reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                  ${formatMoney(quickViewProduct.priceCents)}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  In Stock
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                {quickViewProduct.description ||
                  'High-quality product designed for maximum performance, longevity, and overall customer satisfaction.'}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-amber-500" />
                  <span>Free Express Shipping Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Authentic Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={16} className="text-sky-500" />
                  <span>30-Day Hassle-Free Return Policy</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-slate-100 mt-6">
              <div className="flex items-center gap-2">
                <label htmlFor="modal-qty" className="text-xs font-bold text-slate-700">Qty:</label>
                <select
                  id="modal-qty"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-extrabold transition-all cursor-pointer shadow-md ${
                  isAdded
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                    : 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-amber-400/20 hover:scale-[1.02]'
                }`}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <>
                    <Check size={18} /> Added to Shopping Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
