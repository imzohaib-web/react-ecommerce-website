import { useProducts } from '../../context/ProductContext';
import { Tag } from 'lucide-react';

export function CategoryPills() {
  const { categories, selectedCategory, setSelectedCategory } = useProducts();

  return (
    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 my-4">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider flex-shrink-0">
        <Tag size={15} /> Categories:
      </div>
      <div className="flex items-center gap-2">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400 hover:bg-slate-50'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
