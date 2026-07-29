import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { OrdersProvider } from './context/OrdersContext';
import { ProductProvider } from './context/ProductContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { PageSkeleton } from './components/common/SkeletonLoader';

// Lazy loading route components
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const CheckoutPage = lazy(() => import('./pages/checkout/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));
const OrderPage = lazy(() => import('./pages/orders/OrderPage').then((m) => ({ default: m.OrderPage })));
const TrackingPage = lazy(() => import('./pages/TrackingPage').then((m) => ({ default: m.TrackingPage })));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

function AppContent() {
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';

  return (
    <div className="app-root">
      {!isCheckout && <Navbar />}

      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {!isCheckout && <Footer />}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <OrdersProvider>
          <ProductProvider>
            <AppContent />
          </ProductProvider>
        </OrdersProvider>
      </CartProvider>
    </ToastProvider>
  );
}
