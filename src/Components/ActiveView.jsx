import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ACTIVEVIEW } from '../Features/activeView';
import GenreMenu from './GenreSidebar/GenreMenu';


const ActiveView = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [lastView, setLastView] = useState(null);
    const activeView = useSelector(state => state.activeView.activeView);
    let content = null;

    const style = {
        openMenu: {
            position: "fixed",
            minWidth: "80vw",
            maxWidth: "100vw",
            height: "80vh",
            background: 'gray',
            zIndex: 10,
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
        content = 'profile component goes here';
    } else if (activeView === ACTIVEVIEW.LOGIN) {
        content = 'login component goes here';
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
    }, [activeView]);

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