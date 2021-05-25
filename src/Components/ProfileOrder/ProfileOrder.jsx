import { useState } from 'react';
import ProfileView from '../ProfileView/ProfileView';
import './ProfileOrder.css';

const Profile = () => {

    const [tabToggle, setTabToggle] = useState(true);

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
                    null
                    //orderHistoryView goes here
                )}


            </div>
        </div >
    )

}

export default Profile;