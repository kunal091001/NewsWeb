import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth } from "./fire";

const userRegister = async (userData) => {
    return await createUserWithEmailAndPassword(
        auth,
        userData?.email,
        userData?.password
    );
};

const userLogin = async (userData) => {
    return await signInWithEmailAndPassword(
        auth,
        userData?.email,
        userData?.password
    );
};

const userUpdate = async (userName) => {
    console.log(auth.currentUser);
    return await updateProfile(auth.currentUser, {
        displayName: userName,
    });
};

const googleSignin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);                        //pop up window of google login
};

const googleSignout = () => {
    return signOut(auth);
};

export { userRegister, userLogin, userUpdate, googleSignin, googleSignout };