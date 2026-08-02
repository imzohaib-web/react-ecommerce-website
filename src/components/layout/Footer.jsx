import { Sparkles, ShieldCheck, Truck, RotateCcw, ArrowUp, Globe, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 font-sans">
      {/* Back to top banner */}
      <button
        type="button"
        className="w-full bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-amber-400 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b border-slate-800 transition-colors cursor-pointer"
        onClick={scrollToTop}
      >
        <ArrowUp size={14} /> Back to top
      </button>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <Sparkles size={18} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">AURA</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The next-generation ecommerce platform crafted for seamless shopping, instant fulfillment, and premium product discovery.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-400/50 flex items-center justify-center transition-all cursor-pointer" title="Global Store">
                <Globe size={18} />
              </span>
              <span className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-400/50 flex items-center justify-center transition-all cursor-pointer" title="Share App">
                <Share2 size={18} />
              </span>
              <span className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-400/50 flex items-center justify-center transition-all cursor-pointer" title="Favorites">
                <Heart size={18} />
              </span>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Shop Collections</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Clothing & Apparel</Link></li>
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home & Kitchen</Link></li>
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Sports & Outdoors</Link></li>
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Shoes & Footwear</Link></li>
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Fashion Accessories</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Customer Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/orders" className="hover:text-amber-400 transition-colors">Track Order Status</Link></li>
              <li><Link to="/checkout" className="hover:text-amber-400 transition-colors">Review Shopping Cart</Link></li>
              <li><a href="#returns" className="hover:text-amber-400 transition-colors">30-Day Easy Returns</a></li>
              <li><a href="#shipping" className="hover:text-amber-400 transition-colors">Shipping & Delivery</a></li>
              <li><a href="#help" className="hover:text-amber-400 transition-colors">Help & FAQs</a></li>
            </ul>
          </div>

          {/* Col 4: Store Guarantees */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Store Guarantees</h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 p-2.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <Truck size={18} className="text-amber-400 flex-shrink-0" />
                <div className="text-xs">
                  <strong className="block text-white">Free Express Shipping</strong>
                  <span className="text-slate-400">On all orders over $25</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <ShieldCheck size={18} className="text-emerald-400 flex-shrink-0" />
                <div className="text-xs">
                  <strong className="block text-white">256-Bit SSL Protection</strong>
                  <span className="text-slate-400">Encrypted checkout</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <RotateCcw size={18} className="text-sky-400 flex-shrink-0" />
                <div className="text-xs">
                  <strong className="block text-white">30-Day Money Back</strong>
                  <span className="text-slate-400">Hassle-free guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} AURA Ecommerce. Designed for modern web standard 2026.</p>
      </div>
    </footer>
  );
}
