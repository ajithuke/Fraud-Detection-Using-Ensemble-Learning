import React, { createContext, useContext, useState, useEffect } from "react";
import App from "../App";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA4NspeBVyKU5YEyyAMtpAStMaje1oLlwA",
    authDomain: "fraud-detection-30cd9.firebaseapp.com",
    projectId: "fraud-detection-30cd9",
    storageBucket: "fraud-detection-30cd9.appspot.com",
    messagingSenderId: "957136292827",
    appId: "1:957136292827:web:885d7b3d7c433e9494b5fe"
};

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const FirebaseProvider = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
    }, [])

    const signUpUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const logout = () => {
        signOut(auth).then(() => { console.log("sign-out successful") })
    }

    const isLoggedIn = user ? true : false;

    return (
        <FirebaseContext.Provider value={{ signUpUserWithEmailAndPassword, logInUser, signInWithGoogle, logout, isLoggedIn }}>
            <App />
        </FirebaseContext.Provider>
    )
}

export default FirebaseProvider;