import { OrderContainer } from './OrderContainer';

export function OrdersGrid({ orders }) {
    return (
        <div className="orders-grid">
            {orders.map((order) => {
                return (
                    <OrderContainer key={order.id} order={order} />
                )
            })}
        </div>
    )
}
