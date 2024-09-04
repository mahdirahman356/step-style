import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebaseConfig/firebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosCommon from "../Hooks/useAxiosCommon";

export const AuthContext = createContext()
const provider = new GoogleAuthProvider();
const Context = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosCommon = useAxiosCommon()
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
         console.log("onAuthStateChanged", currentUser)
         setUser(currentUser)
         if(currentUser){
            const userInfo = {email: currentUser.email}
            axiosCommon.post('/jwt', userInfo)
            .then(res => {
                if(res.data.token){
                    localStorage.setItem("access-token", res.data.token)
                }
            })
         }
         else{
            localStorage.removeItem('access-token')
         }

         setLoading(false) 

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