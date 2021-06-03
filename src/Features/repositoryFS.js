/**************************************************************************************/
/*                              repositoryFS.js                                       */
/*                                                                                    */
/*  A collenction  of useful functionen used to get data from Firestore.              */
/**************************************************************************************/
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const db = firebase.firestore();

/**************************************************************************************/
/*                                createOrder() - Async                               */
/*                                                                                    */
/*  Creates a new Order in Firestore connected to the user (localStorage.currentUser).*/
/*  Parameter: An array of movieIDs                                                   */
/*                                                                                    */
/*  Usage: 

import { useEffect} from 'react';
import { createOrder } from '../../Features/repositoryFS';

const Test = () => {
    let orderList = [603, 605];
    useEffect(() => {   // Make sure it only run once
        createOrder(orderList)
    }, []);

    return (
        <div>Hello World</div>
    );
}

export default Test;

***************************************************************************************/
export async function createOrder(movieIDs) {
    if (checkMovieIDs(movieIDs)) {
        let userId = 'Li4sUlGWF2fYe0Yy8oh7lLSIzpi1';
        if (localStorage.currentUser !== undefined) {
            let userCred = JSON.parse(localStorage.currentUser);
            userId = userCred.user.uid;
        }
        let totalPrice = 4.99;
        if (Array.isArray(movieIDs)) {
            totalPrice = movieIDs.length * 4.99;
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

