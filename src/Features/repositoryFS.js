/**************************************************************************************/
/*                              repositoryFS.js                                       */
/*                                                                                    */
/*  A collenction  of useful functionen used to get data from Firestore.              */
/**************************************************************************************/
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const db = firebase.firestore();

/**************************************************************************************/
/*                                createOrder() - Async                               */
/*                                                                                    */
/*  Creates a new Order in Firestore connected to the user (localStorage.currentUser).*/
/*  Parameter:                                                                        */
/*      First: An array of movieIDs                                                   */
/*      Second: A function (preferebly used to know when async is finnished)          */
/*                                                                                    */
/*  Usage: 

import { useEffect, useState} from 'react';
import { createOrder } from '../../Features/repositoryFS';

const Test = () => {
    const [fsQueryDone, setFsQueryDone] = useState(false);
    const [content, setContent] = useState('Hello world!');
    let orderList = [603, 503736];

    useEffect(() => {   // Make sure it only run once
        createOrder(orderList, () => setFsQueryDone(true))
    }, []);

    useEffect(() => {
        if (fsQueryDone){
            setContent('Thank you for your order!');
        }
    }, [fsQueryDone]);

    return (
        <div>{content}</div>
    );
}

export default Test;

***************************************************************************************/
export async function createOrder(movieIDs, done) {
    if (checkMovieIDs(movieIDs)) {
        let noOfQuerys = 1;
        let userId = 'Li4sUlGWF2fYe0Yy8oh7lLSIzpi1';
        if (localStorage.currentUser !== undefined) {
            let userCred = JSON.parse(localStorage.currentUser);
            userId = userCred.user.uid;
        }
        let totalPrice = 4.99;
        if (Array.isArray(movieIDs)) {
            noOfQuerys = movieIDs.length;
            totalPrice = movieIDs.length * 4.99;
        }

        if (1 !== 1) {
            db.collection('Users').doc(userId).collection('Orders')
                .add({
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    total: totalPrice
                })
                .then(docRef => {
                    if (Array.isArray(movieIDs)) {
                        for (let i = 0; i < movieIDs.length; i++) {
                            db.collection('Users').doc(userId).collection('Orders').doc(docRef.id).collection('Items')
                                .add({
                                    created: firebase.firestore.FieldValue.serverTimestamp(),
                                    movieID: movieIDs[i],
                                    price: 4.99
                                })
                                .then(() => {
                                    noOfQuerys--;
                                    if (noOfQuerys === 0){done()}
                                })
                        }
                    }
                    else {
                        db.collection('Users').doc(userId).collection('Orders').doc(docRef.id).collection('Items')
                            .add({
                                created: firebase.firestore.FieldValue.serverTimestamp(),
                                movieID: movieIDs,
                                price: 4.99
                            })
                            .then(done())
                    }
                })
        }
    }
};

export async function getOrders() {
    let userId = '';
    if (localStorage.currentUser !== undefined) {
        let userCred = JSON.parse(localStorage.currentUser);
        userId = userCred.user.uid;
    } else {
        return null;
    }

    const docRef = db.collection('Users').doc(userId).collection('Orders');

    const response = docRef;
    const data = await response.get();
    console.log('items0');
    data.docs.forEach(item => {
        console.log('items ' + item.id)
    })

    docRef.doc('sWff6IJNFAxs0LPtXEj9')
        .get()
        .then((doc) => {
            if (doc.exists) {
                let data = doc.data();
                console.log("Document data:", data);
                console.log('total ' + data.total);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })


    // const data = await svar.data();
    // console.log(data);
}

function checkMovieIDs(arr) {
    if (Array.isArray(arr)) {
        for (let i = 0; i < arr.length; i++) {
            if (isNaN(arr[i])) {
                return false;
            }
        }
        return true;
    } else {
        if (isNaN(arr)) {
            return false;
        } else {
            return true;
        }
    }
}

