import { useState } from "react";
import firebase from 'firebase';
import { useDispatch } from "react-redux";
import { actions as activeViewActions } from '../../Features/activeView';
import { actions as loggedinUserActions } from '../../Features/loggedinUser';



const ProfileView = () => {
    const [currenPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const dispatch = useDispatch();

    function updatePassword() {
        console.log('trying to update password of current user');
        console.log('currentPassword: ', currenPassword);
        console.log('newPassword: ', newPassword);
        console.log('confirmNewPassword: ', confirmNewPassword);
    }

    function logoutUser() {
        localStorage.removeItem('currentUser');
        console.log('logging out current user');
        firebase.auth().signOut().then(() => {
            console.log('signout Successfully');
            dispatch(loggedinUserActions.loggedout());
            dispatch(activeViewActions.login());
        }).catch((error) => {
            console.log('there was an error while signing out: ', error);
        })
    }

    return (
        <div className="p-r-content">
            <div style={{ display: "flex", flexDirection: "column" }}>
                <input type="password"
                    className="text-input-profile"
                    placeholder="Current password"
                    value={currenPassword}
                    onInput={e => setCurrentPassword(e.target.value)} />

                <input type="password"
                    className="text-input-profile"
                    placeholder="New password" 
                    value={newPassword}
                    onInput={e => setNewPassword(e.target.value)} />

                <input type="password"
                    className="text-input-profile"
                    placeholder="Confirm new password" 
                    value={confirmNewPassword}
                    onInput={e => setConfirmNewPassword(e.target.value)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="call-to-action-button-profile save-button"
                    onClick={updatePassword}>Update password</div>
                <div className="call-to-action-button-profile logout-button"
                    onClick={logoutUser}>Logout</div>
            </div>
        </div>
    )
}

export default ProfileView;