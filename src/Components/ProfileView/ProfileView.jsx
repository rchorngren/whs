import { useEffect, useState } from "react";
import firebase from 'firebase';
import { useDispatch } from "react-redux";
import { actions as activeViewActions } from '../../Features/activeView';
import { actions as loggedinUserActions } from '../../Features/loggedinUser';
import './ProfileView.css';

const ProfileView = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState(null);

    const dispatch = useDispatch();

    //displays the status message and removes it after 5s
    function displayStatus(message) {
        setStatusMessage(message);
        setTimeout(() => {
            setStatusMessage('');
        }, 5000);
    }

    function updatePassword() {
        const user = firebase.auth().currentUser;
        if (user != null) {
            if (newPassword === confirmNewPassword && newPassword.length > 5) {
                user.updatePassword(newPassword).then(() => {
                    setNewPassword('');
                    setConfirmNewPassword('');
                    displayStatus('Password updated');
                }).catch((error) => {
                    displayStatus('There was an error - ', error);
                });
            } else {
                displayStatus('Error - password does not match or is too short');
            }
        }
    }

    function logoutUser() {
        localStorage.removeItem('currentUser');
        firebase.auth().signOut().then(() => {
            dispatch(loggedinUserActions.loggedout());
            dispatch(activeViewActions.login());
        }).catch((error) => {
            displayStatus('Error - ', error);
        })
    }

    function getCurrentUser() {
        const user = firebase.auth().currentUser;
        if (user != null) {
            setCurrentUser(user.email);
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <div className="p-r-content">
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 18, paddingTop: '15px' }}>{currentUser ? currentUser : 'Loading...'}</div>
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

            <div className="status-message-container">
                {statusMessage}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="call-to-action-button-profile update-password-button"
                    onClick={updatePassword}>Update password</div>
                <div className="call-to-action-button-profile logout-button"
                    onClick={logoutUser}>Logout</div>
            </div>
        </div>
    )
}

export default ProfileView;