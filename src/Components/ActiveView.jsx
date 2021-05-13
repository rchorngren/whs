import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ACTIVEVIEW } from '../Features/activeView';


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

    useEffect(() => {
        if (menuActive) {
            setMenuActive(false);
        }
    }, [menuActive]);

    useEffect(() => {
        console.log('activeView: ', activeView);
        if (activeView === (ACTIVEVIEW.MENU || ACTIVEVIEW.DEFAULT)) {
        } else {
            setLastView(content);
        }
    }, [activeView]);

    return (
        <div>
            <div style={menuActive ? style.openMenu : style.closedMenu}>
                Menu component goes here
            </div>
            {content}
        </div>
    )
}

export default ActiveView;