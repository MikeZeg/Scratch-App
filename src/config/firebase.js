// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyD58Z-yazoD6td3Otno1zADsHi_ykibELE",
//   apiKey: {API_KEY_FB},
  authDomain: "scratch-app-1eb1b.firebaseapp.com",
  projectId: "scratch-app-1eb1b",
  storageBucket: "scratch-app-1eb1b.appspot.com",
  messagingSenderId: "1088403149631",
  appId: "1:1088403149631:web:2cfa6a16c888d1322d798a",
  measurementId: "G-1N6XCB9HMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
