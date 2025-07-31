// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW1kriiKP---R5wptlnqjbhzJHgr7VMUI",
  authDomain: "netflixgpt-39142.firebaseapp.com",
  projectId: "netflixgpt-39142",
  storageBucket: "netflixgpt-39142.firebasestorage.app",
  messagingSenderId: "123530266148",
  appId: "1:123530266148:web:943d61ee3c46458b3a3ab1",
  measurementId: "G-4G0MBZE1TW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();