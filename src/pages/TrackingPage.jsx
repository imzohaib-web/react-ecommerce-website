import { useSearchParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { productsData } from '../data/productsData';
import { formatDate } from '../utils/dateUtils';
import { ArrowLeft, PackageCheck, Truck, Clock, MapPin } from 'lucide-react';

export function TrackingPage() {
  const [searchParams] = useSearchParams();
  const { orders } = useOrders();

  const orderId = searchParams.get('orderId');
  const productId = searchParams.get('productId');

  const targetOrder = orders.find((o) => o.id === orderId) || orders[0];

  if (!targetOrder) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-md space-y-4">
          <h2 className="text-xl font-bold text-slate-900">No Order Found</h2>
          <p className="text-sm text-slate-500">We could not find the specified package tracking details.</p>
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm hover:underline"
          >
            <ArrowLeft size={16} /> View all orders
          </Link>
        </div>
      </div>
    );
  }

  const targetItem = targetOrder.products.find((p) => p.productId === productId) || targetOrder.products[0];
  const product = targetItem?.product || productsData.find((p) => p.id === targetItem?.productId) || productsData[0];

  const now = Date.now();
  const orderTimeMs = targetOrder.orderTimeMs || (now - 1000 * 60 * 60 * 24 * 2);
  const deliveryTimeMs = targetItem?.estimatedDeliveryTimeMs || (now + 1000 * 60 * 60 * 24 * 3);

  const totalDuration = Math.max(1, deliveryTimeMs - orderTimeMs);
  const elapsed = Math.max(0, now - orderTimeMs);
  const progressPercent = Math.min(100, Math.max(15, Math.round((elapsed / totalDuration) * 100)));

  let status = 'Preparing';
  let stepIndex = 1;
  if (progressPercent >= 100) {
    status = 'Delivered';
    stepIndex = 3;
  } else if (progressPercent >= 35) {
    status = 'Shipped';
    stepIndex = 2;
  }

  const deliveryDateStr = formatDate(deliveryTimeMs);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16 pt-8">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-950 font-bold text-sm transition-colors"
        >
          <ArrowLeft size={16} /> View all orders
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">Estimated Arrival</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                {status === 'Delivered' ? `Delivered on ${deliveryDateStr}` : `Arriving ${deliveryDateStr}`}
              </h1>
            </div>
            <div className="bg-slate-100 text-slate-700 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border border-slate-200 self-start sm:self-auto">
              Order #{targetOrder.id.slice(0, 12)}...
            </div>
          </div>

          {/* Product Specs */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-contain rounded-xl bg-white p-2 border border-slate-200"
            />
            <div>
              <h2 className="font-bold text-base text-slate-900 leading-snug">{product.name}</h2>
              <div className="text-xs font-semibold text-slate-500 mt-1">Quantity: {targetItem.quantity}</div>
            </div>
          </div>

          {/* Progress Timeline Steps */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`space-y-2 ${stepIndex >= 1 ? 'text-amber-500 font-bold' : 'text-slate-400 font-medium'}`}>
              <div
                className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center border-2 transition-all ${
                  stepIndex >= 1
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-400/20'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}
              >
                <Clock size={18} />
              </div>
              <span className="text-xs block">Preparing</span>
            </div>

            <div className={`space-y-2 ${stepIndex >= 2 ? 'text-amber-500 font-bold' : 'text-slate-400 font-medium'}`}>
              <div
                className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center border-2 transition-all ${
                  stepIndex >= 2
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-400/20'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}
              >
                <Truck size={18} />
              </div>
              <span className="text-xs block">Shipped</span>
            </div>

            <div className={`space-y-2 ${stepIndex >= 3 ? 'text-amber-500 font-bold' : 'text-slate-400 font-medium'}`}>
              <div
                className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center border-2 transition-all ${
                  stepIndex >= 3
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-400/20'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}
              >
                <PackageCheck size={18} />
              </div>
              <span className="text-xs block">Delivered</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500 relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/80 rounded-full animate-ping" />
            </div>
          </div>

          {/* Live Status Note */}
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 font-medium">
            <MapPin size={18} className="text-amber-600 flex-shrink-0" />
            <span>
              {status === 'Preparing' && 'Package is being processed and packaged at fulfillment center.'}
              {status === 'Shipped' && 'Package is in transit with carrier. On schedule for delivery.'}
              {status === 'Delivered' && 'Package was left near front door or porch.'}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}