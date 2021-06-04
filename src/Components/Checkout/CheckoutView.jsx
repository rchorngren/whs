
import React from 'react';
import './CheckoutView.css';


const CheckoutView = () => {


    return (
        <div className='checkoutContainer'>
            <div className='checkoutMovies'>
                <text>Checkout</text>
                <div className='moviesInCart'>
                    <div className='cart'>Movies</div>
                    <div id='price'>
                        <div className='totalPrice'>Total: </div>
                        <div className='combinedPrice'>10.00</div>
                    </div>
                </div>
                <div className='emailInput'>
                    <text>Email adress</text>
                    <input type="text" placeholder='Email' className='emailInputField'/>
                </div>
                <div>
                    <div className='ownerInformation'> 
                        <text>Payment information</text>
                        <input type="text" placeholder='Card owner' id='ownerName' className='holderInformation'/>
                        <input type="text" placeholder='Card number' id='cardNumber' className='holderInformation'/>
                    </div>
                
                    <div className='addCardInfo'>
                        <input type="text" placeholder='CCV' className='cardInfoInput'/>
                        <input type="text" placeholder='Valid until' className='cardInfoInput'/>
                    </div>
                </div>

                <button className='payButton'>Pay</button>
            </div>
        </div>
    )
}

export default CheckoutView;
