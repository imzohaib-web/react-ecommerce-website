import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { productsData, deliveryOptionsData } from '../data/productsData';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

const STORAGE_KEY = 'amazon_cart_v2';
const COUPON_STORAGE_KEY = 'amazon_cart_coupon_v2';

const defaultSeedCart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: "1",
    selectedColor: "Black",
    selectedSize: "M"
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: "2",
    selectedColor: null,
    selectedSize: null
  }
];

// Valid Coupons Configuration
export const VALID_COUPONS = {
  'AURA20': { code: 'AURA20', type: 'percent', value: 20, label: '20% OFF Everything' },
  'SAVE10': { code: 'SAVE10', type: 'fixed', value: 1000, label: '$10 OFF Order' },
  'WELCOME15': { code: 'WELCOME15', type: 'percent', value: 15, label: '15% New Customer Discount' }
};

export function CartProvider({ children }) {
  const { addToast } = useToast();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastRemovedItem, setLastRemovedItem] = useState(null);

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

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      if (saved && VALID_COUPONS[saved.toUpperCase()]) {
        return VALID_COUPONS[saved.toUpperCase()];
      }
    } catch (err) {
      console.error('Failed to load coupon from localStorage:', err);
    }
    return null;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon.code);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (err) {
      console.error('Failed to save coupon to localStorage:', err);
    }
  }, [appliedCoupon]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addToCart = useCallback((productId, quantity = 1, selectedColor = null, selectedSize = null) => {
    const qty = parseInt(quantity, 10) || 1;
    const product = productsData.find((p) => p.id === productId);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.productId === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

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
            deliveryOptionId: "1",
            selectedColor,
            selectedSize
          }
        ];
      }
    });

    if (product) {
      addToast(`Added ${qty} × "${product.name.slice(0, 25)}..." to cart`, 'success');
    }
  }, [addToast]);

  const buyNow = useCallback((productId, quantity = 1, selectedColor = null, selectedSize = null) => {
    addToCart(productId, quantity, selectedColor, selectedSize);
    setIsCartOpen(true);
  }, [addToCart]);

  const removeFromCart = useCallback((productId, selectedColor = null, selectedSize = null) => {
    const product = productsData.find((p) => p.id === productId);

    setCartItems((prevItems) => {
      const targetIndex = prevItems.findIndex(
        (item) =>
          item.productId === productId &&
          (selectedColor === null || item.selectedColor === selectedColor) &&
          (selectedSize === null || item.selectedSize === selectedSize)
      );

      if (targetIndex > -1) {
        const itemToRemove = prevItems[targetIndex];
        setLastRemovedItem({ item: itemToRemove, index: targetIndex });
        const updated = [...prevItems];
        updated.splice(targetIndex, 1);
        return updated;
      }
      return prevItems;
    });

    if (product) {
      addToast(`Removed "${product.name.slice(0, 25)}..." from cart`, 'info');
    }
  }, [addToast]);

  const undoRemove = useCallback(() => {
    if (!lastRemovedItem) return;
    setCartItems((prevItems) => {
      const updated = [...prevItems];
      updated.splice(lastRemovedItem.index, 0, lastRemovedItem.item);
      return updated;
    });
    const product = productsData.find((p) => p.id === lastRemovedItem.item.productId);
    if (product) {
      addToast(`Restored "${product.name.slice(0, 25)}..." to cart`, 'success');
    }
    setLastRemovedItem(null);
  }, [lastRemovedItem, addToast]);

  const updateQuantity = useCallback((productId, newQuantity, selectedColor = null, selectedSize = null) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (
          item.productId === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        ) {
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  }, [removeFromCart]);

  const updateDeliveryOption = useCallback((productId, deliveryOptionId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, deliveryOptionId } : item
      )
    );
  }, []);

  const updateAllDeliveryOptions = useCallback((deliveryOptionId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, deliveryOptionId }))
    );
  }, []);

  const applyCoupon = useCallback((codeString) => {
    const code = codeString.trim().toUpperCase();
    if (!code) return { success: false, message: 'Please enter a coupon code.' };

    const coupon = VALID_COUPONS[code];
    if (coupon) {
      setAppliedCoupon(coupon);
      addToast(`Coupon "${coupon.code}" applied successfully!`, 'success');
      return { success: true, message: `Applied ${coupon.label}` };
    } else {
      addToast(`Invalid promo code. Try "AURA20" or "SAVE10"`, 'error');
      return { success: false, message: 'Invalid promo code.' };
    }
  }, [addToast]);

  const removeCoupon = useCallback(() => {
    if (appliedCoupon) {
      addToast(`Coupon "${appliedCoupon.code}" removed`, 'info');
      setAppliedCoupon(null);
    }
  }, [appliedCoupon, addToast]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setLastRemovedItem(null);
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

  // Financial breakdown calculation
  const summary = useMemo(() => {
    let totalQuantity = 0;
    let productPriceCents = 0;
    let shippingCostCents = 0;

    cart.forEach((item) => {
      totalQuantity += item.quantity;
      productPriceCents += item.product.priceCents * item.quantity;
      // Use max shipping fee among items or current selected shipping
      if (item.deliveryOption.priceCents > shippingCostCents) {
        shippingCostCents = item.deliveryOption.priceCents;
      }
    });

    let discountCents = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percent') {
        discountCents = Math.round((productPriceCents * appliedCoupon.value) / 100);
      } else if (appliedCoupon.type === 'fixed') {
        discountCents = Math.min(appliedCoupon.value, productPriceCents);
      }
    }

    const netProductPriceCents = Math.max(0, productPriceCents - discountCents);
    const totalBeforeTaxCents = netProductPriceCents + shippingCostCents;
    const taxCents = Math.round(totalBeforeTaxCents * 0.1);
    const totalCostCents = totalBeforeTaxCents + taxCents;

    return {
      totalQuantity,
      productPriceCents,
      discountCents,
      shippingCostCents,
      taxCents,
      totalCostCents
    };
  }, [cart, appliedCoupon]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        summary,
        deliveryOptions: deliveryOptionsData,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        buyNow,
        removeFromCart,
        lastRemovedItem,
        undoRemove,
        updateQuantity,
        updateDeliveryOption,
        updateAllDeliveryOptions,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
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

