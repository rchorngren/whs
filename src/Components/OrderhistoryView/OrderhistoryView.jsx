import { useEffect, useState } from "react";
import { getOrders } from '../../Features/repositoryFS';
import './OrderhistoryView.css';

const OrderhistoryView = () => {

    const [response, setResponse] = useState('');
    const [content, setContent] = useState('You have no previous orders');

    function createOrderHistory() {
        //loop through all orders - one order-container for each order
        //for each order, loop through all movies
    }

    useEffect(() => {
        getOrders().then((resp) => {
            console.log('resp:', resp);
            setResponse(JSON.parse(resp));
            console.log('response: ', response);
        }); //eslint-disable-next-line;
    }, []);

    useEffect(() => {
        if (response !== ''){
            if (response == null){
                setContent('User not logged in');
            } else if (response.orders.length === 0){
                setContent('No orders');
            } else {
                setContent('Date of first order: ' + response.orders[0].date);
            }
        }
    }, [response]);

    return (
        <div className="orderhistory-container">
            {content}
{/*             
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
 */}
        </div>
    )
}

export default OrderhistoryView;