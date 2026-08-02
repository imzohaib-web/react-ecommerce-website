import { Link, useNavigate } from 'react-router-dom';
import { X, Package, ShoppingBag, Heart, Home, Tag } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { BrandLogo } from '../common/BrandLogo';

export function MobileDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { categories, selectedCategory, setSelectedCategory, setSearchTerm, wishlist } = useProducts();
  const { summary, openCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative z-10 w-4/5 max-w-sm h-full bg-slate-900 text-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <BrandLogo variant="dark" size="small" />
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Navigation</div>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-slate-200 hover:text-amber-400 hover:bg-slate-800 transition-colors"
              onClick={onClose}
            >
              <Home size={18} /> Storefront
            </Link>
            <Link
              to="/orders"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-slate-200 hover:text-amber-400 hover:bg-slate-800 transition-colors"
              onClick={onClose}
            >
              <Package size={18} /> My Orders
            </Link>
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-slate-200 hover:text-amber-400 hover:bg-slate-800 transition-colors text-left"
              onClick={() => {
                onClose();
                openCart();
              }}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} /> Cart
              </div>
              <span className="bg-amber-400 text-slate-950 font-bold text-xs px-2 py-0.5 rounded-full">
                {summary.totalQuantity}
              </span>
            </button>
            <div className="flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-slate-200">
              <div className="flex items-center gap-3">
                <Heart size={18} /> Saved Wishlist
              </div>
              <span className="bg-slate-800 text-slate-300 font-bold text-xs px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Filter Categories</div>
            <div className="space-y-1">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSearchTerm('');
                      navigate('/');
                      onClose();
                    }}
                  >
                    <Tag size={14} /> {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
