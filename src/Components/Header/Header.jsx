import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, ACTIVEVIEW } from '../../Features/activeView';
import ProfileIcon from '../../Assets/Images/profileIcon.png';
import './Header.css';

const Header = () => {

    const [profileButtonIsClicked, setProfileButtonIsClicked] = useState(false);
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

    useEffect(() => {
        setUserLoggedIn(loggedIn);
    }, [loggedIn]);

    const dispatch = useDispatch();

    //Resets the styling first and then triggers the function of the button
    function animationOnClick(dispatch, clickedButton) {
        setTimeout(() => {
            setProfileButtonIsClicked(false);
        }, 100);
        setTimeout(() => {
            if (clickedButton === 'profileClicked') {
                setMenuButtonIsClicked(false);
                if (userLoggedIn) {
                    dispatch(actions.profile());
                } else {
                    dispatch(actions.login());
                }
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

            <h2>WHS</h2>

            <div
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
            </div>
        </header>
    )
}

export default Header;