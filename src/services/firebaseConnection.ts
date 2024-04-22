// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdk40vHT6UQl6GgXoNzbZEd2yk2RUDWS4",
  authDomain: "react-routes-e4642.firebaseapp.com",
  projectId: "react-routes-e4642",
  storageBucket: "react-routes-e4642.appspot.com",
  messagingSenderId: "858214599810",
  appId: "1:858214599810:web:a8bf888f6e03170713f89b",
  measurementId: "G-ZVC626JC8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }