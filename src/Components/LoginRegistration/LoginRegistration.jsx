import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { actions } from '../../Features/loggedinUser';
import './LoginRegistration.css';

const LoginRegistration = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [userName, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');

    const loggedin = useSelector(state => state.loggedinUser);

    const dispatch = useDispatch();
    console.log('loggedin: ', loggedin);

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

    return (
        // <div style={style.loginComponent}>
        <div className="loginComponent">
            {showLogin ? (
                <div className="loginContainer">
                    <h3>Login</h3>
                    <input type='text' className="textInput" placeholder="E-mail" value={userName} onInput={e => setUsername(e.target.value)} />
                    <input type='password' className="textInput" placeholder="Password" value={userPassword} onInput={e => setUserPassword(e.target.value)} />
                    <div className="loginButton" onClick={() => loginUser()}>Login</div>
                    <div className="newCustomerText" onClick={() => toggleLogin()}>
                        Not yet a customer? <br />
                        Click here to sign up
                    </div>
                </div>
            ) : (
                <div className="loginContainer">
                    <h3>Registration</h3>
                    <input type='text' className="textInput" placeholder="E-mail" value={userName} onInput={e => setUsername(e.target.value)} />
                    <input type='password' className="textInput" placeholder="Password" value={userPassword} onInput={e => setUserPassword(e.target.value)} />
                    <input type='password' className="textInput" placeholder="Confirm password" value={userPasswordConfirm} onInput={e => setUserPasswordConfirm(e.target.value)} />
                    <div className="registerButton" onClick={() => registerUser()}>Register</div>
                    <div className="newCustomerText" onClick={() => toggleLogin()}>
                        Back to login
                    </div>
                </div>
            )}


        </div>
    )
}

export default LoginRegistration;