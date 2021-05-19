import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, ACTIVEVIEW } from '../Features/activeView';
import ProfileIcon from '../Assets/Images/profileIcon.png';

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

    const style = {
        header: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "10vh",
            borderBottom: "1px solid black",
            background: "#C4C4C4"
        },
        menuButton: {
            marginLeft: 25,
            display: "flex",
            flexDirection: "column",
            background: "white"
        },
        profileButton: {
            marginRight: 25,
            background: "white"
        },
        profileButtonLoggedIn: {
            marginRight: 25,
            background: '#548F25'
        },
        menuContainer: {
            display: "flex",
            flexDirection: "column",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: -5
        },
        menuRow: {
            height: 7,
            width: 50,
            marginTop: 5,
            background: "black"
        },
        menuRowOpenA: {
            height: 7,
            width: 50,
            marginTop: 5,
            transform: "rotate(45deg)",
            background: "black"
        },
        menuRowOpenB: {
            height: 7,
            width: 50,
            marginTop: -7.5,
            transform: "rotate(135deg)",
            background: "black"
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
            cursor: 'pointer',
            border: "1px solid black",
        }
    }

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
        <header style={style.header}>
            <div
                style={{ ...style.menuButton, ...style.buttonGeneral }}
                onClick={() => { setMenuButtonIsClicked(true); animationOnClick(dispatch, 'menuClicked') }}>
                <div style={style.menuContainer}>
                    {menuOpen ? (
                        //when menu is open
                        <div>
                            <div style={style.menuRowOpenA} />
                            <div style={style.menuRowOpenB} />
                        </div>

                    ) : (
                        //when menu is closed
                        <div>
                            <div style={style.menuRow} />
                            <div style={style.menuRow} />
                            <div style={style.menuRow} />
                        </div>
                    )}
                </div>

            </div>

            <h2>WHS</h2>

            <div
                style={userLoggedIn ? (
                    //styling if user is logged in
                    { ...style.profileButtonLoggedIn, ...style.buttonGeneral }
                ) : (
                    //styling if user is not logged in
                    { ...style.profileButton, ...style.buttonGeneral }
                )}
                onClick={() => { setProfileButtonIsClicked(true); animationOnClick(dispatch, 'profileClicked') }}>
                <img
                    style={profileButtonIsClicked ? style.buttonImageClicked : style.buttonImage}
                    src={ProfileIcon} alt="" />
            </div>
        </header>
    )
}

export default Header;