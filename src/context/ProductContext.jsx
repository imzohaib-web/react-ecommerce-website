import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { productsData } from '../data/productsData';
import { useToast } from './ToastContext';

const ProductContext = createContext(null);

const WISHLIST_KEY = 'amazon_wishlist_v2';
const RECENTLY_VIEWED_KEY = 'amazon_recently_viewed_v2';

export function ProductProvider({ children }) {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortMode, setSortMode] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recently Viewed state
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem(RECENTLY_VIEWED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (err) {
      console.error(err);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
    } catch (err) {
      console.error(err);
    }
  }, [recentlyViewed]);

  const toggleWishlist = useCallback((productId) => {
    const product = productsData.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        if (product) addToast(`Removed "${product.name.slice(0, 25)}..." from wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        if (product) addToast(`Saved "${product.name.slice(0, 25)}..." to wishlist`, 'success');
        return [...prev, productId];
      }
    });
  }, [addToast]);

  const addToRecentlyViewed = useCallback((product) => {
    if (!product) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8); // keep last 8
    });
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    productsData.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, []);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const nameMatch = product.name.toLowerCase().includes(query);
        const categoryMatch = product.category.toLowerCase().includes(query);
        const keywordMatch = product.keywords.some((k) => k.toLowerCase().includes(query));
        return nameMatch || categoryMatch || keywordMatch;
      }
      return true;
    }).sort((a, b) => {
      if (sortMode === 'price-low') return a.priceCents - b.priceCents;
      if (sortMode === 'price-high') return b.priceCents - a.priceCents;
      if (sortMode === 'rating') return b.rating.stars - a.rating.stars;
      return 0;
    });
  }, [searchTerm, selectedCategory, sortMode]);

  return (
    <ProductContext.Provider
      value={{
        products: productsData,
        filteredProducts,
        categories,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        sortMode,
        setSortMode,
        quickViewProduct,
        setQuickViewProduct: (product) => {
          if (product) addToRecentlyViewed(product);
          setQuickViewProduct(product);
        },
        wishlist,
        toggleWishlist,
        recentlyViewed,
        addToRecentlyViewed
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
