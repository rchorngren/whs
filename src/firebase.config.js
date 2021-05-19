import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBxB_lh2tQeKE241X19jZDWqFCLZGl_Zj0",
    authDomain: "wehatestreaming-27806.firebaseapp.com",
    projectId: "wehatestreaming-27806",
    storageBucket: "wehatestreaming-27806.appspot.com",
    messagingSenderId: "740343826307",
    appId: "1:740343826307:web:9f7f938a918fcbf6ff58b6",
    measurementId: "G-XLS1CMTBZ6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig); // eslint-disable-line
const db = firebase.firestore();

export default db;