// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOJKBkiaYBGu_f-9ZeOlQSyGchk5XDfMc",
  authDomain: "login-ui-assignment.firebaseapp.com",
  projectId: "login-ui-assignment",
  storageBucket: "login-ui-assignment.firebasestorage.app",
  messagingSenderId: "91940938259",
  appId: "1:91940938259:web:f77a97378b801dfa5515e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
