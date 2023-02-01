import NewsContext from "./NewsContext";
import React, { useState } from "react";
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
    const [userValue, setUserValue] = useState('');
    const [frontAnime, setFrontAnime] = useState(true);


    return (
        <NewsContext.Provider value={{ mode, toggleMode, searchValue, setSearchValue, userValue, setUserValue, frontAnime, setFrontAnime }}>
            {props.children}
        </NewsContext.Provider>
    )

}
export default NewsStates
