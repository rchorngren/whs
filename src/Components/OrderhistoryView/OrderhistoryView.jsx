import { useEffect } from "react";
import './OrderhistoryView.css';

const OrderhistoryView = () => {

    function createOrderHistory() {
        //loop through all orders - one order-container for each order
        //for each order, loop through all movies
    }

    useEffect(() => {
        console.log('fetch order history for user');
    }, []);

    return (
        <div className="orderhistory-container">

            <div className="order-container">
                <div className="order-individual-movie">
                    <div className="order-info-text">The Matrix</div>
                    <div className="order-info-text">Price: $4.99</div>
                </div>
                <div className="order-individual-movie uneven">
                    <div className="order-info-text">Matrix Reloaded</div>
                    <div className="order-info-text">Price: $4.99</div>
                </div>

                <div className="order-total-cost">
                    <div>Total price:</div>
                    <div>$9.98</div>
                </div>
            </div>

        </div>
    )
}

export default OrderhistoryView;