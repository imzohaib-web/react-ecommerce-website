import { Shirt, Flame, Dumbbell, Footprints, Sparkles, Home } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import './FeaturedCategories.css';

export function FeaturedCategories() {
  const { setSelectedCategory, setSearchTerm } = useProducts();

  const categoryItems = [
    {
      name: "Clothing & Apparel",
      icon: <Shirt size={28} />,
      count: "12+ Items",
      gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
      badge: "Trending"
    },
    {
      name: "Home & Kitchen",
      icon: <Home size={28} />,
      count: "18+ Items",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
      badge: "Popular"
    },
    {
      name: "Sports & Outdoors",
      icon: <Dumbbell size={28} />,
      count: "8+ Items",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      badge: "Best Seller"
    },
    {
      name: "Shoes & Footwear",
      icon: <Footprints size={28} />,
      count: "10+ Items",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      badge: "New"
    },
    {
      name: "Fashion Accessories",
      icon: <Sparkles size={28} />,
      count: "6+ Items",
      gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
      badge: "Featured"
    }
  ];

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchTerm('');
    window.scrollTo({ top: 650, behavior: 'smooth' });
  };

  return (
    <section className="featured-categories-section">
      <div className="section-header-row">
        <div>
          <span className="section-tag-pill"><Flame size={14} /> Top Collections</span>
          <h2 className="section-main-title">Explore Featured Categories</h2>
        </div>
      </div>

      <div className="categories-cards-grid">
        {categoryItems.map((cat) => (
          <div
            key={cat.name}
            className="featured-cat-card"
            onClick={() => handleCategorySelect(cat.name)}
          >
            <div className="cat-card-gradient" style={{ background: cat.gradient }}>
              <span className="cat-badge">{cat.badge}</span>
              <div className="cat-icon-box">{cat.icon}</div>
            </div>
            <div className="cat-card-info">
              <h3 className="cat-title">{cat.name}</h3>
              <span className="cat-count">{cat.count}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
