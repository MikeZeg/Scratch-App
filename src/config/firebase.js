// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.react_app_api_key,
  authDomain: "scratch-app-1eb1b.firebaseapp.com",
  projectId: "scratch-app-1eb1b",
  storageBucket: "scratch-app-1eb1b.appspot.com",
  messagingSenderId: "1088403149631",
  appId: "1:1088403149631:web:2cfa6a16c888d1322d798a",
  measurementId: "G-1N6XCB9HMF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//log in / create / change
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


//DataBase
export const db = getFirestore(app);
