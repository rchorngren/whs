import { useEffect, useState} from 'react';
import { getOrders } from '../../Features/repositoryFS';
import './OrderhistoryView.css';
import { actions } from '../../Features/activeView';
import { useDispatch } from 'react-redux';

const OrderhistoryView = () => {
    const dispatch = useDispatch();

    const [response, setResponse] = useState('');
    const [content, setContent] = useState(null);

    useEffect(() => {
        getOrders().then((resp) => {
            setResponse(JSON.parse(resp));
        }) // eslint-disable-next-line;
    }, []);

    useEffect(() => {
        if (response !== ''){
            if (response == null){
                setContent('User not logged in');
            } else if (response.orders.length === 0){
                setContent('No orders');
            } else {
                setContent('Date of first order: ' + response.orders[0].date);
                console.log('response: ', response.orders);
            }
        }
    }, [response]);


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