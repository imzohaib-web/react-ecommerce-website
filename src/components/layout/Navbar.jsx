import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Package, Heart, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { MobileDrawer } from './MobileDrawer';

export function Navbar() {
  const navigate = useNavigate();
  const { summary, openCart } = useCart();
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories, wishlist } = useProducts();
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(localSearch);
    navigate('/');
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    setSearchTerm('');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu size={22} />
          </button>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-amber-400 transition-colors">
                AURA
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-amber-400 -mt-1 uppercase">
                PRO 2026
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <form className="flex-1 max-w-2xl hidden md:flex items-center" onSubmit={handleSearchSubmit}>
            <div className="relative flex-1 flex items-center bg-slate-800/90 border border-slate-700/80 rounded-xl focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all overflow-hidden">
              {/* Category Dropdown */}
              <div className="hidden lg:block border-r border-slate-700/80">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    navigate('/');
                  }}
                  className="bg-transparent text-xs font-semibold text-slate-300 px-3 py-2.5 outline-none cursor-pointer hover:text-white"
                  aria-label="Category select"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-slate-900 text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input field */}
              <div className="relative flex-1 flex items-center px-3">
                <Search size={18} className="text-slate-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={localSearch}
                  onChange={(e) => {
                    setLocalSearch(e.target.value);
                    setSearchTerm(e.target.value);
                  }}
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none py-2"
                />
                {localSearch && (
                  <button
                    type="button"
                    className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="bg-amber-400 text-slate-950 px-5 py-2.5 font-bold text-xs uppercase tracking-wider hover:bg-amber-500 transition-colors cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          {/* Nav Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/orders"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
            >
              <Package size={20} />
              <span className="hidden lg:inline">Orders</span>
            </Link>

            <div
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all cursor-pointer relative"
              title="Saved Wishlist"
            >
              <div className="relative">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline">Saved</span>
            </div>

            <button
              type="button"
              className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-md shadow-amber-400/20 hover:shadow-lg hover:shadow-amber-400/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              onClick={openCart}
              aria-label="Open Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag size={20} />
                {summary.totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-slate-950 text-amber-400 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-amber-400">
                    {summary.totalQuantity}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      <MobileDrawer isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
