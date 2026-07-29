import { Fragment } from 'react';
import dayjs from 'dayjs';

export function OrderProduct({ order, orderProduct }) {
    return (
        <Fragment>
            <div className="product-image-container">
                <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
                <div className="product-name">
                    {orderProduct.product.name}
                </div>
                <div className="product-delivery-date">
                    Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                </div>
                <div className="product-quantity">
                    Quantity: {orderProduct.quantity}
                </div>
                <button className="buy-again-button button-primary">
                    <img className="buy-again-icon" src="images/icons/buy-again.png" />
                    <span className="buy-again-message">Add to Cart</span>
                </button>
            </div>

            <div className="product-actions">
                <a href={`/tracking?orderId=${order.id}&productId=${orderProduct.productId}`}>
                    <button className="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
        </Fragment>
    )
}
