import React, { useState } from 'react'
import './App.css';
import News from './mycomponents/News'
import NavBar from './mycomponents/NavBar.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App() {

  const [mode, setMode] = useState('light');
  const [progress, setProgress] = useState(10);

  const makeProgress = (progress) => {
    setProgress(progress);
  }


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

  return (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Router>
        <NavBar mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route exact path="/hindi" element={<News makeProgress={makeProgress} mode={mode} key='hindi' language='hi' category='world' />} />
          <Route exact path="/english" element={<News makeProgress={makeProgress} mode={mode} key='english' language='en' category='world' />} />
          <Route exact path="" element={<News makeProgress={makeProgress} mode={mode} key='home' category='top' />} />
          <Route exact path="/Sports" element={<News makeProgress={makeProgress} mode={mode} key='sports' category='sports' />} />
          <Route exact path="/Entertainment" element={<News makeProgress={makeProgress} mode={mode} key='entertainment' category='entertainment' />} />
          <Route exact path="/business" element={<News makeProgress={makeProgress} mode={mode} key='business' category='business' />} />
          <Route exact path="/Health" element={<News makeProgress={makeProgress} mode={mode} key='health' category='health' />} />
          <Route exact path="/Science" element={<News makeProgress={makeProgress} mode={mode} key='science' category='science' />} />
          <Route exact path="/Techonology" element={<News makeProgress={makeProgress} mode={mode} key='technology' category='technology' />} />
        </Routes>
      </Router>

    </div>
  )
}

