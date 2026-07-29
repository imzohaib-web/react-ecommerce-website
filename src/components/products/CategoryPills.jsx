import { useProducts } from '../../context/ProductContext';
import { Tag } from 'lucide-react';
import './CategoryPills.css';

export function CategoryPills() {
  const { categories, selectedCategory, setSelectedCategory } = useProducts();

  return (
    <div className="category-pills-wrapper">
      <div className="category-pills-label">
        <Tag size={15} /> Categories:
      </div>
      <div className="category-pills-list">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              className={`category-pill ${isActive ? 'active' : ''}`}
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
