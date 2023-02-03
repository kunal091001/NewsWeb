import React, { useState, useContext } from "react";
import "./App.css";
import NewsStates from "./contexts/NewsStates";
import News from "./mycomponents/News";
import NavBar from "./mycomponents/NavBar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import SignUp from "./mycomponents/Signup";
import Login from "./mycomponents/Login";
import FrontPage from "./mycomponents/Frontpage";
import { useEffect } from "react";
import { auth } from "./config/fire";
import NewsContext from "./contexts/NewsContext";

export default function App() {
  const { userData } = useContext(NewsContext);

  const [progress, setProgress] = useState(5);

  const makeProgress = (progress) => {
    setProgress(progress);
  };

  console.log(userData);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<FrontPage />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />

          {userData && userData?.email && userData?.firstName && (
            <>
              <Route
                exact
                path="query/:paramQuery"
                element={
                  <>
                    <NavBar />
                    <LoadingBar
                      color="#f11946"
                      progress={progress}
                      onLoaderFinished={() => setProgress(0)}
                    />{" "}
                    <News key="search" makeProgress={makeProgress} />
                  </>
                }
              />
              <Route
                exact
                path="language/:paramLanguage"
                element={
                  <>
                    <LoadingBar
                      color="#f11946"
                      progress={progress}
                      onLoaderFinished={() => setProgress(0)}
                    />
                    <NavBar />
                    <News key="language" makeProgress={makeProgress} />
                  </>
                }
              />
              <Route
                exact
                path="/home"
                element={
                  <>
                    <LoadingBar
                      color="#f11946"
                      progress={progress}
                      onLoaderFinished={() => setProgress(0)}
                    />
                    <NavBar />
                    <News key="home" makeProgress={makeProgress} />
                  </>
                }
              />
              <Route
                exact
                path="category/:paramCategory"
                element={
                  <>
                    <LoadingBar
                      color="#f11946"
                      progress={progress}
                      onLoaderFinished={() => setProgress(0)}
                    />
                    <NavBar />
                    <News key="categories" makeProgress={makeProgress} />
                  </>
                }
              />
            </>
          )}
          <Route
            path="*"
            element={
              <>
                <FrontPage />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
