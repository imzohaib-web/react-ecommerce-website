import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { productsData } from '../data/productsData';
import { getEstimatedDeliveryMs } from '../utils/dateUtils';
import { useToast } from './ToastContext';

const OrdersContext = createContext(null);

const STORAGE_KEY = 'amazon_orders_v2';

const defaultSeedOrders = [
  {
    id: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
    orderTimeMs: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    totalCostCents: 3506,
    products: [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        estimatedDeliveryTimeMs: Date.now() + 1000 * 60 * 60 * 24 * 2, // 2 days in future
        product: productsData.find((p) => p.id === "e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
      },
      {
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 2,
        estimatedDeliveryTimeMs: Date.now() + 1000 * 60 * 60 * 24 * 4,
        product: productsData.find((p) => p.id === "83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
      }
    ]
  },
  {
    id: "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
    orderTimeMs: Date.now() - 1000 * 60 * 60 * 24 * 14, // 14 days ago
    totalCostCents: 4190,
    products: [
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2,
        estimatedDeliveryTimeMs: Date.now() - 1000 * 60 * 60 * 24 * 7, // delivered 7 days ago
        product: productsData.find((p) => p.id === "15b6fc6f-327a-4ec4-896f-486349e85a3d")
      }
    ]
  }
];

export function OrdersProvider({ children }) {
  const { addToast } = useToast();
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {
      console.error('Failed to load orders from localStorage:', err);
    }
    return defaultSeedOrders;
  });

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
      estimatedDeliveryTimeMs: getEstimatedDeliveryMs(item.deliveryOption.deliveryDays),
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
