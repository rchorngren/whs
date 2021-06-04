import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIVEVIEW } from '../../Features/activeView';
import GenreMenu from '../GenreSidebar/GenreMenu';
import { actions as loggedInActions } from '../../Features/loggedinUser';
import { actions as sideMenuActions } from '../../Features/sideMenu';
import LoginRegistration from '../LoginRegistration/LoginRegistration';
import SelectedMovie from '../SelectedMovie/SelectedMovie';
import Profile from '../ProfileOrder/ProfileOrder';
import HomePage from '../HomePage/HomePage';
import Search from '../Search/Search';
import ChosenGenre from '../ShowGenreMovies/ChosenGenre';
import BasketView from '../BasketView/BasketView';
import CheckoutView  from '../Checkout/CheckoutView';
import CheckoutThanks from '../Checkout/CheckoutThanks';
import './ActiveView.css';

const ActiveView = () => {
    const menuStatus = useSelector(state => state.sideMenu.sideMenu);
    const [menuActive, setMenuActive] = useState(false);
    const activeView = useSelector(state => state.activeView.activeView);
    const currentUserUnparsed = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserUnparsed);
    const dispatch = useDispatch();

    let content = null;

    //uses state from redux to display active component
    if (activeView === ACTIVEVIEW.CHECKOUT) {
        content = <BasketView />
    } else if (activeView === ACTIVEVIEW.PROFILE) {
        content = <Profile />
    } else if (activeView === ACTIVEVIEW.LOGIN) {
        content = <LoginRegistration />
    } else if (activeView === ACTIVEVIEW.DEFAULT) {
        //content = <HomePage />
        //content = <CheckoutView/>
        content = <CheckoutThanks/>
    } else if (activeView === ACTIVEVIEW.SEARCH) {
        content = <Search />
    } else if (activeView === ACTIVEVIEW.SELECTEDMOVIE) {
        content = <SelectedMovie />
    } else if (activeView === ACTIVEVIEW.CHOSENGENRE) {
        content = <ChosenGenre />
    }
    else { 
        content = <HomePage />
    }

    //separate useEffect when closing side menu to avoid loop
    useEffect(() => {
        if (menuStatus) {
            setMenuActive(true);
        } else if (menuStatus === false) {
            setMenuActive(false)
        }
    }, [menuStatus]);

    //closes side menu when activeView is updated
    useEffect(() => {
        dispatch(sideMenuActions.menuClosed());
    }, [activeView]); // eslint-disable-line react-hooks/exhaustive-deps

    //checks localstorage for previous loggedin user
    useEffect(() => {
            if(currentUser && currentUser.operationType === 'signIn') {
                dispatch(loggedInActions.loggedin());
            }

    }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

    //content = <CheckoutView/>

    return (
        <div>
            <div className={menuActive ? "openMenu" : "closedMenu"}>
                <GenreMenu />
            </div>
            {content}
        </div>
    )
}

export default ActiveView;