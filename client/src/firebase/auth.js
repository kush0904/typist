import { GoogleAuthProvider,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    updatePassword } from "firebase/auth";
import {auth} from "./firebase";




export const doCreateUserWithEmailAndPassword = async(email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async() => {
    const provider = new GoogleAuthProvider();
    const result =  await signInWithPopup(auth, provider);
    // result.user

    console.log(result.user.uid);
    
    if (result.user){
        localStorage.setItem('userId', result.user.uid);
    }
    return result;
}

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };


export const doSignOut = () => {
    localStorage.removeItem('userId');
    return auth.signOut();
};


export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    })
}