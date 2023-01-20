import './App.css';
import React, { Component } from 'react'
import News from './mycomponents/News'
import NavBar from './mycomponents/NavBar.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      mode: 'light',
    }
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

        <Router>
          <NavBar mode={this.state.mode} toggleMode={this.toggleMode} />

          <Routes>
            <Route exact path="" element={<News mode={this.state.mode} key='none' category='world' />} />
            <Route exact path="/Home" element={<News mode={this.state.mode} key='home' category='top' />} />
            <Route exact path="/Sports" element={<News mode={this.state.mode} key='sports' category='sports' />} />
            <Route exact path="/Entertainment" element={<News mode={this.state.mode} key='entertainment' category='entertainment' />} />
            <Route exact path="/General" element={<News mode={this.state.mode} key='world' category='world' />} />
            <Route exact path="/Health" element={<News mode={this.state.mode} key='health' category='health' />} />
            <Route exact path="/Science" element={<News mode={this.state.mode} key='science' category='science' />} />
            <Route exact path="/Techonology" element={<News mode={this.state.mode} key='technology' category='technology' />} />
          </Routes>
        </Router>

      </div>
    )
  }
}
