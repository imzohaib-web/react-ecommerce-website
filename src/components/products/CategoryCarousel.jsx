import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Shirt, Home, Dumbbell, Footprints, Sparkles, LayoutGrid, Check } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { productsData } from '../../data/productsData';

export function CategoryCarousel() {
  const { categories, selectedCategory, setSelectedCategory, setSearchTerm } = useProducts();
  const carouselRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // Category Metadata Mapping
  const categoryMetaData = {
    'All': {
      icon: <LayoutGrid size={18} />,
      image: "images/products/athletic-cotton-socks-6-pairs.jpg"
    },
    'Clothing & Apparel': {
      icon: <Shirt size={18} />,
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
    },
    'Home & Kitchen': {
      icon: <Home size={18} />,
      image: "images/products/2-slot-toaster-white.jpg"
    },
    'Sports & Outdoors': {
      icon: <Dumbbell size={18} />,
      image: "images/products/intermediate-composite-basketball.jpg"
    },
    'Shoes & Footwear': {
      icon: <Footprints size={18} />,
      image: "images/products/knit-athletic-sneakers-gray.jpg"
    },
    'Fashion Accessories': {
      icon: <Sparkles size={18} />,
      image: "images/products/round-sunglasses-gold.jpg"
    }
  };

  const baseCategories = categories.map((catName) => {
    let count = productsData.length;
    if (catName !== 'All') {
      count = productsData.filter((p) => p.category === catName).length;
    }
    const meta = categoryMetaData[catName] || {
      icon: <Sparkles size={18} />,
      image: "images/products/athletic-cotton-socks-6-pairs.jpg"
    };

    return {
      name: catName,
      count,
      icon: meta.icon,
      image: meta.image
    };
  });

  const infiniteCategories = [
    ...baseCategories.map((c, i) => ({ ...c, uniqueId: `set1-${i}-${c.name}` })),
    ...baseCategories.map((c, i) => ({ ...c, uniqueId: `set2-${i}-${c.name}` })),
    ...baseCategories.map((c, i) => ({ ...c, uniqueId: `set3-${i}-${c.name}` }))
  ];

  const handleScrollBoundaries = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft <= 20) {
      el.scrollLeft += singleSetWidth;
    } else if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
    }
  }, []);

  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      const el = carouselRef.current;
      if (!el) return;
      handleScrollBoundaries();
      el.scrollBy({ left: 240, behavior: 'smooth' });
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, handleScrollBoundaries]);

  const scroll = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    handleScrollBoundaries();
    const offset = direction === 'left' ? -280 : 280;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftState(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    if (Math.abs(walk) > 8) setHasMoved(true);
    carouselRef.current.scrollLeft = scrollLeftState - walk;
    handleScrollBoundaries();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeftState(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    if (Math.abs(walk) > 8) setHasMoved(true);
    carouselRef.current.scrollLeft = scrollLeftState - walk;
    handleScrollBoundaries();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleSelectCategory = (catName) => {
    if (hasMoved) return;
    setSelectedCategory(catName);
    setSearchTerm('');
  };

  return (
    <section
      className="relative mb-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDragging(false);
      }}
    >
      {/* Header controls & section title */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <span className="inline-block bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full mb-1">
            Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Explore Categories</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 flex items-center justify-center shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 flex items-center justify-center shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Outer viewport with edge gradient fade overlays */}
      <div className="relative w-full overflow-hidden rounded-2xl py-1">
        {/* Left & Right gradient edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        {/* Scrollable Track */}
        <div
          ref={carouselRef}
          className={`flex gap-4 overflow-x-auto no-scrollbar py-2 px-3 snap-x snap-mandatory scroll-smooth ${
            isDragging ? 'cursor-grabbing snap-none scroll-auto' : 'cursor-grab'
          }`}
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
                className={`snap-start flex-shrink-0 w-44 sm:w-52 bg-white rounded-2xl p-4 border transition-all duration-300 flex flex-col items-center relative cursor-pointer group shadow-sm hover:shadow-xl hover:-translate-y-1.5 ${
                  isActive
                    ? 'border-amber-400 bg-gradient-to-b from-white to-amber-50/50 ring-2 ring-amber-400/50 shadow-md'
                    : 'border-slate-200 hover:border-amber-300'
                }`}
                onClick={() => handleSelectCategory(cat.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelectCategory(cat.name);
                  }
                }}
              >
                {isActive && (
                  <span className="absolute top-2.5 right-2.5 bg-amber-400 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Check size={10} /> Active
                  </span>
                )}

                <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden bg-slate-100 mb-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    draggable="false"
                  />
                  <div className="absolute bottom-2 left-2 w-8 h-8 rounded-lg bg-slate-950/80 backdrop-blur-sm text-white flex items-center justify-center shadow-md group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                    {cat.icon}
                  </div>
                </div>

                <div className="w-full text-center">
                  <h3
                    className={`font-bold text-sm truncate mb-0.5 ${
                      isActive ? 'text-slate-950' : 'text-slate-800 group-hover:text-amber-500'
                    }`}
                  >
                    {cat.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {cat.count} {cat.count === 1 ? 'Item' : 'Items'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
