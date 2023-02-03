import NewsContext from "./NewsContext";
import React, { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/fire'

const NewsStates = (props) => {

    const [mode, setMode] = useState('light');
    const toggleMode = () => {
        if (mode === 'light') {
            document.body.style.backgroundColor = '#212529';
            setMode('dark');
        }
        else {
            document.body.style.backgroundColor = '#E5EDF1';
            setMode('light');
        }
    }


    const [searchValue, setSearchValue] = useState({});
    const [userValue, setUserValue] = useState(''); //searched user value

    const [userData, setUserData] = useState({
        firstName: '',
        email: '',
    });



    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUserData({ firstName: currentUser?.displayName, email: currentUser?.email });
        });
    }, [])


    return (
        <NewsContext.Provider value={{ mode, toggleMode, searchValue, setSearchValue, userValue, setUserValue, userData, setUserData }}>
            {props.children}
        </NewsContext.Provider>
    )

}
export default NewsStates
