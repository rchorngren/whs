import './OrderhistoryView.css';
import { actions } from '../../Features/activeView';
import { useDispatch } from 'react-redux';

const OrderhistoryView = () => {
    const dispatch = useDispatch();

    return (
        <div className="orderhistory-container">
                        
            <div className="order-container">
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
            </div>

        </div>
    )
}

export default OrderhistoryView;