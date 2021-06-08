/**************************************************************************************/
/*                              repositoryFS.js                                       */
/*                                                                                    */
/*  A collenction  of useful functionen used to get data from Firestore.              */
/**************************************************************************************/
import firebase from 'firebase/app';

import "firebase/firestore";
import "firebase/auth";

// const db = firebase.firestore();
import db from '../firebase.config';

/**************************************************************************************/
/*                                createOrder() - Async                               */
/*                                                                                    */
/*  Creates a new Order in Firestore connected to the user (localStorage.currentUser).*/
/*                                                                                    */
/*  Parameters:                                                                       */
/*      First: An array of movieIDs                                                   */
/*      Second: An array of corresponding movie titles                                */
/*      Third: A function (preferebly used to know when async is finnished)           */
/*                                                                                    */
/*  Usage: 

import { useEffect, useState} from 'react';
import { createOrder } from '../../Features/repositoryFS';

const Test = () => {
    const [fsQueryDone, setFsQueryDone] = useState(false);
    const [content, setContent] = useState('Hello world!');
    let orderList = [603, 503736];
    let orderListTitle = ['The Matrix', 'Army of the Dead'];

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
export async function createOrder(movieIDs, titles, done) {
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

        db.collection('Users').doc(userId)
        .set({
            dchanged: firebase.firestore.FieldValue.serverTimestamp()
        })
        
        db.collection('Users').doc(userId).collection('Orders')
            .add({
                date: formatDate(Date.now()),
                created: firebase.firestore.FieldValue.serverTimestamp(),
                total: totalPrice
            })
            .then(docRef => {
                if (Array.isArray(movieIDs)) {
                    for (let i = 0; i < movieIDs.length; i++) {
                        db.collection('Users').doc(userId).collection('Orders').doc(docRef.id).collection('Items')
                            .add({
                                created: firebase.firestore.FieldValue.serverTimestamp(),
                                // movieID: movieIDs[i].toString(),
                                movieID: movieIDs[i],
                                title: titles[i],
                                price: 4.99
                            })
                            .then(() => { // eslint-disable-line
                                noOfQuerys--;
                                if (noOfQuerys === 0) { done() }
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
};


/**************************************************************************************/
/*                                 getOrders() - Async                                */
/*                                                                                    */
/*  Returns a list of orders for a user from firestire as JSON                        */
/*  Returns null if user is not logged in.                                            */
/*                                                                                    */
/*  JSON format: {"orders": [                                                         */
/*                        "date": YYYY-MM-DD,                                         */
/*                        "totalsum": float,                                          */
/*                        "movies": [                                                 */
/*                            {"movieid": int, "title": String "price": float}]       */
/*                        ]                                                           */
/*               }                                                                    */
/*  Usage: 

import { useEffect, useState} from 'react';
import { getOrders } from '../../Features/repositoryFS';

const Test = () => {
    const [response, setResponse] = useState('');
    const [content, setContent] = useState('Hello World');
  
    useEffect(() => {   
        getOrders().then((resp) => {
            setResponse(JSON.parse(resp));
        }); // eslint-disable-next-line;
    }, []);

    useEffect(() => {
        if (response !== ''){
            if (response == null){
                setContent('User not logged in');
            } else if (response.orders.length === 0){
                setContent('No orders');
            } else {
                setContent('Date of first order: ' + response.orders[0].date);
            }
        }
    }, [response]);

    return (
        <div>{content}</div>
    );
}

export default Test;

***************************************************************************************/
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

    if (data.docs.length === 0) {
        return '{"orders":[]}';
    }

    let jsonString = '{"orders":[';

    for (let i = 0; i < data.docs.length; i++) {
        const r = docRef.doc(data.docs[i].id);
        const d = await r.get();
        jsonString += '{"date":"' + d.data().date + '","totalsum":' + d.data().total + ',"movies":[';

        const items = docRef.doc(data.docs[i].id).collection('Items');
        const itemsData = await items.get();

        for (let ii = 0; ii < itemsData.docs.length; ii++) {
            const item = docRef.doc(data.docs[i].id).collection('Items').doc(itemsData.docs[ii].id);
            const itemData = await item.get();
            jsonString += '{"movieid":' + itemData.data().movieID;
            jsonString += ',"title":"' + itemData.data().title;
            jsonString += '","price":' + itemData.data().price + '},';
        }
        jsonString = jsonString.slice(0,-1);
        jsonString += ']},';
    }
    jsonString = jsonString.slice(0,-1);
    jsonString += ']}';
    console.log('jsonString: ', jsonString);
    return jsonString;
}

/**************************************************************************************/
/*              reviewRate(movieID, rating, review, done) - Async                     */
/*                                                                                    */
/*  Creates/Overwrites a Review in Firestore connected to movie (movieID) and         */
/*  the user (localStorage.currentUser). User must be logged in.                      */
/*                                                                                    */
/*  Parameters:                                                                       */
/*      First: movieID                                                                */
/*      Second: rating                                                                */
/*      Third: the review as a string                                                 */
/*      Forth: A function (preferebly used to know when async is finnished)           */
/*                                                                                    */
/*  Usage: 

import { useEffect, useState} from 'react';
import { reviewRate } from '../../Features/repositoryFS';

const Test = () => {
    const [fsQueryDone, setFsQueryDone] = useState(false);
    const [content, setContent] = useState('Hello world!');
    let movieID = 603;
    let rating = 5;
    let review = 'A must see film. One of the best';

    useEffect(() => {   // Make sure it only run once
        reviewRate(movieID, rating, review, () => setFsQueryDone(true))
    }, []);

    useEffect(() => {
        if (fsQueryDone){
            setContent('Thank you for your review!');
        }
    }, [fsQueryDone]);

    return (
        <div>{content}</div>
    );
}

export default Test;

***************************************************************************************/
export async function reviewRate(movieID, rating, review, done) {
    let userId = 'wrong';
    if (localStorage.currentUser !== undefined) {
        let userCred = JSON.parse(localStorage.currentUser);
        userId = userCred.user.uid;
    } else {
        return null;
    }

    db.collection('Movies').doc(movieID.toString())
    .set({
        dchanged: firebase.firestore.FieldValue.serverTimestamp()
    })

    db.collection('Movies').doc(movieID.toString()).collection('Reviews').doc(userId.toString())
    .set({
        rate: rating,
        comment: review,
        created: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        done();
    })
}

