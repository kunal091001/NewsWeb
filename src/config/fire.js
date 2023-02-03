
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA_DLv6s3ZK95f0jVCdG8iCzZx1KXDZtLQ",
    authDomain: "newsmonkey-3a7c2.firebaseapp.com",
    projectId: "newsmonkey-3a7c2",
    storageBucket: "newsmonkey-3a7c2.appspot.com",
    messagingSenderId: "330822521851",
    appId: "1:330822521851:web:577a2fe2c650080c77315e",
    measurementId: "G-6HZR0CL08B"
};

const fire = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { fire, auth, provider };
