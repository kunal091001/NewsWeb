import React, { useState } from 'react'
import './App.css';
import NewsStates from './contexts/NewsStates';
import News from './mycomponents/News'
import NavBar from './mycomponents/NavBar.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default function App() {

  const [searchValue, setSearchValue] = useState([]);

  const [progress, setProgress] = useState(5);

  const makeProgress = (progress) => {
    setProgress(progress);
  }

  return (
    <>
      <NewsStates>
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Router>
          <NavBar setSearchValue={setSearchValue} searchValue={searchValue} />
          <Routes>
            <Route exact path="/search" element={<News key='search' language='en' makeProgress={makeProgress} category='world' setSearchValue={setSearchValue} searchValue={searchValue} />} />
            <Route exact path="language/:paramLanguage" element={<News key='language' makeProgress={makeProgress} />} />
            <Route exact path="/" element={<News key='home' makeProgress={makeProgress} />} />
            <Route exact path="category/:paramCategory" element={<News key='categories' makeProgress={makeProgress} />} />
          </Routes>
        </Router>
      </NewsStates>
    </>
  )
}



