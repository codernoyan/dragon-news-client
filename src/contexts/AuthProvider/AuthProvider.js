import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithPopup, signOut, signInWithEmailAndPassword, updateProfile, sendEmailVerification
} from 'firebase/auth';
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  // const user = { displayName: 'Batash Ali' };
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const providerLogin = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  }

  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser)
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      // setUser(currentUser);
      if(currentUser === null || currentUser.emailVerified){
        setUser(currentUser);
      }
      setLoading(false);
    })
    return () => unsubscribe();
  }, [])

  const authInfo = {
    user,
    loading,
    setLoading,
    providerLogin,
    logOut,
    createUser,
    signIn,
    updateUserProfile,
    verifyEmail
  };
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;