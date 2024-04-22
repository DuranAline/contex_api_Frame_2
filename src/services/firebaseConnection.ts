// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP5H0rrW9K0Jd_ROhdP_yUYCJdnOP3raI",
  authDomain: "react-route-78290.firebaseapp.com",
  projectId: "react-route-78290",
  storageBucket: "react-route-78290.appspot.com",
  messagingSenderId: "907588732697",
  appId: "1:907588732697:web:3f183ee960ed497b5c6788"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }