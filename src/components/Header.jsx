import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import { NotificationDropdown } from '../features/notifications/NotificationDropdown';
import { BrandLogo } from './common/BrandLogo';

export function Header() {
  return (
    <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between gap-4">
      <BrandLogo variant="dark" size="small" />

      <div className="flex-1 max-w-md flex items-center bg-slate-800 rounded-xl px-3 py-1.5">
        <input
          className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none"
          type="text"
          placeholder="Search..."
        />
        <button type="button" className="text-slate-400 hover:text-white">
          <Search size={16} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <NotificationDropdown />
        <Link to="/orders" className="text-sm font-semibold text-slate-300 hover:text-white">
          Orders
        </Link>
        <Link to="/checkout" className="flex items-center gap-1 text-sm font-semibold text-amber-400">
          <ShoppingBag size={18} /> Cart
        </Link>
      </div>
    </div>
  );
}
