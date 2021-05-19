import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { actions } from '../Features/loggedinUser';

const LoginRegistration = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [userName, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');

    const loggedin = useSelector(state => state.loggedinUser);

    const dispatch = useDispatch();
    console.log('loggedin: ', loggedin);

    const style = {
        loginComponent: {
            display: 'flex',
            height: '80vh',
            // width: '100vw'
        },
        loginContainer: {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '5vh',
            height: '40vh',
            width: '80vw',
            maxWidth: '800px',
            borderRadius: '15px',
            background: 'gray'
        },
        textInput: {
            height: '25px',
            width: '40vw',
            borderRadius: '10px',
            marginBottom: '10px',
            textAlign: 'center'
        },
        loginButton: {
            height: '25px',
            width: '40vw',
            marginTop: '41px',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: '1px solid black',
            borderRadius: '10px',
            cursor: 'pointer',
            userSelect: 'none',
            background: '#548F25'
        },
        registerButton: {
            height: '25px',
            width: '40vw',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: '1px solid black',
            borderRadius: '10px',
            cursor: 'pointer',
            userSelect: 'none',
            background: '#548F25'
        },
        newCustomerText: {
            marginTop: '20px',
            cursor: 'pointer',
            userSelect: 'none'
        }
    }

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
        <div style={style.loginComponent}>
            {showLogin ? (
                <div style={style.loginContainer}>
                    <h3>Login</h3>
                    <input type='text' style={style.textInput} placeholder="E-mail" value={userName} onInput={e => setUsername(e.target.value)} />
                    <input type='password' style={style.textInput} placeholder="Password" value={userPassword} onInput={e => setUserPassword(e.target.value)} />
                    <div style={style.loginButton} onClick={() => loginUser()}>Login</div>
                    <div style={style.newCustomerText} onClick={() => toggleLogin()}>
                        Not yet a customer? <br />
                        Click here to sign up
                    </div>
                </div>
            ) : (
                <div style={style.loginContainer}>
                    <h3>Registration</h3>
                    <input type='text' style={style.textInput} placeholder="E-mail" value={userName} onInput={e => setUsername(e.target.value)} />
                    <input type='password' style={style.textInput} placeholder="Password" value={userPassword} onInput={e => setUserPassword(e.target.value)} />
                    <input type='password' style={style.textInput} placeholder="Confirm password" value={userPasswordConfirm} onInput={e => setUserPasswordConfirm(e.target.value)} />
                    <div style={style.registerButton} onClick={() => registerUser()}>Register</div>
                    <div style={style.newCustomerText} onClick={() => toggleLogin()}>
                        Back to login
                    </div>
                </div>
            )}


        </div>
    )
}

export default LoginRegistration;