import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            console.log("Auth Changed:", currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);



    const logOut = () => signOut(auth);

    const logIn = (email, password) => 
        signInWithEmailAndPassword(auth, email, password);

    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => 
        signInWithPopup(auth, googleProvider);

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        logIn,
        googleLogin,
        loading,
        setLoading
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
