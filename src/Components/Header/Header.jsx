import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, ACTIVEVIEW } from '../../Features/activeView';
import ShoppingCart from '../../Assets/Images/shoppingCart.png';
import './Header.css';

const Header = () => {
    const [shoppingCartButtonIsClicked, setShoppingCartButtonIsClicked] = useState(false);
    const [menuButtonIsClicked, setMenuButtonIsClicked] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const activeView = useSelector(state => state.activeView.activeView);

    useEffect(() => {
        if (activeView === ACTIVEVIEW.MENU) {
            setMenuOpen(true);
        } else {
            setMenuOpen(false);
        }
    }, [activeView]);

    const dispatch = useDispatch();

    function animationOnClick(dispatch, clickedButton) {
        setTimeout(() => {
            setShoppingCartButtonIsClicked(false);
        }, 100);
        setTimeout(() => {
            if (clickedButton === 'baskedClicked') {
                setMenuButtonIsClicked(false);
                dispatch(actions.checkout());
            } else {
                if (menuButtonIsClicked) {
                    setMenuButtonIsClicked(!menuButtonIsClicked);
                    dispatch(actions.empty());
                } else {
                    dispatch(actions.menu());
                }
            } 
        }, 250);
    }
    return (
        <header className="header">
            <div
                className="menuButton buttonGeneral"
                onClick={() => { setMenuButtonIsClicked(true); animationOnClick(dispatch, 'menuClicked') }}>
                <div className="menuContainer">
                    {menuOpen ? (
                        //when menu is open
                        <div>
                            <div className="menuRowOpenA" />
                            <div className="menuRowOpenB" />
                        </div>

                    ) : (
                        //when menu is closed
                        <div>
                            <div className="menuRow" />
                            <div className="menuRow" />
                            <div className="menuRow" />
                        </div>
                    )}
                </div>

            </div>

            <div style={{marginRight: '-10px'}}>
                <h2>WHS</h2>
            </div>

            <div
                className="shoppingcartButton buttonGeneral"
                onClick={() => { setShoppingCartButtonIsClicked(true); animationOnClick(dispatch, 'baskedClicked') }}>
                <img
                    className={shoppingCartButtonIsClicked ? "buttonImageClicked" : "buttonImage"}
                    src={ShoppingCart} alt="" />
            </div>
        </header>
    )
}

export default Header;