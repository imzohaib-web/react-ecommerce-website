import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Trash2, ShieldCheck, ShoppingBag, ArrowLeft, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrdersContext';
import { formatMoney } from '../../utils/money';
import { getEstimatedDeliveryDate } from '../../utils/dateUtils';
import { BrandLogo } from '../../components/common/BrandLogo';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, summary, deliveryOptions, updateQuantity, removeFromCart, updateDeliveryOption, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder(cart, summary);
      clearCart();
      setIsSubmitting(false);
      if (order) {
        navigate('/orders');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      {/* Checkout Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <BrandLogo variant="dark" size="small" />

          <div className="text-sm font-semibold text-slate-300">
            Checkout (
            <Link to="/" className="text-amber-400 hover:underline">
              {summary.totalQuantity} {summary.totalQuantity === 1 ? 'item' : 'items'}
            </Link>
            )
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-full">
            <Lock size={14} />
            <span className="hidden sm:inline">256-Bit SSL Encrypted</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">Review & Complete Order</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm flex flex-col items-center max-w-lg mx-auto my-12">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-5">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Shopping Cart is Empty</h2>
            <p className="text-sm text-slate-500 mb-6 max-w-sm">
              Your shopping cart has no items. Explore our product catalog to discover deals.
            </p>
            <Link
              to="/"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-lg shadow-amber-400/20 flex items-center gap-2 hover:scale-105 transition-all text-sm"
            >
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Order Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((cartItem) => {
                const { product, deliveryOption } = cartItem;
                const estimatedDateStr = getEstimatedDeliveryDate(deliveryOption.deliveryDays);

                return (
                  <div
                    key={`${cartItem.productId}-${cartItem.selectedColor}-${cartItem.selectedSize}`}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-6"
                  >
                    <div className="bg-amber-50 border border-amber-200/80 text-amber-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 mb-5">
                      <Truck size={16} className="text-amber-600" />
                      <span>Estimated Arrival: <strong>{estimatedDateStr}</strong></span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                      {/* Product Image */}
                      <div className="sm:col-span-3 bg-slate-50 rounded-xl p-3 flex items-center justify-center border border-slate-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-28 object-contain"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="sm:col-span-4 space-y-2">
                        <h3 className="font-bold text-sm text-slate-900 leading-snug">{product.name}</h3>

                        {(cartItem.selectedColor || cartItem.selectedSize) && (
                          <div className="flex gap-1.5">
                            {cartItem.selectedColor && (
                              <span className="text-[10px] bg-slate-100 font-semibold text-slate-600 px-1.5 py-0.5 rounded">
                                Color: {cartItem.selectedColor}
                              </span>
                            )}
                            {cartItem.selectedSize && (
                              <span className="text-[10px] bg-slate-100 font-semibold text-slate-600 px-1.5 py-0.5 rounded">
                                Size: {cartItem.selectedSize}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="text-base font-extrabold text-slate-950">
                          ${formatMoney(product.priceCents)}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <div className="flex items-center gap-1">
                            <label htmlFor={`cart-qty-${cartItem.productId}`} className="text-xs font-bold text-slate-600">
                              Qty:
                            </label>
                            <select
                              id={`cart-qty-${cartItem.productId}`}
                              value={cartItem.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  cartItem.productId,
                                  Number(e.target.value),
                                  cartItem.selectedColor,
                                  cartItem.selectedSize
                                )
                              }
                              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 cursor-pointer outline-none"
                            >
                              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                <option key={n} value={n}>
                                  {n}
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            type="button"
                            className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                            onClick={() =>
                              removeFromCart(
                                cartItem.productId,
                                cartItem.selectedColor,
                                cartItem.selectedSize
                              )
                            }
                          >
                            <Trash2 size={13} /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Delivery Options Selection */}
                      <div className="sm:col-span-5 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-5 space-y-2">
                        <div className="text-xs font-bold text-slate-700 mb-2">Select Delivery Speed:</div>
                        {deliveryOptions.map((option) => {
                          const optionDateStr = getEstimatedDeliveryDate(option.deliveryDays);
                          const isSelected = cartItem.deliveryOptionId === option.id;

                          return (
                            <label
                              key={option.id}
                              className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer text-xs ${
                                isSelected
                                  ? 'bg-amber-50/60 border-amber-400 font-medium'
                                  : 'bg-white border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`delivery-option-${cartItem.productId}`}
                                checked={isSelected}
                                onChange={() =>
                                  updateDeliveryOption(cartItem.productId, option.id)
                                }
                                className="mt-0.5 text-amber-500 focus:ring-amber-400 cursor-pointer"
                              />
                              <div>
                                <div className="font-bold text-slate-900">{optionDateStr}</div>
                                <div className="text-slate-500">
                                  {option.priceCents === 0
                                    ? 'FREE Shipping'
                                    : `$${formatMoney(option.priceCents)} Standard Shipping`}
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Payment Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg sticky top-24 space-y-4">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Payment Summary
                </h2>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Items ({summary.totalQuantity}):</span>
                    <span className="font-semibold text-slate-900">${formatMoney(summary.productPriceCents)}</span>
                  </div>

                  {summary.discountCents > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount Savings:</span>
                      <span>-${formatMoney(summary.discountCents)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping & handling:</span>
                    <span className="font-semibold text-slate-900">
                      {summary.shippingCostCents === 0 ? 'FREE' : `$${formatMoney(summary.shippingCostCents)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated tax (10%):</span>
                    <span className="font-semibold text-slate-900">${formatMoney(summary.taxCents)}</span>
                  </div>

                  <div className="flex justify-between text-base font-extrabold text-slate-950 pt-3 border-t border-slate-200">
                    <span>Order Total:</span>
                    <span className="text-amber-600">${formatMoney(summary.totalCostCents)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold py-3.5 rounded-xl shadow-lg shadow-amber-400/25 flex items-center justify-center hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-sm"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing Order...' : 'Complete Order'}
                </button>

                <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
                  <ShieldCheck size={15} className="text-emerald-500" /> Guaranteed Safe & Secure Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
