
import React from 'react';
import './CheckoutView.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { createOrder } from '../../Features/repositoryFS';
import { actions } from '../../Features/customerBasket';
import{ actions as activeViewActions } from '../../Features/activeView';

const CheckoutView = () => {
 
    const [contentOfBasket, setContentOfBasket] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const currentBasket = useSelector(state => state.customerBasket.content);
    const dispatch = useDispatch();

    const [fsQueryDone, setFsQueryDone] = useState(false);
    
    function calculateTotalPrice(total, num) {
        return total + num;
    }

    let priceArray = [];
    const buildBasket = () => {
        setContentOfBasket(currentBasket.map((item, index) => {
            priceArray.push(item.price);
            let priceToSet = priceArray.reduce(calculateTotalPrice);
            let roundedPrice = Math.round((priceToSet + Number.EPSILON) * 100) / 100;
            setTotalPrice(roundedPrice);

            if(index % 2 === 0) {
                return(
                    <div className="basket-item-container" key={index}>
                        <div className="basket-item-title">{item.movieTitle}</div>
                        <div className="basket-item-price">${item.price}</div>
                        <div></div>
                    </div>
                )
            } else {
                return(
                    <div className="basket-item-container uneven" key={index}>
                    <div className="basket-item-title">{item.movieTitle}</div>
                    <div className="basket-item-price">${item.price}</div>
                    <div></div>
                </div>
                )
            }
        }));
    }

    function makePurchase() {
        let orderList = currentBasket;
        console.log('making purchase with orderList: ', orderList);
        createOrder(orderList, () => setFsQueryDone(true));
    }

    useEffect (() => {
        buildBasket();
        if(currentBasket.length === 0){
            setTotalPrice(0);
        }    
    }, [currentBasket]); 

    useEffect(() => {
        console.log('fsQuaryDone top: ', fsQueryDone);
        if(fsQueryDone) {
            console.log('fsQuaryDone if: ', fsQueryDone);
            dispatch(actions.emptyBasket());
            dispatch(activeViewActions.purchaseThanks());
        }
    }, [fsQueryDone]);


    return (
        <div className='checkoutContainer'>
            <div className='checkoutMovies'>
                <div id='checkout'>Checkout</div>
                <div className='moviesInCart'>
                    <div className='cart'>{contentOfBasket}</div>
                    <div id='price'>
                        <div className='totalPrice'>Total: </div>
                        <div className='combinedPrice'>${totalPrice}</div>
                    </div>
                </div>
                <div className='emailInput'>
                    <div id='emailAdress'>Email adress</div>
                    <input type="text" placeholder='Email' className='emailInputField'/>
                </div>
                <div>
                    <div className='ownerInformation'> 
                        <div id='payInfo'>Payment information</div>
                        <input type="text" placeholder='Card holder' id='ownerName' className='holderInformation'/>
                        <input type="text" placeholder='Card number' id='cardNumber' className='holderInformation'/>
                    </div>
                
                    <div className='addCardInfo'>
                        <input type="text" placeholder='CCV' className='cardInfoInput'/>
                        <input type="text" placeholder='Valid until' className='cardInfoInput'/>
                    </div>
                </div>

            <button className='payButton'  
                onClick={() => makePurchase()}>Pay</button>
            </div>
        </div>
    )
}

export default CheckoutView;
