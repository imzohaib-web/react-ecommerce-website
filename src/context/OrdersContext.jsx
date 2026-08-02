import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getEstimatedDeliveryMs } from '../utils/dateUtils';
import { useToast } from './ToastContext';

const OrdersContext = createContext(null);

const STORAGE_KEY = 'swiftcart_orders_v1';

export function OrdersProvider({ children }) {
  const { addToast } = useToast();

  // Load actual user purchases from LocalStorage. Starts empty [] if no purchases exist.
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {
      console.error('Failed to load orders from localStorage:', err);
    }
    return [];
  });

  // Persist user orders to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (err) {
      console.error('Failed to save orders to localStorage:', err);
    }
  }, [orders]);

  const placeOrder = useCallback((cart, summary) => {
    if (!cart || cart.length === 0) {
      addToast('Cannot place an empty order!', 'error');
      return null;
    }

    const orderId = `${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 12)}`;
    const now = Date.now();

    const orderProducts = cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      estimatedDeliveryTimeMs: getEstimatedDeliveryMs(item.deliveryOption?.deliveryDays || 3),
      product: item.product
    }));

    const newOrder = {
      id: orderId,
      orderTimeMs: now,
      totalCostCents: summary.totalCostCents,
      products: orderProducts
    };

    setOrders((prev) => [newOrder, ...prev]);
    addToast(`Order placed successfully! Order ID: ${orderId.slice(0, 8)}...`, 'success');
    return newOrder;
  }, [addToast]);

  const getOrderById = useCallback((orderId) => {
    return orders.find((o) => o.id === orderId) || null;
  }, [orders]);

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, getOrderById }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
