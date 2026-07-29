import './SkeletonLoader.css';

export function ProductCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image pulse"></div>
      <div className="skeleton-line pulse title-line"></div>
      <div className="skeleton-line pulse short-line"></div>
      <div className="skeleton-line pulse price-line"></div>
      <div className="skeleton-button pulse"></div>
    </div>
  );
}

export function ProductsGridSkeleton({ count = 8 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="page-skeleton-container">
      <div className="skeleton-line pulse header-skeleton"></div>
      <div className="skeleton-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
