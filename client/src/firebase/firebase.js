import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBfQbW9Oerz36Ce0orbdgUdn9hIqa9SdSY",
  authDomain: "typista-1e651.firebaseapp.com",
  projectId: "typista-1e651",
  storageBucket: "typista-1e651.appspot.com",
  messagingSenderId: "986317410419",
  appId: "1:986317410419:web:42c4b9d0f1dbf8e91dda06",
  measurementId: "G-JJ8WVJ0TL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};