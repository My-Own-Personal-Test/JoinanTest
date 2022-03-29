// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC29K-2cd_apd9G2sAQw6Q34DJYEtVhwK0",
  authDomain: "joinantest.firebaseapp.com",
  projectId: "joinantest",
  storageBucket: "joinantest.appspot.com",
  messagingSenderId: "727341133911",
  appId: "1:727341133911:web:b36ae167f1605ecbc17312",
  measurementId: "G-3H6TK3PP70",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore;

export { db };
