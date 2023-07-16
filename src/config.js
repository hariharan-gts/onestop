import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyAne8UovTqnny96u1lGnTzV3nbqaUoVpdw",
    authDomain: "firststop-2a306.firebaseapp.com",
    projectId: "firststop-2a306",
    storageBucket: "firststop-2a306.appspot.com",
    messagingSenderId: "602224183719",
    appId: "1:602224183719:web:4ed9d0cb5b28ddf8e18e82",
    measurementId: "G-P2YZ3M5H2B"
};


const app = initializeApp(firebaseConfig);

export const  db=getFirestore(app)
export const auth=getAuth(app)
