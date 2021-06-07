
import React from 'react';
import './CheckoutView.css';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../Features/customerBasket';
import { useState, useEffect } from 'react';


const CheckoutView = () => {
 
    const [contentOfBasket, setContentOfBasket] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const currentBasket = useSelector(state => state.customerBasket.content);

    let priceArray = [];

    function calculateTotalPrice(total, num) {
        return total + num;
    }

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

    useEffect (() => {
        buildBasket();
        if(currentBasket.length === 0){
            setTotalPrice(0);
        }
        

    }, [currentBasket]); 


    return (
        <div className='checkoutContainer'>
            <div className='checkoutMovies'>
                <text>Checkout</text>
                <div className='moviesInCart'>
                    <div className='cart'>{contentOfBasket}</div>
                    <div id='price'>
                        <div className='totalPrice'>Total: </div>
                        <div className='combinedPrice'>${totalPrice}</div>
                    </div>
                </div>
                <div className='emailInput'>
                    <text>Email adress</text>
                    <input type="text" placeholder='Email' className='emailInputField'/>
                </div>
                <div>
                    <div className='ownerInformation'> 
                        <text>Payment information</text>
                        <input type="text" placeholder='Card holder' id='ownerName' className='holderInformation'/>
                        <input type="text" placeholder='Card number' id='cardNumber' className='holderInformation'/>
                    </div>
                
                    <div className='addCardInfo'>
                        <input type="text" placeholder='CCV' className='cardInfoInput'/>
                        <input type="text" placeholder='Valid until' className='cardInfoInput'/>
                    </div>
                </div>

            <button className='payButton'  onClick={() => {

                }} 

                >Pay</button>
            </div>
        </div>
    )
}

export default CheckoutView;
