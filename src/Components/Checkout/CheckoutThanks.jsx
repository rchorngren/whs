import React from 'react';
import './CheckoutThanks.css';
import{ actions } from '../../Features/activeView';
import { useDispatch } from 'react-redux';

const CheckoutThanks = () => {

    const dispatch = useDispatch();


    return ( 
        <div className='container'>
            <div className='thanksContainer'>
                <div>
                    <div id='thanks'>Thank you</div>
                    <div id='foryour'>for your</div>
                    <div id='purchase'>Purchase!</div>
                </div>
                
                <div id='link'>A download link will soon be sent to your email</div>
                <button id='goBack' onClick={() => dispatch(actions.empty())}>Thanks</button>
            </div>
            
        </div>
    )
}

export default CheckoutThanks;