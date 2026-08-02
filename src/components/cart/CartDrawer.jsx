import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  ShoppingBag,
  Trash2,
  Undo2,
  Tag,
  Truck,
  ArrowRight,
  Plus,
  Minus,
  Sparkles,
  Check,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { productsData } from '../../data/productsData';
import { formatMoney } from '../../utils/money';

export function CartDrawer() {
  const navigate = useNavigate();
  const {
    cart,
    summary,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    lastRemovedItem,
    undoRemove,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    deliveryOptions,
    updateAllDeliveryOptions,
    addToCart
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [addingCrossSellId, setAddingCrossSellId] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const result = applyCoupon(couponCode);
    if (result.success) {
      setCouponCode('');
    } else {
      setCouponError(result.message);
    }
  };

  const handleCrossSellAdd = (product) => {
    setAddingCrossSellId(product.id);
    addToCart(product.id, 1);
    setTimeout(() => {
      setAddingCrossSellId(null);
    }, 1200);
  };

  const cartProductIds = new Set(cart.map((item) => item.productId));
  const recommendedProducts = productsData
    .filter((p) => !cartProductIds.has(p.id))
    .slice(0, 3);

  const selectedDeliveryId = cart.length > 0 ? cart[0].deliveryOption.id : "1";

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeCart} role="dialog" aria-modal="true">
      <div className="relative z-10 w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">Shopping Cart</h2>
              <span className="text-xs text-slate-400">
                {summary.totalQuantity} {summary.totalQuantity === 1 ? 'Item' : 'Items'}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all cursor-pointer"
            onClick={closeCart}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Undo Removal Alert Banner */}
        {lastRemovedItem && (
          <div className="bg-blue-50 border-b border-blue-100 px-5 py-2.5 flex items-center justify-between text-xs text-blue-900 animate-in slide-in-from-top duration-200">
            <span className="font-medium">Item removed from cart</span>
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              onClick={undoRemove}
            >
              <Undo2 size={13} /> Undo
            </button>
          </div>
        )}

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-5 bg-slate-50">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="relative w-24 h-24 rounded-full bg-amber-100/80 text-amber-600 flex items-center justify-center mb-5 ring-8 ring-amber-50">
                <ShoppingBag size={48} />
                <Sparkles size={20} className="absolute top-2 right-2 text-amber-500 animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Your cart is empty</h3>
              <p className="text-sm text-slate-500 max-w-xs mb-6">
                Looks like you haven't added anything to your cart yet. Explore our products!
              </p>
              <button
                type="button"
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-lg shadow-amber-400/20 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
                onClick={() => {
                  closeCart();
                  navigate('/');
                }}
              >
                Start Shopping Now <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => {
                const itemSubtotal = item.product.priceCents * item.quantity;
                return (
                  <div
                    key={`${item.productId}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-18 object-contain rounded-xl bg-slate-50 p-1 border border-slate-100 flex-shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight mb-1">
                          {item.product.name}
                        </h4>

                        {(item.selectedColor || item.selectedSize) && (
                          <div className="flex gap-1.5 mb-1">
                            {item.selectedColor && (
                              <span className="text-[10px] bg-slate-100 font-semibold text-slate-600 px-1.5 py-0.5 rounded">
                                Color: {item.selectedColor}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="text-[10px] bg-slate-100 font-semibold text-slate-600 px-1.5 py-0.5 rounded">
                                Size: {item.selectedSize}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="text-xs font-semibold text-slate-500">
                          ${formatMoney(item.product.priceCents)}
                        </div>
                      </div>

                      {/* Stepper & Remove */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                          <button
                            type="button"
                            className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-l cursor-pointer"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity - 1,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-r cursor-pointer"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity + 1,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          type="button"
                          className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                          onClick={() =>
                            removeFromCart(item.productId, item.selectedColor, item.selectedSize)
                          }
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="text-sm font-extrabold text-slate-950 flex-shrink-0">
                      ${formatMoney(itemSubtotal)}
                    </div>
                  </div>
                );
              })}

              {/* Cross-Sell Recommendations */}
              {recommendedProducts.length > 0 && (
                <div className="pt-4 border-t border-dashed border-slate-300">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    <Sparkles size={14} className="text-amber-500" />
                    <span>Recommended for You</span>
                  </div>
                  <div className="space-y-2">
                    {recommendedProducts.map((p) => {
                      const isAdding = addingCrossSellId === p.id;
                      return (
                        <div
                          key={p.id}
                          className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200"
                        >
                          <img src={p.image} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-slate-50" />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-slate-800 truncate">{p.name}</h5>
                            <span className="text-xs font-extrabold text-amber-600">${formatMoney(p.priceCents)}</span>
                          </div>
                          <button
                            type="button"
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                              isAdding
                                ? 'bg-emerald-500 text-white'
                                : 'bg-amber-100 text-amber-900 hover:bg-amber-400 hover:text-slate-950'
                            }`}
                            onClick={() => handleCrossSellAdd(p)}
                            aria-label="Add recommendation"
                          >
                            {isAdding ? <Check size={14} /> : <Plus size={14} />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-slate-200 space-y-4 shadow-lg">
            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Tag size={14} />
                    <span><strong>{appliedCoupon.code}</strong> ({appliedCoupon.label})</span>
                  </div>
                  <button
                    type="button"
                    className="text-rose-500 font-bold hover:underline cursor-pointer"
                    onClick={removeCoupon}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-amber-400">
                    <Tag size={15} className="text-slate-400 mr-2 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. SWIFT20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-transparent text-xs text-slate-900 font-bold uppercase outline-none py-1"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <div className="text-[11px] text-rose-500 font-semibold">{couponError}</div>}
                  <div className="text-[11px] text-slate-400">
                    Try <button type="button" onClick={() => setCouponCode('SWIFT20')} className="text-amber-600 font-bold underline">SWIFT20</button> or <button type="button" onClick={() => setCouponCode('SAVE10')} className="text-amber-600 font-bold underline">SAVE10</button>
                  </div>
                </form>
              )}
            </div>

            {/* Shipping Estimator */}
            <div>
              <label htmlFor="drawer-shipping-select" className="text-xs font-bold text-slate-600 flex items-center gap-1 mb-1">
                <Truck size={14} /> Shipping Estimation:
              </label>
              <select
                id="drawer-shipping-select"
                value={selectedDeliveryId}
                onChange={(e) => updateAllDeliveryOptions(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                {deliveryOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name} ({opt.priceCents === 0 ? 'FREE' : `$${formatMoney(opt.priceCents)}`}) - {opt.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Summary Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${formatMoney(summary.productPriceCents)}</span>
              </div>

              {summary.discountCents > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-${formatMoney(summary.discountCents)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-slate-900">
                  {summary.shippingCostCents === 0 ? 'FREE' : `$${formatMoney(summary.shippingCostCents)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (10%)</span>
                <span className="font-semibold text-slate-900">${formatMoney(summary.taxCents)}</span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-slate-950 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-amber-600">${formatMoney(summary.totalCostCents)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              type="button"
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold py-3.5 rounded-xl shadow-lg shadow-amber-400/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-sm"
              onClick={() => {
                closeCart();
                navigate('/checkout');
              }}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck size={14} className="text-emerald-500" /> Secure 256-Bit SSL Encrypted Checkout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
