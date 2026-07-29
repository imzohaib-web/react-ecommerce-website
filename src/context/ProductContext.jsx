import { createContext, useContext, useState, useMemo } from 'react';
import { productsData } from '../data/productsData';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortMode, setSortMode] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Available categories list
  const categories = useMemo(() => {
    const set = new Set();
    productsData.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search term filter (match name, category, or keywords)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const nameMatch = product.name.toLowerCase().includes(query);
        const categoryMatch = product.category.toLowerCase().includes(query);
        const keywordMatch = product.keywords.some((k) => k.toLowerCase().includes(query));
        return nameMatch || categoryMatch || keywordMatch;
      }

      return true;
    }).sort((a, b) => {
      if (sortMode === 'price-low') {
        return a.priceCents - b.priceCents;
      }
      if (sortMode === 'price-high') {
        return b.priceCents - a.priceCents;
      }
      if (sortMode === 'rating') {
        return b.rating.stars - a.rating.stars;
      }
      return 0; // featured (default order)
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
        setQuickViewProduct
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
