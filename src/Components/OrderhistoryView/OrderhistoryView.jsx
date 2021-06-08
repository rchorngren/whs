import { useEffect, useState } from "react";
import { getOrders } from '../../Features/repositoryFS';
import './OrderhistoryView.css';

const OrderhistoryView = () => {

    const [response, setResponse] = useState('');
    const [content, setContent] = useState('');
    const [moviesOnOrder, setMoviesOnOrder] = useState([]);
    // const [moviesToMap, setMoviesToMap] = useState([]);
    
    function buildOrderHistory() {
        const responseToMap = response.orders;
        console.log('responseToMap: ', responseToMap[0].movies[0].movieid);

        setContent(responseToMap.map((item, index) => {
            let moviesToMaplocal = item.movies;
            
            setMoviesOnOrder(moviesToMaplocal.map((movieItem, movieIndex) => {
                console.log('movieItem.movieid: ', movieItem.movieid);
                return (
                    <div key={movieIndex}>{movieItem.movieid}</div>
                )
            }))

            return (
                <div className="order-container" key={index}>
                    <div className="order-info-text">Date of order: {item.date}</div>

                    <div>
                        {moviesOnOrder}
                    </div>

                    <div className="order-total-cost">
                        <div>Total price:</div>
                        <div>{item.totalsum}</div>
                    </div>

                </div>
            )
        }))
    }

    useEffect(() => {
        getOrders().then((resp) => {
            setResponse(JSON.parse(resp));
        }); //eslint-disable-next-line;
    }, []);

    useEffect(() => {
        if (response !== '') {
            if (response == null) {
                setContent('User not logged in');
            } else if (response.orders.length === 0) {
                setContent('No orders');
            } else {
                // setContent('Date of first order: ' + response.orders[0].date);
                if (response) {
                    buildOrderHistory();
                }

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