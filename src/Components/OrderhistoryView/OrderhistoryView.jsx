import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../Features/activeView';
import { actions as movieToReviewActions } from '../../Features/movieToReview';
import { getOrders } from '../../Features/repositoryFS';
import './OrderhistoryView.css';
import { actions } from '../../Features/activeView';
import { useDispatch } from 'react-redux';

const OrderhistoryView = () => {
    const dispatch = useDispatch();

    const [response, setResponse] = useState('');
    const [orders, setOrders] = useState([]);
    const [orderArray, setOrderArray] = useState([]);
    const [content, setContent] = useState('Loading...');

    const dispatch = useDispatch();

    function startReviewView(movieid) {
        dispatch(movieToReviewActions.getMovieID(movieid));
        dispatch(actions.review());
    }

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
                setContent('You have no orders yet');
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

                        <div className="order-info-text">Order date: {item.date}</div>

                        <div className="underline" />

                        {item.movies.map((movieItem, movieIndex) => (
                            <div className="order-individual-movie" key={movieIndex} onClick={() => {startReviewView(movieItem.movieid)}}>
                                <div className="order-info-text">{movieItem.title}</div>
                                <div className="order-info-text">${movieItem.price}</div>
                            </div>
                        ))}

                        <div className="underline" />

                        <div className="order-total-cost">
                            <div>Total price:</div>
                            <div>${item.totalsum}</div>
                        </div>

                    </div>
                )
                :
                <div className="order-info-text">{content}</div>
            }
        </div>

    )
}

export default OrderhistoryView;