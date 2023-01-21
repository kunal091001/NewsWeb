import './App.css';
import React, { Component } from 'react'
import News from './mycomponents/News'
import NavBar from './mycomponents/NavBar.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {


  state = {
    mode: 'light',
    progress: 10,
  }


  setProgress = (progress) => {
    this.setState({ progress: progress })
  }



  toggleMode = () => {
    if (this.state.mode === 'light') {
      document.body.style.backgroundColor = '#212529';
      this.setState({
        mode: this.state.mode = 'dark'
      })

    }
    else {
      document.body.style.backgroundColor = 'white';
      this.setState({
        mode: this.state.mode = 'light'
      })
    }
  }

  render() {
    return (
      <div>
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}

        />
        <Router>
          <NavBar mode={this.state.mode} toggleMode={this.toggleMode} />
          <Routes>
            <Route exact path="/hindi" element={<News setProgress={this.setProgress} mode={this.state.mode} key='hindi' language='hi' category='world' />} />
            <Route exact path="/english" element={<News setProgress={this.setProgress} mode={this.state.mode} key='english' language='en' category='world' />} />
            <Route exact path="" element={<News setProgress={this.setProgress} mode={this.state.mode} key='home' category='top' />} />
            <Route exact path="/Sports" element={<News setProgress={this.setProgress} mode={this.state.mode} key='sports' category='sports' />} />
            <Route exact path="/Entertainment" element={<News setProgress={this.setProgress} mode={this.state.mode} key='entertainment' category='entertainment' />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} mode={this.state.mode} key='business' category='business' />} />
            <Route exact path="/Health" element={<News setProgress={this.setProgress} mode={this.state.mode} key='health' category='health' />} />
            <Route exact path="/Science" element={<News setProgress={this.setProgress} mode={this.state.mode} key='science' category='science' />} />
            <Route exact path="/Techonology" element={<News setProgress={this.setProgress} mode={this.state.mode} key='technology' category='technology' />} />
          </Routes>
        </Router>

      </div>
    )
  }
}
