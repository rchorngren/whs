import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../Features/activeView';
import BasketCounter from './BasketCounter';
import ShoppingCart from '../Assets/Images/shoppingCart.png';


const Footer = () => {

    //TODO: connect state to redux value of itemsInBasket instead of fixed value
    const [itemsInBasket] = useState(1);
    const [buttonIsClicked, setButtonIsClicked] = useState(false);

    const dispatch = useDispatch();

    const style = {
        footer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "fixed",
            bottom: 0,
            height: 95,
            width: "100%",
            borderTop: "1px solid black",
            background: "#C4C4C4"
        },
        shoppingcartButton: {
            marginRight: 25,
        },
        buttonImage: {
            width: 40,
            height: 40
        },
        buttonImageClicked: {
            width: 35,
            height: 35,
        },
        buttonGeneral: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            borderRadius: 15,
            border: "1px solid black",
            background: "white"
        },
    }

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
        <footer style={style.footer}>
            <div
                style={{ ...style.shoppingcartButton, ...style.buttonGeneral }}
                onClick={() => { setButtonIsClicked(true); animationOnClick(dispatch) }}>
                <img
                    style={buttonIsClicked ? style.buttonImageClicked : style.buttonImage}
                    src={ShoppingCart} />
                {itemsInBasket > 0 ? <BasketCounter /> : null}
            </div>
        </footer>
    )
}

export default Footer;