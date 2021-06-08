import { useEffect, useState } from 'react';
import { getOrders } from '../../Features/repositoryFS';
import './OrderhistoryView.css';
import { actions } from '../../Features/activeView';
import { useDispatch } from 'react-redux';

const OrderhistoryView = () => {
    const dispatch = useDispatch();

    const [response, setResponse] = useState('');
    const [orders, setOrders] = useState([]);
    const [orderArray, setOrderArray] = useState([]);
    const [content, setContent] = useState('Loading');

    useEffect(() => {
        getOrders().then((resp) => {
            setResponse(JSON.parse(resp));
        }) // eslint-disable-next-line;
    }, []);

    useEffect(() => {
        if (response !== '') {
            if (response == null) {
                setContent('User not logged in');
            } else if (response.orders.length === 0) {
                setContent('No orders');
            } else {
                setOrders(response.orders);
            }
        }
    }, [response]);

    useEffect(() => {
        if (orders !== []) {
            setOrderArray(orders)
        }
    }, [orders]);

    return (
        <div className="orderhistory-container">
            {orderArray.length > 0 ?

                orderArray.map((item, index) =>

                    <div className="order-container" key={index}>

                        <div className="order-into-text">Order date: {item.date}</div>

                        {item.movies.map((movieItem, movieIndex) => (
                            <div className="order-individual-movie" key={movieIndex}>
                                <div className="order-info-text">{movieItem.title}</div>
                                <div className="order-info-text">Price: ${movieItem.price}</div>
                            </div>
                        ))}

                        <div className="order-total-cost">
                            <div>Total price:</div>
                            <div>${item.totalsum}</div>
                        </div>

                    </div>
                )
                :
                <div>{content}</div>}
        </div>

    )
}

export default OrderhistoryView;