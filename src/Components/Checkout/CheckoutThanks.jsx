import React, { useState } from 'react';
import './CheckoutThanks.css';
import{ actions } from '../../Features/activeView';
import { useDispatch } from 'react-redux';

const CheckoutThanks = () => {

    const dispatch = useDispatch();
    const [buttonClicked, setButtonClicked] = useState(false)

    function animationOnClick() {
        setTimeout(() => {
            setButtonClicked(false);
        }, 150);
        setTimeout(() => {
            dispatch(actions.empty());
        }, 250);
    }

    return ( 
        <div className='container'>
            <div className='thanksContainer'>
                <div>
                    <div id='thanks'>Thank you</div>
                    <div id='foryour'>for your</div>
                    <div id='purchase'>Purchase!</div>
                </div>
                
                <div id='link'>A download link will soon be sent to your email</div>
                <button className={ buttonClicked ? 'goBack click' : 'goBack'} 
                    onClick={() => {
                        animationOnClick();
                        setButtonClicked(true);
                    }}>Thanks</button>
            </div>
            
        </div>
    )
}

export default CheckoutThanks;