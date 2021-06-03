import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const db = firebase.firestore();

export const createOrder = (moviesList) => {
    if (moviesList.lenght){

    }
    // return db.collection('groceryLists')
    //     .add({
    //         created: firebase.firestore.FieldValue.serverTimestamp(),
    //         createdBy: userId,
    //         users: [{ 
    //             userId: userId,
    //             name: userName
    //         }]
    //     });
};