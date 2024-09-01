import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebaseConfig/firebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext()
const provider = new GoogleAuthProvider();
const Context = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createAccount = (email, password) => {
        setLoading(true) 
       return createUserWithEmailAndPassword(auth, email, password)
    }
    let userUpdate = async(displayName, photoURL) => {
        setLoading(true);
    try {
        await updateProfile(auth.currentUser, { displayName, photoURL });
        setUser({
            ...auth.currentUser,
            displayName: displayName,
            photoURL: photoURL
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
    } finally {
        setLoading(false);
    }
    }
    const loginUser = (email, password) => {
        setLoading(true) 
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userLogOut = () => {
        return signOut(auth)
    }

    let googleLogIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
     const unSubscribe = onAuthStateChanged(auth,  (currentUser) => {
        setLoading(false) 
         console.log("onAuthStateChanged", currentUser)
         setUser(currentUser)
     })
     return () => {
        unSubscribe()
     }
    }, [])


    const userInfo = {
        createAccount,
        userUpdate,
        loginUser,
        userLogOut,
        loading,
        googleLogIn,
        user
    }
    return (
       <AuthContext.Provider value={userInfo}>
         { children }
       </AuthContext.Provider>
    );
};

export default Context;