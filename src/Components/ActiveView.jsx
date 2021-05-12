import { useSelector } from 'react-redux';
import { ACTIVEVIEW } from '../Features/activeView';


const ActiveView = () => {
    const activeView = useSelector(state => state.activeView.activeView);
    let content = null;

    if (activeView === ACTIVEVIEW.CHECKOUT) {
        content = 'checkout component goes here';
    } else if (activeView === ACTIVEVIEW.PROFILE) {
        content = 'profile component goes here';
    } else if (activeView === ACTIVEVIEW.LOGIN) {
        content = 'login component goes here';
    } else if (activeView === ACTIVEVIEW.MENU) {
        content = 'genre menu component goes here';
    } else {
        content = 'Default view component goes here';
    }


    return (
        <div>
            {content}
        </div>
    )
}

export default ActiveView;