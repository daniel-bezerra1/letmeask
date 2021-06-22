import firebase from "firebase";
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBwrqUuQJoGxDk1vskjDpWtj5jlL7AKgvM",
  authDomain: "letmeask-74a75.firebaseapp.com",
  databaseURL: "https://letmeask-74a75-default-rtdb.firebaseio.com",
  projectId: "letmeask-74a75",
  storageBucket: "letmeask-74a75.appspot.com",
  messagingSenderId: "557827279651",
  appId: "1:557827279651:web:8627c321a01b63ad589a96"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const database = firebase.database();