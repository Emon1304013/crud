import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.init';
export const AuthContext = createContext({});

const auth = getAuth(app);
const UserContext = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true);

    // User creation 
    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // Email Verification after user creation  
    const verifyEmail = () => {
        setLoading(true);
        return sendEmailVerification(auth.currentUser)
      }

    const updateUserProfile = (name,photoURL) => {
      setLoading(true);
      return updateProfile (auth.currentUser, {
        displayName : name, photoURL: photoURL
      })
    }

    // Registration / sign in with google  

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // Registration / sign in with Github 

    const githubSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, githubProvider)
    }
    // User sign in using email & password 

    const userLogin = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userSignOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const resetPass = (email) => {
        return sendPasswordResetEmail(auth, email)
    }


      useEffect(() => {
        //this part will execute once the component is mounted.
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log(currentUser);
          setUser(currentUser)
          // if((currentUser == null)){//checking if emailVerified or user null. 
          //   setUser(currentUser)
          // }
          setLoading(false)
        })
    
        return () => {
          //this part will execute once the component is unmounted.
          unsubscribe()
        }
      },[])

    const authInfo = 
    {
        user,
        loading,
        setLoading,
        createUser,
        verifyEmail,
        updateUserProfile,
        googleSignIn,
        githubSignIn,
        userLogin,
        userSignOut,
        resetPass,
        auth,
        setUser
    }
    
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;