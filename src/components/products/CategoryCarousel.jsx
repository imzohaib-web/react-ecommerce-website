import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Shirt, Home, Dumbbell, Footprints, Sparkles, LayoutGrid, Check } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { productsData } from '../../data/productsData';
import './CategoryCarousel.css';

export function CategoryCarousel() {
  const { categories, selectedCategory, setSelectedCategory, setSearchTerm } = useProducts();
  const carouselRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // Category Metadata Mapping
  const categoryMetaData = {
    'All': {
      icon: <LayoutGrid size={22} />,
      image: "images/products/athletic-cotton-socks-6-pairs.jpg"
    },
    'Clothing & Apparel': {
      icon: <Shirt size={22} />,
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
    },
    'Home & Kitchen': {
      icon: <Home size={22} />,
      image: "images/products/2-slot-toaster-white.jpg"
    },
    'Sports & Outdoors': {
      icon: <Dumbbell size={22} />,
      image: "images/products/intermediate-composite-basketball.jpg"
    },
    'Shoes & Footwear': {
      icon: <Footprints size={22} />,
      image: "images/products/knit-athletic-sneakers-gray.jpg"
    },
    'Fashion Accessories': {
      icon: <Sparkles size={22} />,
      image: "images/products/round-sunglasses-gold.jpg"
    }
  };

  // Compute Base Categories with Product Counts
  const baseCategories = categories.map((catName) => {
    let count = productsData.length;
    if (catName !== 'All') {
      count = productsData.filter((p) => p.category === catName).length;
    }
    const meta = categoryMetaData[catName] || {
      icon: <Sparkles size={22} />,
      image: "images/products/athletic-cotton-socks-6-pairs.jpg"
    };

    return {
      name: catName,
      count,
      icon: meta.icon,
      image: meta.image
    };
  });

  // Duplicate categories 3 times to achieve seamless infinite scrolling
  const infiniteCategories = [
    ...baseCategories.map((c, i) => ({ ...c, uniqueId: `set1-${i}-${c.name}` })),
    ...baseCategories.map((c, i) => ({ ...c, uniqueId: `set2-${i}-${c.name}` })),
    ...baseCategories.map((c, i) => ({ ...c, uniqueId: `set3-${i}-${c.name}` }))
  ];

  // Infinite Scroll Boundary Check
  const handleScrollBoundaries = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    const singleSetWidth = el.scrollWidth / 3;

    // Reset scroll if too far left or right to maintain infinite loop seamlessly
    if (el.scrollLeft <= 10) {
      el.scrollLeft += singleSetWidth;
    } else if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
    }
  }, []);

  // Auto-Scroll Timer (Every 3 Seconds)
  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      const el = carouselRef.current;
      if (!el) return;
      handleScrollBoundaries();
      el.scrollBy({ left: 240, behavior: 'smooth' });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, handleScrollBoundaries]);

  // Scroll Left / Right Buttons
  const scroll = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    handleScrollBoundaries();
    const offset = direction === 'left' ? -280 : 280;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) setHasMoved(true);
    carouselRef.current.scrollLeft = scrollLeft - walk;
    handleScrollBoundaries();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) setHasMoved(true);
    carouselRef.current.scrollLeft = scrollLeft - walk;
    handleScrollBoundaries();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleSelectCategory = (catName) => {
    if (hasMoved) return; // Ignore drag clicks
    setSelectedCategory(catName);
    setSearchTerm('');
  };

  return (
    <div
      className="category-carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDragging(false);
      }}
    >
      <div className="carousel-controls-header">
        <div className="carousel-title-group">
          <span className="carousel-badge">Categories</span>
          <h2 className="carousel-main-title">Explore Collections</h2>
        </div>

        <div className="carousel-arrows">
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Outer viewport with edge gradient overlays */}
      <div className="carousel-track-container">
        <div className="edge-fade-left"></div>
        <div className="edge-fade-right"></div>

        {/* Scrollable Track */}
        <div
          ref={carouselRef}
          className={`carousel-track ${isDragging ? 'dragging' : ''}`}
          onScroll={handleScrollBoundaries}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {infiniteCategories.map((cat) => {
            const isActive = selectedCategory === cat.name;

            return (
              <div
                key={cat.uniqueId}
                className={`category-carousel-card ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectCategory(cat.name)}
              >
                {isActive && (
                  <span className="active-check-badge">
                    <Check size={12} /> Active
                  </span>
                )}

                <div className="card-image-preview">
                  <img src={cat.image} alt={cat.name} className="cat-preview-img" draggable="false" />
                  <div className="cat-icon-badge">{cat.icon}</div>
                </div>

                <div className="card-content-body">
                  <h3 className="cat-card-name">{cat.name}</h3>
                  <span className="cat-card-count">{cat.count} {cat.count === 1 ? 'Product' : 'Products'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
