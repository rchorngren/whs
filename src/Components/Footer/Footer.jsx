import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../Features/activeView';
import HomeIcon from '../../Assets/Images/homeIcon.svg';
import ProfileIcon from '../../Assets/Images/profileIcon.png';
import SearchIcon from '../../Assets/Images/searchIcon.svg';
import './Footer.css';

const Footer = () => {

    const loggedIn = useSelector(state => state.loggedinUser.loggedinUser);
    const [userLoggedIn, setUserLoggedIn] = useState(loggedIn);
    const [homeButtonIsClicked, setHomeButtonIsClicked] = useState(false);
    const [searchButtonIsClicked, setSearchButtonIsClicked] = useState(false);
    const [profileButtonIsClicked, setProfileButtonIsClicked] = useState(false);

    const dispatch = useDispatch();

    //Resets the styling first and then triggers the function of the button
    function animationOnClick(dispatch, clickedButton) {
        setTimeout(() => {
            if (clickedButton === 'homeButton') {
                setHomeButtonIsClicked(false);    
            } else if (clickedButton === 'searchButton') {
                setSearchButtonIsClicked(false);
            } else if (clickedButton === 'profileButton') {
                setProfileButtonIsClicked(false);
            }
        }, 100);
        setTimeout(() => {
            if (clickedButton === 'homeButton') {
                //dispatch home
                dispatch(actions.empty());
            } else if (clickedButton === 'pendingButton') {
                // dispatch whatever goes here
                dispatch(actions.empty());
            } else if (clickedButton === 'searchButton') {
                //dispatch search
                dispatch(actions.search());
            } else if (clickedButton === 'profileButton') {
                if(loggedIn) {
                    dispatch(actions.profile());
                } else {
                    dispatch(actions.login());
                }
            }
        }, 250);
    }
    
    useEffect(() => {
        setUserLoggedIn(loggedIn);
    }, [loggedIn]);

    return (
        <footer className="footer">

            <div
                className="buttonGeneral"
                onClick={() => { setHomeButtonIsClicked(true); animationOnClick(dispatch, 'homeButton') }}>
                <img
                    className={homeButtonIsClicked ? "buttonImageClicked" : "buttonImage"}
                    src={HomeIcon} alt="" />
            </div>

            <div
                className="buttonGeneral"
                onClick={() => { setSearchButtonIsClicked(true); animationOnClick(dispatch, 'searchButton') }}>
                <img
                    className={searchButtonIsClicked ? "buttonImageClicked" : "buttonImage"}
                    src={SearchIcon} alt="" />
            </div>

            <div
                className={userLoggedIn ? (
                    //styling if user is logged in
                    "profileButtonLoggedIn buttonGeneral"
                ) : (
                    //styling if user is not logged in
                    "buttonGeneral"
                )}
                onClick={() => { setProfileButtonIsClicked(true); animationOnClick(dispatch, 'profileButton') }}>
                <img
                    className={profileButtonIsClicked ? "buttonImageClicked" : "buttonImage"}
                    src={ProfileIcon} alt="" />
            </div>

        </footer>
    )
}

export default Footer;