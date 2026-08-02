import { Shirt, Flame, Dumbbell, Footprints, Sparkles, Home } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export function FeaturedCategories() {
  const { setSelectedCategory, setSearchTerm } = useProducts();

  const categoryItems = [
    {
      name: "Clothing & Apparel",
      icon: <Shirt size={24} />,
      count: "12+ Items",
      badge: "Trending"
    },
    {
      name: "Home & Kitchen",
      icon: <Home size={24} />,
      count: "18+ Items",
      badge: "Popular"
    },
    {
      name: "Sports & Outdoors",
      icon: <Dumbbell size={24} />,
      count: "8+ Items",
      badge: "Best Seller"
    },
    {
      name: "Shoes & Footwear",
      icon: <Footprints size={24} />,
      count: "10+ Items",
      badge: "New"
    },
    {
      name: "Fashion Accessories",
      icon: <Sparkles size={24} />,
      count: "6+ Items",
      badge: "Featured"
    }
  ];

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchTerm('');
    window.scrollTo({ top: 650, behavior: 'smooth' });
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full mb-1">
            <Flame size={13} /> Top Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Explore Featured Categories</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categoryItems.map((cat) => (
          <div
            key={cat.name}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group"
            onClick={() => handleCategorySelect(cat.name)}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mb-3 group-hover:bg-amber-400 group-hover:scale-110 transition-all">
              {cat.icon}
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 mb-1 group-hover:text-amber-500 transition-colors">
              {cat.name}
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">{cat.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
