import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { productsData, deliveryOptionsData } from '../data/productsData';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

const STORAGE_KEY = 'amazon_cart_v2';

const defaultSeedCart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: "1"
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: "2"
  }
];

export function CartProvider({ children }) {
  const { addToast } = useToast();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {
      console.error('Failed to load cart from localStorage:', err);
    }
    return defaultSeedCart;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [cartItems]);

  const addToCart = useCallback((productId, quantity = 1) => {
    const qty = parseInt(quantity, 10) || 1;
    const product = productsData.find((p) => p.id === productId);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.productId === productId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            productId,
            quantity: qty,
            deliveryOptionId: "1"
          }
        ];
      }
    });

    if (product) {
      addToast(`Added ${qty} × "${product.name.slice(0, 30)}..." to cart`, 'success');
    }
  }, [addToast]);

  const removeFromCart = useCallback((productId) => {
    const product = productsData.find((p) => p.id === productId);
    setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    if (product) {
      addToast(`Removed "${product.name.slice(0, 25)}..." from cart`, 'info');
    }
  }, [addToast]);

  const updateQuantity = useCallback((productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: qty } : item
      )
    );
  }, [removeFromCart]);

  const updateDeliveryOption = useCallback((productId, deliveryOptionId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, deliveryOptionId } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Enriched cart items with product details and delivery info
  const cart = useMemo(() => {
    return cartItems.map((item) => {
      const product = productsData.find((p) => p.id === item.productId) || null;
      const deliveryOption = deliveryOptionsData.find((d) => d.id === item.deliveryOptionId) || deliveryOptionsData[0];
      return {
        ...item,
        product,
        deliveryOption
      };
    }).filter((item) => item.product !== null);
  }, [cartItems]);

  // Derived financial breakdown
  const summary = useMemo(() => {
    let totalQuantity = 0;
    let productPriceCents = 0;
    let shippingCostCents = 0;

    cart.forEach((item) => {
      totalQuantity += item.quantity;
      productPriceCents += item.product.priceCents * item.quantity;
      shippingCostCents += item.deliveryOption.priceCents;
    });

    const totalCostBeforeTaxCents = productPriceCents + shippingCostCents;
    const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
    const totalCostCents = totalCostBeforeTaxCents + taxCents;

    return {
      totalQuantity,
      productPriceCents,
      shippingCostCents,
      totalCostBeforeTaxCents,
      taxCents,
      totalCostCents
    };
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        summary,
        deliveryOptions: deliveryOptionsData,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateDeliveryOption,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
