import { History } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { formatMoney } from '../../utils/money';

export function RecentlyViewed() {
  const { recentlyViewed, setQuickViewProduct } = useProducts();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full">
          <History size={13} /> History
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Recently Viewed</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recentlyViewed.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            onClick={() => setQuickViewProduct(product)}
          >
            <div className="w-full h-28 bg-slate-50 rounded-xl p-2 flex items-center justify-center mb-2 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-amber-500 transition-colors">
                {product.name}
              </h4>
              <span className="text-xs font-extrabold text-slate-950">${formatMoney(product.priceCents)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
