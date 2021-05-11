import React, { useState } from 'react';
import BasketCounter from './BasketCounter';
import ShoppingCart from '../Assets/Images/shoppingCart.png';

const Footer = () => {

    //TODO: connect state to redux value of itemsInBasket instead of fixed value
    const [itemsInBasket] = useState(1);
    const [buttonIsClicked, setButtonIsClicked] = useState(false);

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
            height: 35
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
        }
    }

    function animationOnClick() {
        setTimeout(() => {
            setButtonIsClicked(false);
        }, 100);
        setTimeout(() => {
            //TODO: Execute button function
            console.log('navigating...');
        }, 250);
    }

    return (
        <footer style={style.footer}>
            <div style={{ ...style.shoppingcartButton, ...style.buttonGeneral }}>
                <img
                    style={buttonIsClicked ? style.buttonImageClicked : style.buttonImage}
                    src={ShoppingCart}
                    onClick={() => {setButtonIsClicked(true); animationOnClick()}} />
                {itemsInBasket > 0 ? <BasketCounter /> : null}
            </div>
        </footer>
    )
}

export default Footer;