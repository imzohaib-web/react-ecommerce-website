import { useState, useEffect } from 'react';
import { Zap, Clock, ShoppingBag, Check } from 'lucide-react';
import { productsData } from '../../data/productsData';
import { formatMoney } from '../../utils/money';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';

export function FlashDeals() {
  const { addToCart } = useCart();
  const { setQuickViewProduct } = useProducts();
  const [addedMap, setAddedMap] = useState({});

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = productsData.slice(3, 7).map((p, idx) => ({
    ...p,
    discountPercent: 35 + idx * 5,
    claimedPercent: 70 + idx * 6
  }));

  const handleAdd = (productId) => {
    addToCart(productId, 1);
    setAddedMap((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  const formatDigit = (num) => String(num).padStart(2, '0');

  return (
    <section className="mb-12 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 rounded-3xl p-6 sm:p-8 border border-slate-800 text-white shadow-2xl overflow-hidden relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-400 border border-amber-400/30 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Zap size={14} fill="#f59e0b" color="#f59e0b" /> Limited Time Clearance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">24-Hour Flash Deals</h2>
        </div>

        {/* Countdown Box */}
        <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 px-4 py-2.5 rounded-2xl backdrop-blur-sm self-start md:self-auto">
          <Clock size={18} className="text-amber-400" />
          <span className="text-xs font-bold text-slate-300">Ends in:</span>
          <div className="flex items-center gap-1 font-mono font-extrabold text-sm text-amber-400">
            <span className="bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">{formatDigit(timeLeft.hours)}h</span>:
            <span className="bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">{formatDigit(timeLeft.minutes)}m</span>:
            <span className="bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">{formatDigit(timeLeft.seconds)}s</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {dealProducts.map((product) => {
          const isAdded = addedMap[product.id];
          const salePriceCents = Math.round(product.priceCents * (1 - product.discountPercent / 100));

          return (
            <div
              key={product.id}
              className="bg-white text-slate-900 rounded-2xl p-4 border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <span className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full shadow-md z-10">
                -{product.discountPercent}% OFF
              </span>

              <div
                className="w-full h-44 bg-slate-50 rounded-xl overflow-hidden p-3 flex items-center justify-center cursor-pointer mb-3"
                onClick={() => setQuickViewProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div>
                <h3
                  className="font-bold text-sm text-slate-900 line-clamp-2 hover:text-amber-500 transition-colors mb-2 cursor-pointer"
                  onClick={() => setQuickViewProduct(product)}
                >
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-extrabold text-slate-950">${formatMoney(salePriceCents)}</span>
                  <span className="text-xs text-slate-400 line-through">${formatMoney(product.priceCents)}</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>Claimed: {product.claimedPercent}%</span>
                    <span className="text-rose-500">Selling Fast</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${product.claimedPercent}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer shadow-md ${
                    isAdded
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-amber-400/20 hover:scale-[1.02]'
                  }`}
                  onClick={() => handleAdd(product.id)}
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
