import { History } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { formatMoney } from '../../utils/money';
import './RecentlyViewed.css';

export function RecentlyViewed() {
  const { recentlyViewed, setQuickViewProduct } = useProducts();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <section className="recently-viewed-section">
      <div className="section-title-row">
        <span className="section-tag-pill"><History size={14} /> History</span>
        <h2 className="section-main-title">Recently Viewed Items</h2>
      </div>

      <div className="recently-viewed-grid">
        {recentlyViewed.map((product) => (
          <div
            key={product.id}
            className="rv-card"
            onClick={() => setQuickViewProduct(product)}
          >
            <div className="rv-img-wrapper">
              <img src={product.image} alt={product.name} className="rv-img" />
            </div>
            <div className="rv-info">
              <h4 className="rv-title">{product.name}</h4>
              <span className="rv-price">${formatMoney(product.priceCents)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
