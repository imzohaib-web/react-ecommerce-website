import { Link } from 'react-router-dom';
import { Package, RotateCcw, Truck, ShoppingBag, ArrowRight, PackageX } from 'lucide-react';
import { useOrders } from '../../context/OrdersContext';
import { useCart } from '../../context/CartContext';
import { formatMoney } from '../../utils/money';
import { formatDate } from '../../utils/dateUtils';

/**
 * OrderPage component renders the user's actual order history.
 * Displays an attractive Empty Orders state if no purchases have been made yet.
 */
export function OrderPage() {
  const { orders } = useOrders();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 pt-8">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3 mb-8">
          <Package size={34} className="text-amber-500" /> Your Orders
        </h1>

        {orders.length === 0 ? (
          /* Redesigned Empty Orders State */
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-200/80 shadow-xl flex flex-col items-center max-w-lg mx-auto my-12 relative overflow-hidden">
            {/* Ambient Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Large Illustration / Icon Box */}
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-100 via-slate-100 to-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-500 shadow-md shadow-amber-400/10">
                <PackageX size={48} className="stroke-[1.75]" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shadow-md border border-slate-800">
                <ShoppingBag size={16} />
              </span>
            </div>

            {/* Heading & Description */}
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">
              No Orders Yet
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mb-8 max-w-sm leading-relaxed">
              You haven't placed any orders yet. Start shopping to see your purchases here.
            </p>

            {/* Primary Action Button */}
            <Link
              to="/"
              className="bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold px-8 py-3.5 rounded-full shadow-lg shadow-amber-400/25 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 text-sm sm:text-base group cursor-pointer"
            >
              <span>Continue Shopping</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          /* Actual Order History Cards */
          <div className="space-y-8">
            {orders.map((order) => {
              const orderDateStr = formatDate(order.orderTimeMs);

              return (
                <div key={order.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-slate-950 text-white p-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
                    <div className="flex flex-wrap gap-6 text-xs">
                      <div>
                        <span className="block text-slate-400 uppercase tracking-wider font-extrabold mb-0.5">ORDER PLACED</span>
                        <span className="font-semibold text-slate-200">{orderDateStr}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 uppercase tracking-wider font-extrabold mb-0.5">TOTAL</span>
                        <span className="font-black text-amber-400 text-sm">${formatMoney(order.totalCostCents)}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 uppercase tracking-wider font-extrabold mb-0.5">SHIP TO</span>
                        <span className="font-semibold text-slate-200">Customer</span>
                      </div>
                    </div>

                    <div className="text-xs sm:text-right">
                      <span className="block text-slate-400 font-mono mb-0.5">ORDER # {order.id}</span>
                      <span className="text-amber-400 font-bold hover:underline cursor-pointer">View Details</span>
                    </div>
                  </div>

                  {/* Products list */}
                  <div className="p-6 sm:p-8 space-y-6 divide-y divide-slate-100">
                    {order.products.map((item) => {
                      const { product } = item;
                      if (!product) return null;

                      const deliveryDateStr = formatDate(item.estimatedDeliveryTimeMs);
                      const isDelivered = Date.now() > item.estimatedDeliveryTimeMs;

                      return (
                        <div key={item.productId} className="pt-6 first:pt-0 space-y-4">
                          <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-full w-fit">
                            <Truck size={15} />
                            <span>
                              {isDelivered ? `Delivered on ${deliveryDateStr}` : `Arriving ${deliveryDateStr}`}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                            <div className="sm:col-span-2 bg-slate-50 rounded-2xl p-3 flex items-center justify-center border border-slate-100">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-24 object-contain"
                              />
                            </div>

                            <div className="sm:col-span-7 space-y-2">
                              <h3 className="font-extrabold text-base text-slate-900">{product.name}</h3>
                              <div className="text-xs font-semibold text-slate-500">
                                Quantity: {item.quantity} · ${formatMoney(product.priceCents * item.quantity)}
                              </div>

                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer mt-2"
                                onClick={() => addToCart(product.id, item.quantity)}
                              >
                                <RotateCcw size={14} /> Buy it again
                              </button>
                            </div>

                            <div className="sm:col-span-3 sm:text-right">
                              <Link
                                to={`/tracking?orderId=${order.id}&productId=${product.id}`}
                                className="inline-flex items-center justify-center w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-6 py-2.5 rounded-full shadow-md shadow-amber-400/20 text-xs transition-all hover:scale-105"
                              >
                                Track package
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
