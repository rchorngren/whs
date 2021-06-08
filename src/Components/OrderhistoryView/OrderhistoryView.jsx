import { useEffect, useState } from 'react';
import { getOrders } from '../../Features/repositoryFS';
import './OrderhistoryView.css';
import { actions } from '../../Features/activeView';
import { useDispatch } from 'react-redux';

const OrderhistoryView = () => {
    const dispatch = useDispatch();

    const [response, setResponse] = useState('');
    const [orders, setOrders] = useState([]);
    const [content, setContent] = useState(null);

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
            let i;
            for (let i = 0; i < orders.length; i++) {
                console.log('Order date: ' + orders[i].date);
                for (let ii = 0; ii < orders[i].movies.length; ii++){
                    console.log('Item: ' + orders[i].movies[ii].title + ' - Price: only ' + orders[i].movies[ii].price);
                }
                // let singleOrder = { 'date': orders[i].date, 'totalsum': orders[i].totalsum, 'movies': orders[i].movies }

                console.log('Total price: ', orders[i].totalsum);
            }

        }
    }, [orders]);

    return (
        <div className="orderhistory-container">
            {content}

            {/* <div className="order-container">
                <div className="order-individual-movie">
                    <div className="order-info-text">The Matrix</div>
                    <div className="order-info-text">Price: $4.99   <button onClick={() => {
                        //send user to ReviewPage
                        dispatch(actions.review())
                    }}>PLACEHOLDER</button></div>
                  
                </div>
                <div className="order-individual-movie uneven">
                    <div className="order-info-text">Matrix Reloaded</div>
                    <div className="order-info-text">Price: $4.99 <button onClick={() => {
                        //send user to ReviewPage
                        dispatch(actions.review())
                    }}>PLACEHOLDER</button></div>
                </div>

                <div className="order-total-cost">
                    <div>Total price:</div>
                    <div>$9.98</div>
                </div>
            </div> */}

        </div>
    )
}

export default OrderhistoryView;