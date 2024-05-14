// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnQ-fA9eG82UowYLV2kXI7dn3-lQZaBlk",
  authDomain: "twitter-e1d19.firebaseapp.com",
  projectId: "twitter-e1d19",
  storageBucket: "twitter-e1d19.appspot.com",
  messagingSenderId: "549362835781",
  appId: "1:549362835781:web:d44ea835d02edcfab55e2c",
  measurementId: "G-YE83CSC79Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth  =  getAuth(app);
export default auth;