/**************************************************************************************/
/*                     getMovieReviewRating(movieID) - Async                          */
/*                                                                                    */
/*  Returns a list of reviews for a movie from firestire as JSON                      */
/*                                                                                    */
/*  Parameters:                                                                       */
/*      First: movieID                                                                */
/*                                                                                    */
/*  JSON format: {"reviews": [                                                        */
/*                        "user": userID,                                             */
/*                        "rate": Number,                                             */
/*                        "comment": String                                           */
/*                  ]                                                                 */
/*               }                                                                    */
/*  Usage: 

import { useEffect, useState} from 'react';
import { getMovieReviewRating } from '../../Features/repositoryFS';

const Test = () => {
    const [response, setResponse] = useState('');
    const [content, setContent] = useState('Hello World');
    let movieID = 603;
  
    useEffect(() => {   
        getMovieReviewRating(movieID).then((resp) => {
            setResponse(JSON.parse(resp));
        }); // eslint-disable-next-line;
    }, []);

    useEffect(() => {
        if (response !== ''){
            if (response.reviews.length === 0){
                setContent('No reviews');
            } else {
                setContent('First review: ' + response.reviews[0].comment);
            }
        }
    }, [response]);

    return (
        <div>{content}</div>
    );
}

export default Test;

***************************************************************************************/
export async function getMovieReviewRating(movieID) {
    const docRef = db.collection('Movies').doc(movieID.toString()).collection('Reviews');

    const response = docRef;
    const data = await response.get();

    if (data.docs.length === 0) {
        return '{"reviews":[]}';
    }

    let jsonString = '{"reviews":[';

    for (let i = 0; i < data.docs.length; i++) {
        const r = docRef.doc(data.docs[i].id);
        const d = await r.get();
        jsonString += '{"user":"' + data.docs[i].id + '","rate":' + d.data().rate + ',"comment":"' + d.data().comment + '"},';
    }
    jsonString = jsonString.slice(0,-1);
    jsonString += ']}';

    return jsonString;
}

/**************************************************************************************/
/*                         getUserReviewRating() - Async                              */
/*                                                                                    */
/*  Returns a list of reviews written by a user from firestire as JSON                */
/*                                                                                    */
/*  JSON format: {"reviews": [                                                        */
/*                        "movieID": movieID,                                         */
/*                        "rate": Number,                                             */
/*                        "comment": String                                           */
/*                  ]                                                                 */
/*               }                                                                    */
/*  Usage: 

import { useEffect, useState} from 'react';
import { getMovieReviewRating } from '../../Features/repositoryFS';

const Test = () => {
    const [response, setResponse] = useState('');
    const [content, setContent] = useState('Hello World');
    let movieID = 603;
  
    useEffect(() => {   
        getMovieReviewRating(movieID).then((resp) => {
            setResponse(JSON.parse(resp));
        }); // eslint-disable-next-line;
    }, []);

    useEffect(() => {
        if (response !== ''){
            if (response.reviews.length === 0){
                setContent('No reviews');
            } else {
                setContent('First review: ' + response.reviews[0].comment);
            }
        }
    }, [response]);

    return (
        <div>{content}</div>
    );
}

export default Test;

***************************************************************************************/
export async function getUserReviewRating() {
    let userId = 'wrong';
    if (localStorage.currentUser !== undefined) {
        let userCred = JSON.parse(localStorage.currentUser);
        userId = userCred.user.uid;
    } else {
        return null;
    }

    const docRef = db.collection('Movies');
    const data = await docRef.get();

    if (data.docs.length === 0) {
        return '{"reviews":[]}';
    }

    let jsonString = '{"reviews":[';

    for (let i = 0; i < data.docs.length; i++) {
        const r = db.collection('Movies').doc(data.docs[i].id).collection('Reviews');
        const d = await r.get();

        for (let ii=0; ii < d.docs.length; ii++){
            if (d.docs[ii].id === userId){
                jsonString += '{"movieID":"' + data.docs[i].id + '","rate":' + d.docs[ii].data().rate + ',"comment":"' + d.docs[ii].data().comment + '"},';
            }
        }
    }
    jsonString = jsonString.slice(0,-1);
    jsonString += ']}';

    return jsonString;
}

/**************************************************************************************/
/*                   checkMovieIDs(arr) - Check input for createOrder                 */
/**************************************************************************************/
function checkMovieIDs(arr) {
    if (Array.isArray(arr)) {
        for (let i = 0; i < arr.length; i++) {

            if (isNaN(arr[i])) {
                return true;
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

/**************************************************************************************/
/*                     formatDate(date) - Format date to YYYY-MM-DD                   */
/**************************************************************************************/
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}