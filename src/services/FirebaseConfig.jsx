// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEQ41UnXIK0J2D9-q2XA_dsP_bBdZS9Yw",
  authDomain: "st-project-183a0.firebaseapp.com",
  databaseURL: "https://st-project-183a0.firebaseio.com",
  projectId: "st-project-183a0",
  storageBucket: "st-project-183a0.firebasestorage.app",
  messagingSenderId: "999475156454",
  appId: "1:999475156454:web:fa2c4957ab87a19dd83227"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };