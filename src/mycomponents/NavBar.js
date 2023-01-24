import React, { useState } from 'react'
import { Link } from 'react-router-dom';
export default function NavBar(props) {
  let { mode, toggleMode } = props;


  return (
    <div>
      <nav className={`navbar navbar-expand-lg fixed-top`} style={{ backgroundColor: mode === 'light' ? 'white' : '#36454f', }}>
        <div className="container-fluid">
          <span className="navbar-brand " style={{ color: mode === 'light' ? '#152238' : 'white' }} >NEWSMONKEY</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"  >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item dropdown">
                <Link className="nav-link " to="/Entertainment" role="button" aria-expanded="false" style={{ color: mode === 'light' ? '#152238' : 'white' }}>
                  Entertainment
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link " to="/Business" role="button" aria-expanded="false" style={{ color: mode === 'light' ? '#152238' : 'white' }}>
                  Business
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link " to="/Health" role="button" aria-expanded="false" style={{ color: mode === 'light' ? '#152238' : 'white' }}>
                  Health
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link " to="/Science" role="button" aria-expanded="false" style={{ color: mode === 'light' ? '#152238' : 'white' }}>
                  Science
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link " to="/Sports" role="button" style={{ color: mode === 'light' ? '#152238' : 'white' }}>
                  Sports
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link " to="/Techonology" role="button" aria-expanded="false" style={{ color: mode === 'light' ? '#152238' : 'white' }}>
                  Techonology
                </Link>
              </li>
              <li className='nav-item dropdown mx-md-5'>
                <div className='d-flex '>
                  <Link to="/hindi" className='nav-link' style={{ color: mode === 'light' ? '#152238' : 'white' }}>हिंदी</Link>
                  <strong className='mt-2' style={{ color: mode === 'light' ? '#152238' : 'white' }}> / </strong>
                  <Link to="/english" className='nav-link' style={{ color: mode === 'light' ? '#152238' : 'white' }}>English</Link>
                </div>
              </li>
            </ul>

            <div className="form-check form-switch mx-md-4">
              <input onClick={toggleMode} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ color: mode === 'light' ? '#152238' : 'white' }}>{mode} Mode</label>
            </div>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="search" style={{ color: mode === 'light' ? '#152238' : 'white' }}   >Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}





