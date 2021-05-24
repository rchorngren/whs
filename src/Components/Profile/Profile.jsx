import './Profile.css';

const Profile = () => {

    return (
        <div className="profile-component">
            <div className="profile-container">
                <div className="tab-container">
                    <div className="tab-left">Profile</div>
                    <div className="tab-right">Order history</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    {/* <h6>Change your password</h6> */}
                    <input type="password" className="text-input" placeholder="Current password" />
                    <input type="password" className="text-input" placeholder="New password" />
                    <input type="password" className="text-input" placeholder="Confirm new password" />
                </div>

                {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input />
                <input />
            </div> */}

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="call-to-action-button-profile save-button" onClick={() => console.log('clicky!')}>Update password</div>
                <div className="call-to-action-button-profile logout-button" onClick={() => console.log('clicky!')}>Logout</div>
                </div>
            </div>
        </div>
    )

}

export default Profile;