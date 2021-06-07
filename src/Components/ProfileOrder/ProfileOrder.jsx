import { useState } from 'react';
import ProfileView from '../ProfileView/ProfileView';
import { useDispatch } from 'react-redux';
import { actions } from '../../Features/activeView';
import './ProfileOrder.css';

const Profile = () => {
    const [tabToggle, setTabToggle] = useState(true);
    const dispatch = useDispatch();
   

    return (
        <div className="profile-component">
            <div className="profile-container">
                <div className="tab-container" onClick={() => setTabToggle(!tabToggle)}>
                    <div className={tabToggle ? "tab-general tab-left" : "tab-general tab-left tab-inactive"}>Profile</div>
                    <div className={!tabToggle ? "tab-general tab-right" : "tab-general tab-right tab-inactive"}>Order history</div>
                </div>
                
                {tabToggle ? (
                    <ProfileView />
                ) : (
                    <button onClick={() => {
                        //send user to ReviewPage
                        dispatch(actions.review())
                        
                    }} style={{width: '50%', margin: 'auto'}}>PLACEHOLDER</button>
                )}

            </div>
        </div >
    )

}

export default Profile;