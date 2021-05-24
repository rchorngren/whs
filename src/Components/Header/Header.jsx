import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, ACTIVEVIEW } from '../../Features/activeView';
// import ProfileIcon from '../../Assets/Images/profileIcon.png';
import BasketCounter from '../BasketCounter/BasketCounter';
import ShoppingCart from '../../Assets/Images/shoppingCart.png';
import './Header.css';

const Header = () => {
    const [itemsInBasket] = useState(1);
    const [shoppingCartButtonIsClicked, setShoppingCartButtonIsClicked] = useState(false);
    const [menuButtonIsClicked, setMenuButtonIsClicked] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    const loggedIn = useSelector(state => state.loggedinUser.loggedinUser);
    const [userLoggedIn, setUserLoggedIn] = useState(loggedIn);

    const activeView = useSelector(state => state.activeView.activeView);

    useEffect(() => {
        if (activeView === ACTIVEVIEW.MENU) {
            setMenuOpen(true);
        } else {
            setMenuOpen(false);
        }
    }, [activeView]);

    // useEffect(() => {
    //     setUserLoggedIn(loggedIn);
    // }, [loggedIn]);

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

    //Resets the styling first and then triggers the function of the button
    // function animationOnClick(dispatch, clickedButton) {
    //     setTimeout(() => {
    //         setProfileButtonIsClicked(false);
    //     }, 100);
    //     setTimeout(() => {
    //         if (clickedButton === 'baskedClicked') {
    //             setMenuButtonIsClicked(false);
    //             if (userLoggedIn) {
    //                 // dispatch(actions.profile());
    //                 dispatch(actions.checkout());
    //             } else {
    //                 dispatch(actions.login());
    //             }
    //         } else {
    //             if (menuButtonIsClicked) {
    //                 setMenuButtonIsClicked(!menuButtonIsClicked);
    //                 dispatch(actions.empty());
    //             } else {
    //                 dispatch(actions.menu());
    //             }
    //         }
    //     }, 250);
    // }


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

            <h2>WHS</h2>

            {/* <div
                className={userLoggedIn ? (
                    //styling if user is logged in
                    "profileButtonLoggedIn buttonGeneral"
                ) : (
                    //styling if user is not logged in
                    "profileButton buttonGeneral"
                )}
                onClick={() => { setProfileButtonIsClicked(true); animationOnClick(dispatch, 'profileClicked') }}>
                <img
                    className={profileButtonIsClicked ? "buttonImageClicked" : "buttonImage"}
                    src={ProfileIcon} alt="" />
            </div> */}
            <div
                className="shoppingcartButton buttonGeneral"
                onClick={() => { setShoppingCartButtonIsClicked(true); animationOnClick(dispatch, 'baskedClicked') }}>
                <img
                    className={shoppingCartButtonIsClicked ? "buttonImageClicked" : "buttonImage"}
                    src={ShoppingCart} alt="" />
                {/* {itemsInBasket > 0 ? <BasketCounter /> : null} */}
            </div>
        </header>
    )
}

export default Header;