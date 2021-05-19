import { useEffect, useState } from "react";
import db from '../firebase.config';

const LoginRegistration = () => {
    const [firebaseData, setFirebaseData] = useState([]);
    const [showLogin, setShowLogin] = useState(true);

    const style = {
        loginComponent: {
            display: 'flex',
            height: '80vh',
            width: '100vw'
        },
        loginContainer: {
            // display: 'flex',
            // flexDirection: 'column',
            // justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '5vh',
            height: '60vh',
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
            marginLeft: 'auto',
            marginRight: 'auto',
            border: '1px solid black',
            borderRadius: '10px',
            cursor: 'pointer',
            background: '#548F25'
        },
        newCustomerText: {
            marginTop: '20px',
            cursor: 'pointer'
        }
    }

    const getDataFromFirestore = async () => {
        console.log('running getDataFromFirestore');
        const response = db.collection('Test');
        const data = await response.get();
        data.docs.forEach(item => {
            setFirebaseData([...firebaseData, item.data()]);

        });
    }

    useEffect(() => {
        // getDataFromFirestore();

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={style.loginComponent}>
            {showLogin ? (
                <div style={style.loginContainer}>
                    <h3>Login</h3>
                    <input type='text' style={style.textInput} placeholder="Username" />
                    <input type='password' style={style.textInput} placeholder="Password" />
                    <div style={style.loginButton}>Login</div>
                    <div style={style.newCustomerText} onClick={() => { setShowLogin(!showLogin) }}>
                        Not yet a customer? <br />
                        Click here to sign up
                    </div>
                </div>
            ) : (
                null
            )}


        </div>
    )
}

export default LoginRegistration;