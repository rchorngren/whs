import React from 'react';
import './CheckoutThanks.css';

const CheckoutThanks = () => {




    return ( 
        <div className='container'>
            <div className='thanksContainer'>
                <div>
                    <div id='thanks'>Thank you</div>
                    <div id='foryour'>for your</div>
                    <div id='purchase'>Purchase!</div>
                </div>
                
                <div id='link'>A download link will soon be sent to your email</div>
                <button id='goBack'>Thanks</button>
            </div>
            
        </div>
    )
}

export default CheckoutThanks;