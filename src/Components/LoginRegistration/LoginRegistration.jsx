import master from '../../Assets/Images/master-monk.jpg';
import logo from '../../logo.png';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { actions } from '../../Features/loggedinUser';
import './LoginRegistration.css';
import { LOGGEDINUSER } from '../../Features/loggedinUser';
import { actions as activeViewActions } from '../../Features/activeView';

const LoginRegistration = () => {
    const status = useSelector(state => state.loggedinUser.loggedinUser);
    const [showLogin, setShowLogin] = useState(true);
    const [userName, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
    const [statusMessage, setStatusMessage] = useState(null);
    const [admView, setAdmView] = useState(false);
    const [endMsg, setEndMsg] = useState('');

    const dispatch = useDispatch();

    //maintains the values of input fields when toggling between login and registration
    function toggleLogin() {
        setUsername(userName);
        setUserPassword(userPassword);
        setUserPasswordConfirm(userPasswordConfirm);
        setShowLogin(!showLogin);
    }

    //displays the status message and removes it after 5s
    function displayStatus(message) {
        setStatusMessage(message);
        setTimeout(() => {
            setStatusMessage('');
        }, 5000);
    }

    function loginUser() {
        if (!userName || !userPassword) {
            displayStatus('Make sure both fields are filled in');
        } else {
            firebase.auth().signInWithEmailAndPassword(userName, userPassword)
                .then((userCredential) => {
                    loggHimIn(userCredential, 'Welcome back, dear user!');
                })
                .catch((error) => {
                    // let errorCode = error.code;
                    let errorMessage = error.message;
                    displayStatus(errorMessage);
                })
        }

    }

    function registerUser() {
        if (userPassword === userPasswordConfirm) {
            firebase.auth().createUserWithEmailAndPassword(userName, userPassword)
                .then((userCredential) => {
                    loggHimIn(userCredential, 'Thank you for choosing WHS!');
                    toggleLogin();
                })
                .catch((error) => {
                    // let errorCode = error.code;
                    let errorMessage = error.message;
                    displayStatus(errorMessage);
                });

        } else {
            displayStatus('password does not match');
        }
    }

    //html for login window
    function loginView() {
        return (
            <div className="login-registration-container">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input type='text' className="textInput" placeholder="E-mail" value={userName} onInput={e => setUsername(e.target.value)} />
                    <input type='password' className="textInput" placeholder="Password" value={userPassword} onInput={e => setUserPassword(e.target.value)} />
                </div>

                <div className="status-message-container-login">
                    {statusMessage}
                </div>

                <div className="call-to-action-button" onClick={() => loginUser()}>Login</div>
                <div className="newCustomerText" onClick={() => {
                    toggleLogin();
                    setUsername('');
                    setUserPassword('');
                    }}>
                    New to WHS? Register here!
                </div>
            </div>
        )
    }

    //html for registration window
    function registrationView() {
        return (

            <div className="login-registration-container">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input type='text' className="textInput" placeholder="E-mail" value={userName} onInput={e => setUsername(e.target.value)} />
                    <input type='password' className="textInput" placeholder="Password" value={userPassword} onInput={e => setUserPassword(e.target.value)} />
                    <input type='password' className="textInput" placeholder="Confirm password" value={userPasswordConfirm} onInput={e => setUserPasswordConfirm(e.target.value)} />
                </div>

                {!statusMessage ? (
                    <div className="call-to-action-button" onClick={() => registerUser()}>Register</div>
                ) : (
                    <div className="status-message-container-registration">{statusMessage}</div>
                )}

                <div className="newCustomerText" onClick={() => toggleLogin()}>
                    Back to login
                </div>
            </div>
        )
    }

    function loggHimIn(userCredential, msg) {
        if (userCredential.user.uid === 'g49gSTfDIhdj2jd97SfSFY6gIQH2') {
            setAdmView(true);
            msg = '';
        }
        localStorage.setItem('currentUser', JSON.stringify(userCredential));
        dispatch(actions.loggedin());
        setEndMsg(msg);
        setTimeout(() => {
            dispatch(activeViewActions.empty());
        }, 3000);
    }

    function logedInView() {
        return (
            <div className="login-end-screen">
                <img className={admView ? 'master' : 'user'} src={admView ? master : logo} alt="welcome" />
                {endMsg}
            </div>
        )
    }

    return (
        <div className="loginComponent">
            {showLogin ? (
                status === LOGGEDINUSER.LOGGEDIN ? logedInView() : loginView()
            ) : (
                registrationView()
            )}
        </div>
    )
}

export default LoginRegistration;