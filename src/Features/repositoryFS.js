/**************************************************************************************/
/*                              repositoryFS.js                                       */
/*                                                                                    */
/*  A collenction  of useful functionen used to get data from Firestore.              */
/**************************************************************************************/
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const db = firebase.firestore();

export const createOrder = (movieIDs) => {
    if (checkMovieIDs(movieIDs)) {
        let userId = 'Li4sUlGWF2fYe0Yy8oh7lLSIzpi1';
        let totalPrice = 4.99;
        if (Array.isArray(movieIDs)) {
            totalPrice = movieIDs.length * 4.99;
        }
        if (localStorage.currentUser !== undefined) {
            let userCred = JSON.parse(localStorage.currentUser);
            userId = userCred.user.uid;
        }
        db.collection('Users').doc(userId).collection('Orders')
            .add({
                created: firebase.firestore.FieldValue.serverTimestamp(),
                total: totalPrice
            })
            .then(docRef => {
                console.log(docRef.id);
                if (Array.isArray(movieIDs)) {
                    for (let i = 0; i < movieIDs.length; i++) {
                        db.collection('Users').doc(userId).collection('Orders').doc(docRef.id).collection('Items')
                            .add({
                                created: firebase.firestore.FieldValue.serverTimestamp(),
                                movieID: movieIDs[i],
                                price: 4.99
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
                }
            })
    }
};

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

