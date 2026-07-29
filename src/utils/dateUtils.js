import dayjs from 'dayjs';

/**
 * Formats a date or timestamp into a friendly display string (e.g. "Tuesday, June 21")
 */
export function formatDate(dateInput) {
  if (!dateInput) return '';
  return dayjs(dateInput).format('dddd, MMMM D');
}

/**
 * Calculates estimated delivery time string based on delivery days
 */
export function getEstimatedDeliveryDate(deliveryDays = 7) {
  return dayjs().add(deliveryDays, 'day').format('dddd, MMMM D');
}

/**
 * Returns estimated delivery timestamp (in milliseconds) given delivery days offset
 */
export function getEstimatedDeliveryMs(deliveryDays = 7) {
  return dayjs().add(deliveryDays, 'day').valueOf();
}
