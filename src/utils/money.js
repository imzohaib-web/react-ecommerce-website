/**
 * Formats a price in cents to a 2-decimal place string (e.g. 1090 -> "10.90")
 */
export function formatMoney(priceCents) {
  if (typeof priceCents !== 'number' || isNaN(priceCents)) return '0.00';
  return (Math.round(priceCents) / 100).toFixed(2);
}