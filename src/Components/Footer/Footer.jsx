import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../Features/activeView';
import BasketCounter from '../BasketCounter/BasketCounter';
import ShoppingCart from '../../Assets/Images/shoppingCart.png';
import './Footer.css';

const Footer = () => {

    //TODO: connect state to redux value of itemsInBasket instead of fixed value
    const [itemsInBasket] = useState(1);
    const [buttonIsClicked, setButtonIsClicked] = useState(false);

    const dispatch = useDispatch();

    //Resets the styling first and then triggers the function of the button
    function animationOnClick(dispatch) {
        setTimeout(() => {
            setButtonIsClicked(false);
        }, 100);
        setTimeout(() => {
            dispatch(actions.checkout());
        }, 250);
    }

    return (
        <footer className="footer">
            <div
                className="shoppingcartButton buttonGeneral"
                onClick={() => { setButtonIsClicked(true); animationOnClick(dispatch) }}>
                <img
                    className={buttonIsClicked ? "buttonImageClicked" : "buttonImage"}
                    src={ShoppingCart} alt="" />
                {itemsInBasket > 0 ? <BasketCounter /> : null}
            </div>
        </footer>
    )
}

export default Footer;