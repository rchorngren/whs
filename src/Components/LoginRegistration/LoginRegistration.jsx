import { useState } from "react";
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import { actions } from '../../Features/loggedinUser';
import './LoginRegistration.css';

const LoginRegistration = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [userName, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
    const [registrationComplete, setRegistrationComplete] = useState(false);

    const dispatch = useDispatch();

    //maintains the values of input fields when toggling between login and registration
    function toggleLogin() {
        setUsername(userName);
        setUserPassword(userPassword);
        setUserPasswordConfirm(userPasswordConfirm);
        setShowLogin(!showLogin);
    }

    function loginUser() {
        if (!userName || !userPassword) {
            console.log('not all fields are filled in');
        } else {
            firebase.auth().signInWithEmailAndPassword(userName, userPassword)
                .then((userCredential) => {
                    console.log('logged in as: ', userCredential);
                    localStorage.setItem('currentUser', JSON.stringify(userCredential));
                    dispatch(actions.loggedin());
                })
                .catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log('there was an error during signing in: ', errorCode, ' , ', errorMessage);
                })
        }

    }

    function registerUser() {
        if (userPassword === userPasswordConfirm) {
            firebase.auth().createUserWithEmailAndPassword(userName, userPassword)
                .then((userCredential) => {
                    let user = userCredential.user;
                    console.log('registration complete: ', user);
                    console.log('userCredential: ', userCredential);
                    localStorage.setItem('currentUser', JSON.stringify(userCredential));
                    dispatch(actions.loggedin());
                    setRegistrationComplete(true);
                })
                .catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log('there was an error during registration: ', errorCode, ' , ', errorMessage);
                });

        } else {
            console.log('password does not match');
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

                <div className="call-to-action-button" onClick={() => loginUser()}>Login</div>
                <div className="newCustomerText" onClick={() => toggleLogin()}>
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

                <div className="call-to-action-button" onClick={() => registerUser()}>Register</div>
                <div className="newCustomerText" onClick={() => toggleLogin()}>
                    Back to login
                </div>
            </div>
        )
    }

    //html for successful registration
    function registrationDoneView() {
        return (
            <div className="login-registration-container">
                <h3>Thank you for choosing WHS!</h3>
                <div className="call-to-action-button" onClick={() => console.log('go to main view')}>Let the adventure begin!</div>
            </div>
        )
    }

    return (
        <div className="loginComponent">
            {showLogin ? (
                loginView()
            ) : (
                registrationComplete ? (
                    registrationDoneView()
                ) : (
                    registrationView()
                )
            )}
        </div>
    )
}

export default LoginRegistration;