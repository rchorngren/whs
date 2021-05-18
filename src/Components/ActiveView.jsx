import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIVEVIEW } from '../Features/activeView';
import GenreMenu from './GenreSidebar/GenreMenu';
import { actions as loggedInActions } from '../Features/loggedinUser';

import LoginRegistration from './LoginRegistration';


const ActiveView = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [lastView, setLastView] = useState(null);
    const activeView = useSelector(state => state.activeView.activeView);
    let content = null;

    const currentUserUnparsed = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserUnparsed);
    const dispatch = useDispatch();

    const style = {
        openMenu: {
            position: "fixed",
            minWidth: "75vw",
            maxWidth: "100vw",
            height: "calc(80vh - 2px)",
            background: 'gray',
            zIndex: 10,
            borderRight: '1px solid black',
            transition: "slide 3s forwards",
            left: 0
        },
        closedMenu: {
            position: "fixed",
            width: 0,
            height: "80vh",
            overflow: "hidden",
            left: 0,
            zIndex: 10
        }
    }

    //uses state from redux to display active component
    if (activeView === ACTIVEVIEW.CHECKOUT) {
        content = 'checkout component goes here';
    } else if (activeView === ACTIVEVIEW.PROFILE) {
        // content = 'profile component goes here';
        //TODO: remove temporary button
        content = <button onClick={() => {localStorage.removeItem('currentUser')}}>Wipe LocalStorage</button>
    } else if (activeView === ACTIVEVIEW.LOGIN) {
        content = <LoginRegistration />
    } else if (activeView === ACTIVEVIEW.MENU) {
        content = lastView;
        if (!menuActive) {
            setMenuActive(true);
        }
    }
    else {
        content = lastView;
    }

    //separate useEffect when closing side menu to avoid loop
    useEffect(() => {
        if (menuActive) {
            setMenuActive(false);
        }
    }, [menuActive]);

    //saving current active component so it displays when side menu closes
    useEffect(() => {
        if (activeView !== (ACTIVEVIEW.MENU || ACTIVEVIEW.DEFAULT)) {
            setLastView(content);
        }
    }, [activeView]); // eslint-disable-line react-hooks/exhaustive-deps

    //checks localstorage for previous loggedin user
    useEffect(() => {
            if(currentUser && currentUser.operationType === 'signIn') {
                dispatch(loggedInActions.loggedin());
            }

    }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div style={menuActive ? style.openMenu : style.closedMenu}>
                {/* Menu component goes here */}
                <GenreMenu/>
            </div>
            {content}
        </div>
    )
}

export default ActiveView;