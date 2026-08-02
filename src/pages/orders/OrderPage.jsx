import { Link } from 'react-router-dom';
import { Package, RotateCcw, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import { useOrders } from '../../context/OrdersContext';
import { useCart } from '../../context/CartContext';
import { formatMoney } from '../../utils/money';
import { formatDate } from '../../utils/dateUtils';

export function OrderPage() {
  const { orders } = useOrders();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16 pt-8">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3 mb-8">
          <Package size={32} className="text-amber-500" /> Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm flex flex-col items-center max-w-lg mx-auto my-8">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-5">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No orders placed yet</h2>
            <p className="text-sm text-slate-500 mb-6 max-w-sm">
              You have not placed any orders yet. Start exploring products and build your shopping list!
            </p>
            <Link
              to="/"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-lg shadow-amber-400/20 flex items-center gap-2 hover:scale-105 transition-all text-sm"
            >
              Explore Catalog <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const orderDateStr = formatDate(order.orderTimeMs);

              return (
                <div key={order.id} className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-slate-900 text-white p-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
                    <div className="flex flex-wrap gap-6 text-xs">
                      <div>
                        <span className="block text-slate-400 uppercase tracking-wider font-bold mb-0.5">ORDER PLACED</span>
                        <span className="font-semibold text-slate-200">{orderDateStr}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 uppercase tracking-wider font-bold mb-0.5">TOTAL</span>
                        <span className="font-extrabold text-amber-400 text-sm">${formatMoney(order.totalCostCents)}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 uppercase tracking-wider font-bold mb-0.5">SHIP TO</span>
                        <span className="font-semibold text-slate-200">Customer</span>
                      </div>
                    </div>

                    <div className="text-xs sm:text-right">
                      <span className="block text-slate-400 font-mono mb-0.5">ORDER # {order.id}</span>
                      <span className="text-amber-400 font-semibold hover:underline cursor-pointer">View Invoice</span>
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
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-xl w-fit">
                            <Truck size={16} />
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
                              <h3 className="font-bold text-base text-slate-900">{product.name}</h3>
                              <div className="text-xs font-semibold text-slate-500">
                                Quantity: {item.quantity} · ${formatMoney(product.priceCents * item.quantity)}
                              </div>

                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer mt-2"
                                onClick={() => addToCart(product.id, item.quantity)}
                              >
                                <RotateCcw size={14} /> Buy it again
                              </button>
                            </div>

                            <div className="sm:col-span-3 sm:text-right">
                              <Link
                                to={`/tracking?orderId=${order.id}&productId=${product.id}`}
                                className="inline-flex items-center justify-center w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl shadow-md shadow-amber-400/20 text-xs transition-all hover:scale-105"
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
